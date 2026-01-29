describe('API Otomasyon Testleri (JSONPlaceholder)', () => {

    const baseUrl = 'https://jsonplaceholder.typicode.com';

    //////// TEST 1: GET İsteği
    it('1. GET - Tüm gönderileri getir ve 200 olduğunu doğrula', () => {
        cy.request('GET', `${baseUrl}/posts`).then((response) => {
            expect(response.status).to.eq(200);
            ////// Gelen cevabın bir liste olduğunu ve boş olmadığını doğrula
            expect(response.body).to.be.an('array').that.is.not.empty;
        });
    });

    ///////// TEST 2: POST İsteği
    it('2. POST - Yeni bir gönderi oluştur', () => {
        const newPost = {
            title: 'Test Otomasyonu',
            body: 'Cypress ile API testi.',
            userId: 1
        };

        cy.request('POST', `${baseUrl}/posts`, newPost).then((response) => {
            expect(response.status).to.eq(201); /////// 201: Created
            expect(response.body.title).to.eq('Test Otomasyonu');
        });
    });

    /////////// TEST 3: Header Gönderimi ve Kontrolü
    it('3. HEADERS - Özel Header gönderimi', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/posts/1`,
            headers: {
                'User-Agent': 'MyCypressBot/1.0',
                'X-Custom-Header': 'GoIT-Odev'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            ///////// Gelen cevabın JSON formatında olduğunu doğrula
            expect(response.headers['content-type']).to.include('application/json');
        });
    });

    //////////// TEST 4: Dinamik Query Parametreleri ve Rastgele Veri
    it('4. DYNAMIC PARAMS - Rastgele bir kullanıcı ID ile sorgu yap', () => {
        ////////// 1 ile 10 arasında rastgele sayı yaz
        const randomId = Math.floor(Math.random() * 10) + 1;

        cy.request('GET', `${baseUrl}/users?id=${randomId}`).then((response) => {
            expect(response.status).to.eq(200);
            ////////// Gelen listedeki ilk kullanıcının ID'sinin bizim ürettiğimizle aynı olduğunu doğrula
            expect(response.body[0].id).to.eq(randomId);
        });
    });

    ////////// TEST 5: Body Detaylı Doğrulanması
    it('5. BODY CHECK - Gelen veri tiplerini kontrol et', () => {
        cy.request('GET', `${baseUrl}/users/1`).then((response) => {
            const user = response.body;
            
            //////////// ID'nin sayı, ismin string olduğunu doğrula
            expect(user).to.have.property('id').that.is.a('number');
            expect(user).to.have.property('name').that.is.a('string');
            expect(user).to.have.property('email').that.is.a('string');
            
            ////////// Email içinde @ işareti var mı?
            expect(user.email).to.include('@');
        });
    });

    ////////// TEST 6: Performans Testi
    it('6. PERFORMANCE - İstek süresini ölç (1500ms altı)', () => {
        cy.request('GET', `${baseUrl}/photos`).then((response) => {
            /////////// response.duration isteğin kaç milisaniye
            expect(response.duration).to.be.lessThan(1500); 
        });
    });

    //////////// TEST 7: PUT İsteği
    it('7. PUT - Mevcut bir kaydı güncelle', () => {
        const updateData = {
            id: 1,
            title: 'Güncellenmiş Başlık',
            body: 'Güncellenmiş içerik',
            userId: 1
        };

        cy.request('PUT', `${baseUrl}/posts/1`, updateData).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.title).to.eq('Güncellenmiş Başlık');
        });
    });

    ////////// TEST 8: DELETE İsteği
    it('8. DELETE - Bir kaydı sil', () => {
        cy.request('DELETE', `${baseUrl}/posts/1`).then((response) => {
            expect(response.status).to.eq(200); ///////// JSONPlaceholder silme işlemine 200 döner
        });
    });

    ///////////// TEST 9: Negatif Test
    it('9. NEGATIVE - Olmayan bir sayfaya git (404 Bekleniyor)', () => {
        // failOnStatusCode: false diyoruz ki Cypress testi durdurmasın
        cy.request({
            method: 'GET',
            url: `${baseUrl}/posts/999999`, /////// Böyle bir ID yok
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(404); //////// Bulunamadı hatası dönmeli
        });
    });

    /////////// TEST 10: PATCH İsteği
    it('10. PATCH - Sadece başlığı değiştir', () => {
        cy.request('PATCH', `${baseUrl}/posts/1`, { title: "Sadece Başlık Değişti" }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.title).to.eq("Sadece Başlık Değişti");
        });
    });

});