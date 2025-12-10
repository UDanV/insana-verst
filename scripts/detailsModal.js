document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('specialistModal');
    if (!modal) return; // защита на случай, если модалки нет в DOM

    const links = document.querySelectorAll('.specialists__card a');
    const closeModalTriggers = modal.querySelectorAll('[data-close]');

    links.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const card = link.closest('.specialists__card');
            const imgSrc = card.querySelector('img').src;
            const name = card.querySelector('h4').textContent;
            const position = card.querySelector('p').textContent;

            const imgTop = document.getElementById('modalSpecialistImageTop');
            const imgBottom = document.getElementById('modalSpecialistImageBottom');

            if (imgTop) {
                imgTop.src = imgSrc;
                imgTop.alt = name;
            }
            if (imgBottom) {
                imgBottom.src = imgSrc;
                imgBottom.alt = name;
            }

            document.getElementById('modalSpecialistName').textContent = name;
            document.getElementById('modalSpecialistPosition').textContent = position;
            document.getElementById('modalSpecialistBio').innerHTML = `
                Выдающийся врач, уникальный специалист.<br>
                Врач-дерматовенеролог, трихолог, эксперт в&nbsp;области пересадки волос по&nbsp;бесшовному методу HFE, дипломированный специалист, постоянный участник российских тематических профессиональных семинаров и&nbsp;форумов.<br>
                Стаж&nbsp;— 5&nbsp;лет<br>
                Более 1 700&nbsp;проведённых пересадок<br>
                Работает по&nbsp;уникальному бесшовному методу пересадки волос HFE, использует передовые технологии в&nbsp;области пересадки волос.
            `;

            modal.style.display = 'flex'; 
            document.body.style.overflow = 'hidden';
        });
    });

    closeModalTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});