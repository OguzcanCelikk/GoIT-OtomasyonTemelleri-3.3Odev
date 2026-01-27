class HomePage {
    logout() {
        ////// 1. Sağ üstteki Avatar resmine tıkla (Hamburger menü yok) (Sayfa geç yüklenebilir diye timeout eklendi)
        cy.get('img[src*="user-avatar"]', { timeout: 10000 }).should('be.visible').click();

        // 2. Açılan menüden 'Log out' seçeneğine tıkla
        cy.get('div[data-valuetext="Log out"]').should('be.visible').click();
    }
}

export const homePage = new HomePage();