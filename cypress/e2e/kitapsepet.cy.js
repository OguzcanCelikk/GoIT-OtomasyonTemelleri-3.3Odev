import LoginPage from '../support/pages/Loginpage'

describe('Kitapsepeti US01: Kullanıcı Girişi Tüm Senaryolar', () => {
    
    beforeEach(() => {
    LoginPage.visit();
    // Eğer o overlay varsa, onu DOM'dan kaldır veya gizle
    cy.get('body').then(($body) => {
        if ($body.find('.ccp---nb-interstitial-overlay').length > 0) {
            cy.get('.ccp---nb-interstitial-overlay').invoke('css', 'display', 'none');
        }
    });
});

    it('AC1 & AC2: UI Elemanlarının Kontrolü', () => {
        LoginPage.elements.loginPanelTrigger().click({ force: true });
        LoginPage.elements.emailInput().should('exist');
        LoginPage.elements.passwordInput().should('exist');
        LoginPage.elements.loginSubmitBtn().should('exist');
        LoginPage.elements.forgotPasswordBtn().should('exist');
        LoginPage.elements.registerBtn().should('exist');
    });

    it('AC3 & AC4: Başarılı Giriş (Pozitif)', () => {
        LoginPage.login('celik.oguzcan@hotmail.com', 'wSGYF8gMt2s.Ap');
        cy.get('#header-account', { timeout: 15000 }).should('be.visible');
        cy.visit("/uye-girisi-sayfasi");
        cy.url({ timeout: 10000 }).should('include', '/uye-girisi-sayfasi'); 
    });

    it('AC5, AC6, AC7: Negatif Giriş Senaryoları', () => {
        const scenarios = [
            { email: 'yanlis@mail.com', pass: '123', desc: 'AC5: Yanlış bilgiler' },
            { email: 'hatali_format', pass: '123', desc: 'AC6: Geçersiz format' },
            { email: ' ', pass: ' ', desc: 'AC7: Boş alanlar' }
        ];

        scenarios.forEach(sc => {
            LoginPage.login(sc.email, sc.pass);
            LoginPage.elements.errorMessage().should('exist')
                .and('contain', 'Giriş bilgileriniz hatalı.'); //
            cy.reload();
        });
    });

    it.skip ('AC8: Kısıtlama Testi (Brute Force)', () => {
        // 12 hatalı deneme döngüsü / AC8: Canlı sistem güvenlik duvarı IP engellediği için bu test pas geçilmiştir.
        Cypress._.times(12, () => {
            LoginPage.login('hacker@test.com', 'yanlis');
            cy.wait(1000)
        
        });
        cy.contains(/Çok fazla istek/i, { timeout: 20000 })
      .should('exist');
        LoginPage.elements.errorMessage({ timeout: 20000 }).should('exist')
        .and('contain', 'istek');
    });

    it('AC9: Şifremi Unuttum Akışı', () => {
        LoginPage.elements.loginPanelTrigger().click({ force: true });
        cy.contains('Şifremi Unuttum').click({ force: true });
        cy.url().should('include', 'uye-sifre-hatirlat'); //
        // Ekstra kontrol: Sayfada email alanı ve şifremi hatırlat butonu olmalı
        LoginPage.elements.forgotEmailInput().should('exist');
        LoginPage.elements.sendResetBtn().should('exist');
    });
});