import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddContact from './addContact';
import axios from 'axios';

/**
 * @file ContactForm.test.jsx (Test pour AddContact)
 * @description Tests unitaires pour le formulaire d'ajout de contact.
 */

// Mock d'axios pour éviter les appels API réels
vi.mock('axios');

describe('Composant AddContact', () => {
  const mockSetContacts = vi.fn();
  const mockSetNotification = vi.fn();
  const userId = "user123";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('devrait afficher les champs du formulaire', () => {
    render(<AddContact user_id={userId} setContacts={mockSetContacts} setNotification={mockSetNotification} />);

    expect(screen.getByLabelText(/First Name/i)).toBeDefined();
    expect(screen.getByLabelText(/Last Name/i)).toBeDefined();
    expect(screen.getByLabelText(/Phone Number/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Add Contact/i })).toBeDefined();
  });

  it('devrait envoyer les données et vider le formulaire au succès', async () => {
    // Simulation d'une réponse positive de l'API
    axios.post.mockResolvedValue({ status: 201, data: { _id: 'newId123' } });

    render(<AddContact user_id={userId} setContacts={mockSetContacts} setNotification={mockSetNotification} />);

    // Remplissage des champs
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '0612345678' } });

    // Soumission
    fireEvent.click(screen.getByRole('button', { name: /Add Contact/i }));

    // Vérifications
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(mockSetContacts).toHaveBeenCalled();
    });
  });
});