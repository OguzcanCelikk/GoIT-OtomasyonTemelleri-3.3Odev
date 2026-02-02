# Copilot / AI Agent Yönergeleri — Kitapsepeti Cypress Projesi

Bu doküman, bir AI kod asistanının bu depoda hızlı şekilde verimli çalışması için gerekli proje-özgü bilgileri içerir.

Özet
- Bu repo bir Cypress E2E test projesidir; testler `cypress/e2e` altında, page-object'ler `cypress/support/pages` ve `Ödev/pages` içinde bulunur.
- Test hedefi: https://www.kitapsepeti.com (baseUrl), konfigürasyon: [cypress.config.js](cypress.config.js#L1-L20).

Önemli dosyalar
- Testler: [cypress/e2e/kitapsepet.cy.js](cypress/e2e/kitapsepet.cy.js#L1-L200)
- Page objects: [cypress/support/pages/Loginpage.js](cypress/support/pages/Loginpage.js#L1-L200)
- Ek örnek: [Ödev/pages/Login.js](Ödev/pages/Login.js#L1-L200)
- Proje bağımlılıkları: [package.json](package.json#L1-L200)

Büyük Resim / Mimari
- Tek amaç: hedef web sitesine karşı E2E senaryoları koşmak (kullanıcı girişi, negatif senaryolar, şifre hatırlatma, kısıtlama testi).
- Page-object yaklaşımı kullanılıyor: her sayfa bir sınıf, `elements` içinde selector fonksiyonları, sınıf metotları (örn. `login()`) ile etkileşim.
- Testler doğrudan UI üzerinde çalışıyor; network stubbing veya backend mocking görünmüyor.

Proje Özgü Kurallar & Pattern'ler
- Page object örneği (dosya: [cypress/support/pages/Loginpage.js](cypress/support/pages/Loginpage.js#L1-L200)):
  - `elements` nesnesi: selector fonksiyonları (örn. `emailInput: () => cy.get('#header-email')`).
  - Metotlar: `visit()`, `login(email,password)` şeklinde singleton olarak `export default new LoginPage()` ile dışa aktarılıyor.
  - Ödev örneğinde ise `export const loginPage = new Login()` kullanımı var — her iki pattern'e dikkat edin.
- Testlerde sık kullanılan pratikler:
  - `click({ force: true })` ile DOM engelleri atlanıyor.
  - Sayfa açılışında overlay/iframe gibi elemanları gizlemek için test içinde DOM manipülasyonu yapılabiliyor (örn. `.invoke('css', 'display','none')`).
  - Hata mesajları `.popover-item` gibi sınıf selector'larıyla assert ediliyor.

Çalıştırma ve Debug (tıpkı bir geliştirici için)
- Lokal interaktif çalıştırma: `npx cypress open` (Cypress GUI) veya `npx cypress open --e2e` (sürüm farklılıklarına göre). Bu repo `cypress` v15.x kullanıyor: [package.json](package.json#L1-L50).
- Headless CI/terminal: `npx cypress run --e2e` veya `npx cypress run`.
- Performance test aracı: `artillery` yüklü. Örnek çalışma: `npx artillery run Ödev/performans-test.yml`.

Güvenlik / Gizli Bilgiler
- Depoda test kullanıcı bilgileri (`kitapsepet.cy.js` içindeki e-posta/şifre) görünür durumda. AI ajanları bunları değiştirmez veya açık bir şekilde yaymaz; eğer refactor yapılacaksa, bunları `cypress/fixtures` veya environment değişkenlerine taşıyın.

Değişiklik & Geliştirme İpuçları
- Yeni page-object eklerken mevcut `elements` + metot pattern'ini takip edin ve `export default new X()` formatını tercih edin (tutarlılık için).
- Yeni test eklerken: overlay kontrolü (başlangıçta) ve `force:true` kullanımını göz önünde bulundurun; doğrudan network stub'lamak isterseniz önce takım ile karar alın.
- CI entegrasyonu yok; eklenecekse `npx cypress run --e2e --record` veya uygun komutlar kullanılarak `package.json` script'leri eklenmeli.

Örnek koda atıf
- Giriş yapma helper: [cypress/support/pages/Loginpage.js#L20-L38](cypress/support/pages/Loginpage.js#L20-L38)
- Test akışı örneği: [cypress/e2e/kitapsepet.cy.js#L1-L120](cypress/e2e/kitapsepet.cy.js#L1-L120)

Beklenen davranışlar AI ajan için
- Değişiklik yaparken proje-özgü konvansiyonları koru: page-object `elements` yapısı, `force:true` tercihleri, overlay temizliği.
- Test verisi veya gizli anahtar görüldüğünde bunu taşıma/parameterize etme önerisinde bulunun; doğrudan kaldırmayın.

Geri bildirim
- Bu dosyayı güncelledim; eksik gördüğünüz veya detaylandırmamı istediğiniz bölümleri belirtin, hızlıca iterasyon yaparım.
