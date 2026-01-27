Cypress.Commands.add('login', (email, password) => {
    // E-posta alanını bul ve yaz (ID: user_email)
    cy.get('#user_email').should('be.visible').clear().type(email);

    // Şifre alanını bul ve yaz (ID: user_password)
    cy.get('#user_password').should('be.visible').clear().type(password);

    // 'Log in' butonuna tıkla
    cy.contains('Log in').click(); 
});