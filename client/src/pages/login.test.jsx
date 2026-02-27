import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './login';
import axios from 'axios';

/**
 * @file login.test.jsx
 * @description Tests d'intégration pour la page d'authentification (Login/Register).
 */

// Mock d'axios
vi.mock('axios');

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Page Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('devrait afficher le formulaire de connexion par défaut', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login to your account/i)).toBeDefined();
    expect(screen.getByLabelText(/Your email/i)).toBeDefined();
    // Le champ "User Name" ne doit pas être présent en mode Login
    expect(screen.queryByLabelText(/User Name/i)).toBeNull();
  });

  it('devrait basculer vers le mode inscription au clic sur le lien', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Clic sur "Register here"
    fireEvent.click(screen.getByText(/Register here/i));

    // On cible spécifiquement le titre (heading) pour éviter le conflit avec le bouton qui porte le même texte
    expect(screen.getByRole('heading', { name: /Create an account/i })).toBeDefined();
    expect(screen.getByLabelText(/User Name/i)).toBeDefined();
  });

  it('devrait rediriger vers /contact après une connexion réussie', async () => {
    // Simulation d'une réponse positive de l'API
    axios.post.mockResolvedValue({ 
      status: 200, 
      data: { token: 'fake_token_123', message: 'Login success' } 
    });

    render(<MemoryRouter><Login /></MemoryRouter>);

    // Remplissage du formulaire
    fireEvent.change(screen.getByLabelText(/Your email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Soumission
    fireEvent.click(screen.getByRole('button')); // Le bouton Login

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/user/login'), expect.any(Object));
      expect(mockNavigate).toHaveBeenCalledWith('/contact');
    });
  });
});