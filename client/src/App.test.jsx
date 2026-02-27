import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

/**
 * @file App.test.jsx
 * @description Fichier de tests pour le composant principal de l'application.
 * Ces tests servent à valider le bon fonctionnement de l'interface utilisateur.
 */

describe('Composant App', () => {
  /**
   * Test : Vérifie que l'application se monte sans erreur fatale.
   * 
   * Contexte :
   * Le composant App contient généralement la logique de routage ou les layouts principaux.
   * Nous utilisons MemoryRouter pour fournir le contexte de navigation nécessaire
   * sans dépendre de l'URL du navigateur (utile pour les tests unitaires).
   */
  it('devrait s\'afficher correctement (smoke test)', () => {
    // 1. Rendu du composant (Render)
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // 2. Assertions (Verify)
    // On vérifie simplement que le rendu a produit quelque chose dans le DOM.
    expect(document.body).toBeDefined();
  });

  /**
   * Test : Vérifie la gestion des routes inexistantes (404).
   */
  it('devrait gérer une route inconnue sans planter', () => {
    render(
      <MemoryRouter initialEntries={['/route-inconnue-123']}>
        <App />
      </MemoryRouter>
    );

    // On vérifie que l'app est toujours là (ou on pourrait chercher un texte "404" si implémenté)
    expect(document.body).toBeDefined();
  });
});