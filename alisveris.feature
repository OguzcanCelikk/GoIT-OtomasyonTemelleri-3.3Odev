Feature: Çevrimiçi Mağaza Alışveriş Süreci

  Scenario: Kullanıcının ürün arayıp başarılı bir şekilde satın alması

    Given: Kullanıcı "www.trendyol.com" ana sayfasındadır
    And: Kullanıcı sisteme kayıtlı e-posta ve şifresi ile giriş yapmıştır
    
    When: Arama çubuğuna "Kulaklık" yazar ve "Ara" butonuna tıklar
    And: Arama sonuçları sayfasında listelenen ilk ürüne tıklar
    And: Ürün detay sayfasında "Sepete Ekle" butonuna tıklar
    And: "Sepetim" sayfasına gider ve "Alışverişi Tamamla" butonuna tıklar
    And: Teslimat adresi ve ödeme bilgilerini eksiksiz doldurur
    And: "Siparişi Onayla" butonuna basar
    
    Then: Ekranda "Siparişiniz Başarıyla Alındı" mesajını görmelidir
    And: Ekranda sipariş özetini ve sipariş numarasını görmelidir