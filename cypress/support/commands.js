// Custom commands to handle repetitive/unclear tasks

// Enter an arbitrary grid size
Cypress.Commands.add('inputGridSize', (input) =>  {
    cy.get('#number').click().type(input)
})

// Click a grid space by row and column
Cypress.Commands.add('clickGrid', (row, column) => {
    cy.get('[data-column="'+column+'"][data-row="'+row+'"]').click()
})

// Play a game where X wins
Cypress.Commands.add('playWinX', () => {
    cy.inputGridSize(1)
    cy.get('#start').click()
    cy.clickGrid(0,0)
})

// Play a game where O wins
Cypress.Commands.add('playWinO', () => {
    cy.inputGridSize(3)
    cy.get('#start').click()
    cy.clickGrid(2,2)
    cy.clickGrid(1,0)
    cy.clickGrid(2,1)
    cy.clickGrid(2,0)
    cy.clickGrid(0,2)
    cy.clickGrid(0,0)
})

// Play a game where there is a tie
Cypress.Commands.add('playTie', () => {
    cy.inputGridSize(3)
    cy.get('#start').click()
    cy.clickGrid(0,0)
    cy.clickGrid(0,2)
    cy.clickGrid(0,1)
    cy.clickGrid(1,0)
    cy.clickGrid(1,2)
    cy.clickGrid(1,1)
    cy.clickGrid(2,0)
    cy.clickGrid(2,1)
    cy.clickGrid(2,2)
})