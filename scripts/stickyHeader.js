document.addEventListener('DOMContentLoaded', () => {
    const headerTop = document.querySelector('.header__top');
    const headerBottom = document.querySelector('.header__bottom');

    const triggerPoint = headerBottom.offsetTop;

    function handleScroll() {
        if (window.scrollY >= triggerPoint) {
            headerBottom.classList.add('header__bottom--fixed');
            headerTop.classList.add('header__top--hidden');
        } else {
            headerBottom.classList.remove('header__bottom--fixed');
            headerTop.classList.remove('header__top--hidden');
        }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);
});