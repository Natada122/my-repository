describe("search page", () => {
    it(" should navigate to start page", () => {
        cy.visit('');
    })
    it(" should navigate to list of results of London on search", () => {
        cy.server();
        cy.route('GET','api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=london&callback=ng_jsonp_callback_0').as('search');
        cy.get('#search-box').type('london');
        cy.get('.mat-fab > .mat-button-wrapper').click();
        cy.wait('@search').its('status').should('eq', 200);
        cy.url().should('include', '/results?location=london');
    })
})