import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBare from './navBare';

// Mock de useNavigate car NavBare l'utilise pour rediriger après logout
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Composant NavBare', () => {
  it('devrait afficher le nom de l\'utilisateur', () => {
    render(
      <MemoryRouter>
        <NavBare userName="Utilisateur Test" />
      </MemoryRouter>
    );

    expect(screen.getByText('Utilisateur Test')).toBeDefined();
    expect(screen.getByText('My Contacts')).toBeDefined();
  });

  it('devrait déconnecter l\'utilisateur au clic sur logout', () => {
    render(
      <MemoryRouter>
        <NavBare userName="Utilisateur Test" />
      </MemoryRouter>
    );

    // Le texte "Logout" est dans un span, le onClick est sur le div parent
    const logoutText = screen.getByText('Logout');
    const logoutButton = logoutText.closest('div');
    
    fireEvent.click(logoutButton);

    // Vérifie que le token est supprimé (si localStorage est utilisé) et la redirection effectuée
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});