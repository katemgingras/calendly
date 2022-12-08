// Testing the input field for error handling and accurate generations

const validInputs = ['1', '3', '5'];
const invalidInputs = ['null', 'abc', '%'];

describe('Test valid inputs', () => {
    validInputs.forEach(input => {
        it('Generates grid size and validates cell count for '+input, () => {
            cy.visit('/')
            cy.inputGridSize(input)
            cy.get('#start').click()
            cy.get('#table')
                // Validates the number of rows to prove squareness and number of cells overall to prove grid size
                .find('tr').should('have.length', input)
                .find('td').should('have.length', input*input)
        })
    })
})

describe('Test invalid inputs', () => {
    invalidInputs.forEach(input => {
        it('Fails to generate a grid for invalid input of '+input, () => {
            cy.visit('/')
            cy.inputGridSize(input)
            cy.get('#start').click()
            cy.get('#table').should('have.length', '1')
        })
    })
})

// Testing the interactions with the grid

describe('Test clicking grid elements', () => {
    it('Can enter a move', () => {
        cy.visit('/')
        cy.inputGridSize(3)
        cy.get('#start').click()
        cy.clickGrid(0,0).should('contain.text', 'X')
    })
    it('Alternates X and O moves', () => {
        cy.visit('/')
        cy.inputGridSize(3)
        cy.get('#start').click()
        cy.clickGrid(0,0).should('contain.text', 'X')
        cy.clickGrid(0,1).should('contain.text', 'O')
        cy.clickGrid(1,1).should('contain.text', 'X')
    })
    it('Cannot replace a move in the grid with an opposing move', () => {
        cy.visit('/')
        cy.inputGridSize(1)
        cy.get('#start').click()
        cy.clickGrid(0,0).should('contain.text', 'X')
        cy.clickGrid(0,0).should('contain.text', 'X')
    })
})

// Testing the game outcomes
// These tests will fail given the current state of the application

describe('Test that game results are correctly adjudicated', () => {
    it('Shows an X win banner when X wins', () => {
        cy.visit('/')
        cy.playWinX()
        cy.get('#endgame').should('contain.text', 'Congratulations player X!')
    })
    it('Shows an O win banner when O wins', () => {
        cy.visit('/')
        cy.playWinO()
        cy.get('#endgame').should('contain.text', 'Congratulations player O!')
    })
    it('Shows a tie banner when there is a tie', () => {
        cy.visit('/')
        cy.playTie()
        cy.get('#endgame').should('contain.text', 'There was a tie!')
    })
})