document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) return;

    const newsLink = [...document.querySelectorAll('.header__links a')].find(el => el.textContent.trim() === 'Новости');

    const tooltip = document.getElementById('news-promotion-tooltip');
    if (!newsLink || !tooltip) return;

    function positionTooltip() {
        const rect = newsLink.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        tooltip.style.left = (rect.left + scrollLeft + rect.width / 2) + 'px';
        tooltip.style.top = (rect.bottom + scrollTop + 8) + 'px'; 
        tooltip.style.transform = 'translateX(-50%)';
    }

    let showTimer = setTimeout(() => {
        positionTooltip();
        tooltip.classList.add('show');

        let hideTimer = setTimeout(() => {
            tooltip.classList.remove('show');
        }, 7000);

        tooltip.querySelector('.tooltip-close').addEventListener('click', () => {
            clearTimeout(hideTimer);
            tooltip.classList.remove('show');
        });

    }, 1);

    window.addEventListener('resize', () => {
        if (tooltip.classList.contains('show')) {
            positionTooltip();
        }
    });
});