//////// Sayfaları çağırma
import { loginPage } from './pages/Login';
import { homePage } from './pages/HomePage';

describe('GoIT Login ve Logout Testleri (POP Yapısı)', () => {

  beforeEach(() => {
    cy.viewport(1280, 720);
    loginPage.navigate();
  });

  it('Test No 1: user888 ile giriş ve çıkış', () => {
    /////// Sayfa butonlarını kullanarak giriş yap
    loginPage.login('user888@gmail.com', '1234567890');

    ////// Sayfa butonlarını kullanarak çıkış yap
    homePage.logout();
    
    ////// Doğrulama
    cy.url().should('include', '/account/login');
  });

  it('Test No 2: testowyqa ile giriş ve çıkış', () => {
    //////// İkinci kullanıcı için giriş yap
    loginPage.login('testowyqa@qa.team', 'QA!automation-1');

    ///////// Çıkış yap
    homePage.logout();
    
    ///////// Doğrulama
    cy.url().should('include', '/account/login');
  });

});