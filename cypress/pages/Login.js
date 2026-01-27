class Login {
    ////////// Sayfaya gitme işlemi
    navigate() {
        cy.visit('https://www.edu.goit.global/account/login');
    }

    ////////// Giriş yapma işlemi
    login(email, password) {
        cy.get('#user_email').should('be.visible').clear().type(email);
        cy.get('#user_password').should('be.visible').clear().type(password);
        cy.contains('button', 'Log in').click();
    }
}

export const loginPage = new Login();