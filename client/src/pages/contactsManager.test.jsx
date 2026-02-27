import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactManager from './contactsManager';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

/**
 * @file contactsManager.test.jsx
 * @description Tests d'intégration pour la page principale de gestion des contacts.
 */

// Mock des modules externes
vi.mock('axios');
vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(),
}));

describe('Page ContactManager', () => {
  // Données de test
  const mockContacts = [
    { _id: '1', firstName: 'Alice', lastName: 'Doe', phoneNumber: '0600000001' },
    { _id: '2', firstName: 'Bob', lastName: 'Smith', phoneNumber: '0600000002' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock du localStorage pour simuler un utilisateur connecté
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'authToken') return 'fake_token_jwt';
      return null;
    });

    // Mock du décodage du token pour retourner un ID utilisateur
    jwtDecode.mockReturnValue({ user_id: 'user123', userName: 'TestUser' });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('devrait charger et afficher les contacts de l\'utilisateur', async () => {
    // Simulation de la réponse API pour récupérer les contacts
    axios.get.mockResolvedValue({ data: mockContacts });

    render(
      <MemoryRouter>
        <ContactManager />
      </MemoryRouter>
    );

    // 1. Vérifie que le nom de l'utilisateur est affiché (via NavBare)
    expect(screen.getByText('TestUser')).toBeDefined();

    // 2. Vérifie que l'appel API a été fait avec l'ID de l'utilisateur mocké
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/contact/user123'));
    });

    // 3. Vérifie que les contacts sont affichés dans la liste
    expect(await screen.findByText('Alice')).toBeDefined();
    expect(await screen.findByText('Bob')).toBeDefined();
  });

  it('devrait filtrer la liste des contacts via la barre de recherche', async () => {
    axios.get.mockResolvedValue({ data: mockContacts });

    render(<MemoryRouter><ContactManager /></MemoryRouter>);

    await waitFor(() => expect(screen.getByText('Alice')).toBeDefined());

    // Simulation de la recherche : on tape "Alice"
    const searchInput = screen.getByPlaceholderText(/Search contacts.../i);
    fireEvent.change(searchInput, { target: { value: 'Alice' } });

    // Vérification : Alice doit rester, Bob doit disparaître
    expect(screen.getByText('Alice')).toBeDefined();
    expect(screen.queryByText('Bob')).toBeNull();
  });
});