document.addEventListener('DOMContentLoaded', function() {
   
    const toggleButton = document.getElementById('darkModeToggle');
    const body = document.body;

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            toggleButton.textContent = body.classList.contains('dark-mode') ? '☀️ Mod' : '🌙 Mod';
        });
    }

    
    const linkler = document.querySelectorAll('nav a');
    const sayfalar = document.querySelectorAll('.sayfa');

    linkler.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sayfaId = link.getAttribute('href').substring(1);

            history.pushState(null, null, `#${sayfaId}`);


            sayfalar.forEach(sayfa => sayfa.classList.remove('aktif'));
            const aktifSayfa = document.getElementById(sayfaId);

            if (aktifSayfa) {
                aktifSayfa.classList.add('aktif');
            }

            
        });
    });

   
    const projeListesi = document.getElementById('projeListesi');

    if (projeListesi) {
        fetch('projeler.json')
            .then(cevap => cevap.json())
            .then(projeler => {
                projeListesi.innerHTML = '';
                projeler.forEach(proje => {
                    const kart = document.createElement('div');
                    kart.classList.add('proje-karti');
                   
                    kart.innerHTML = `
                        <h3>${proje.baslik}</h3>
                        <p>${proje.aciklama}</p>
                        <small><strong>Etiketler:</strong> ${proje.etiketler}</small>
                    `;
                    projeListesi.appendChild(kart);
                });
            })
            .catch(hata => console.error('Hata:', hata));
    }
});