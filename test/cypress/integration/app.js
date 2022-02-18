describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Start a new game', () => {
    cy.get('[data-cy=submit]').click();
    cy.location('pathname').should('contains', '/game');
    cy.get('.cell').should('have.length', 361);
  })
})

describe('Hex game', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy=submit]').click();
  })

  it('Display a grid of 11*11 cells', () => {
    cy.get('.cell').should('have.length', 361);
  })

  it('Add a white stone on first cell', () => {
    cy.get('.cell').first().click();
    cy.get('.cell').first().invoke('attr', 'data-color').should('eq', 'white');
  })

  it('Not change stone color when clicking on a already filled cell', () => {
    cy.get('.cell').first().click();
    cy.get('.cell').first().invoke('attr', 'data-color').should('eq', 'white');
    cy.get('.cell').first().click();
    cy.get('.cell').first().invoke('attr', 'data-color').should('eq', 'white');
  })

  it('Add a white stone on first first cell then a black stone on second cell', () => {
    cy.get('.cell').first().click();
    cy.get('.cell').first().invoke('attr', 'data-color').should('eq', 'white');
    cy.get('.cell').eq(1).click();
    cy.get('.cell').eq(1).invoke('attr', 'data-color').should('eq', 'black');
  })

  it('Display the correct current player', () => {
    cy.get('.current-player').contains('white');
    cy.get('.cell').first().click();
    cy.get('.current-player').contains('black');
    cy.get('.cell').first().invoke('attr', 'data-color').should('eq', 'white');
    cy.get('.cell').eq(1).click();
    cy.get('.cell').eq(1).invoke('attr', 'data-color').should('eq', 'black');
  })
  it('End the game when their is a winner and allow to go back home', () => {
    cy.visit('/');
    cy.get('[data-cy=size]').clear().type("2");
    cy.get('[data-cy=submit]').click();
    cy.get('.cell').eq(0).click();
    cy.get('.cell').eq(1).click();
    cy.get('.cell').eq(2).click();
    cy.get('.box-winner > p').contains('white');
    cy.get('[data-cy=backHomePage]').click();
    cy.location('pathname').should('eq', '/');
  })
});