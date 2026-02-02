class LoginPage {
    elements = {
        loginPanelTrigger: () => cy.get('.member-login-btn'), // AC1
        emailInput: () => cy.get('#header-email'),           // AC2
        passwordInput: () => cy.get('#header-password'),     // AC2
        loginSubmitBtn: () => cy.get('#login-btn-322'),             // AC2
        rememberMe: () => cy.get('.header-remember'),        // AC2
        forgotPasswordBtn: () => cy.contains('a', 'Şifremi Unuttum'), // AC9
        registerBtn: () => cy.contains('a', 'Kayıt Ol'),      // AC2
        errorMessage: () => cy.get('.popover-item'),           // AC5
        forgotEmailInput: () => cy.get('#header-email'), // Kitapsepeti mail input ID'si
        sendResetBtn: () => cy.get('#forgot-password-btn-292') // Kitapsepeti hatırlat butonu ID'si
    }

    visit() {
        cy.visit('/'); //
    }

    login(email, password) {
    this.elements.loginPanelTrigger().click({ force: true });
    
    // { force: true } ekleyerek engeli bypass ediyoruz
    if(email) this.elements.emailInput().type(email, { force: true });
    if(password) this.elements.passwordInput().type(password, { force: true });
    
    this.elements.loginSubmitBtn().click({ force: true });
}
}

export default new LoginPage();