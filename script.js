document.addEventListener('DOMContentLoaded', () => {

   
    const linkler = document.querySelectorAll('.menu a');
    const sayfalar = document.querySelectorAll('.sayfa');

    linkler.forEach(link => {
        link.addEventListener('click', (e) => {
            const hedefId = link.getAttribute('href');

           
            if (!hedefId.startsWith('#')) return;

            e.preventDefault(); 

           
            sayfalar.forEach(sayfa => {
                sayfa.classList.remove('aktif');
            });

           
            const hedefSayfa = document.querySelector(hedefId);
            if (hedefSayfa) {
                hedefSayfa.classList.add('aktif');
            }
        });
    });

    
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

           
            if (body.classList.contains('dark-mode')) {
                toggleBtn.innerText = '☀️ Mod';
            } else {
                toggleBtn.innerText = '🌙 Mod';
            }
        });
    }

   
    const projeListesi = document.getElementById('projeListesi');

   
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
        .catch(hata => console.error('Veri çekilemedi:', hata));
});