describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Start a new game', () => {
    cy.get('input').click();
    cy.location('pathname').should('eq', '/game');
    cy.get('.cell').should('have.length', 121);
  })

})

describe('Hex game', () => {
  beforeEach(() => {
    cy.visit('/game');
  })

  it('Display a grid of 11*11 cells', () => {
    cy.get('.cell').should('have.length', 121);
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
    cy.visit('/game?x=1&y=10&gameState=%257B%2522board%2522%3A%255B%255B%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522white%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%255D%2C%255B%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522black%2522%257D%2C%257B%2522value%2522%3A%2522white%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%255D%2C%255B%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522black%2522%257D%2C%257B%2522value%2522%3A%2522white%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%255D%2C%255B%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522black%2522%257D%2C%257B%2522value%2522%3A%2522white%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%255D%2C%255B%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522black%2522%257D%2C%257B%2522value%2522%3A%2522white%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%255D%2C%255B%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522black%2522%257D%2C%257B%2522value%2522%3A%2522white%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%255D%2C%255B%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522black%2522%257D%2C%257B%2522value%2522%3A%2522white%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%255D%2C%255B%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522black%2522%257D%2C%257B%2522value%2522%3A%2522white%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%255D%2C%255B%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522black%2522%257D%2C%257B%2522value%2522%3A%2522white%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%255D%2C%255B%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522black%2522%257D%2C%257B%2522value%2522%3A%2522white%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%255D%2C%255B%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%2C%257B%2522value%2522%3A%2522empty%2522%257D%255D%255D%2C%2522turn%2522%3A%2522black%2522%257D');
    cy.get('.cell').eq(112).click();
    cy.get('.box-winner > p').contains('white');
    cy.get('input').click();
    cy.location('pathname').should('eq', '/');
  })
})
