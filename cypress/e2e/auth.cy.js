describe('example auth flow', () => {
  it('should redirect with credentials', () => {
    cy.visit('http://localhost:3000/sign-in');
    // cy.login();
    // cy.visit('http://localhost:3000/get-the-app');
    // cy.get('h1').should('contain', 'Get the mobile App');
    // cy.visit('http://localhost:3000');
    // cy.get('h2').should('contain', 'How much do you want to invest?');
  });
});
