describe("list of results page", () => {
    it(" should navigate to results page", () => {
        cy.fixture('searches').then((searches => localStorage.setItem('lastSearhes',JSON.stringify(searches))));
        cy.visit('/results?location=london');
    })
})