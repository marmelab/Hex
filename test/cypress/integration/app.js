describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Start a new game', () => {
    cy.get('input').click();
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
})
