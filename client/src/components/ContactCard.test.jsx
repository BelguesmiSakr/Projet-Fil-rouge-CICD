import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactCard from './contactCard';
import axios from 'axios';

vi.mock('axios');

describe('Composant ContactCard', () => {
  const mockContact = {
    _id: 'c1',
    firstName: 'Alice',
    lastName: 'Wonder',
    phoneNumber: '0600000000'
  };
  const mockSetContacts = vi.fn();
  const mockSetNotification = vi.fn();

  it('devrait afficher les informations du contact', () => {
    render(<ContactCard contact={mockContact} setContacts={mockSetContacts} setNotification={mockSetNotification} />);

    expect(screen.getByText('Alice')).toBeDefined();
    expect(screen.getByText('Wonder')).toBeDefined();
    expect(screen.getByText('0600000000')).toBeDefined();
  });

  it('devrait passer en mode édition au clic sur le crayon', () => {
    render(<ContactCard contact={mockContact} setContacts={mockSetContacts} setNotification={mockSetNotification} />);

    // Au début, ce sont des divs, pas des inputs
    expect(screen.queryByDisplayValue('Alice')).toBeNull();

    // Clic sur le bouton d'édition (title="Update contact")
    const editBtn = screen.getByTitle('Update contact');
    fireEvent.click(editBtn);

    // Maintenant les inputs doivent être là
    expect(screen.getByDisplayValue('Alice')).toBeDefined();
  });

  it('devrait appeler l\'API de suppression au clic sur la poubelle', async () => {
    axios.delete.mockResolvedValue({ status: 200 });

    render(<ContactCard contact={mockContact} setContacts={mockSetContacts} setNotification={mockSetNotification} />);

    const deleteBtn = screen.getByTitle('Delete contact permanently');
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      // Vérifie que l'URL de suppression contient l'ID du contact
      expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/contact/c1'));
      expect(mockSetContacts).toHaveBeenCalled();
    });
  });
});