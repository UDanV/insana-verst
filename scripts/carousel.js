document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('specialistsGallery');
    const cards = Array.from(gallery.querySelectorAll('.specialists__card'));
    const prevBtn = document.querySelector('.specialists__prev');
    const nextBtn = document.querySelector('.specialists__next');
    const counterEl = document.querySelector('.specialists__counter');

    let currentIndex = 0;
    let visibleCards = 0;
    let totalCards = cards.length;

    function readGap() {
        const gs = getComputedStyle(gallery);
        const gapValue = gs.gap || gs.columnGap || gs.gridColumnGap || '0px';
        return parseFloat(gapValue) || 0;
    }

    function calculateVisibleCards() {
        if (!cards.length) return 0;

        const gap = readGap();
        const cardWidth = cards[0].offsetWidth; 
        const slotWidth = cardWidth + gap; 
        const wrapperWidth = gallery.parentElement.clientWidth;

        const fit = Math.floor((wrapperWidth + gap) / slotWidth); 
        return Math.max(1, Math.min(totalCards, fit));
    }

    function setGalleryFullWidth() {
        const gap = readGap();
        const cardWidth = cards[0].offsetWidth;
        const totalWidth = totalCards * cardWidth + Math.max(0, totalCards - 1) * gap;
        gallery.style.width = `${Math.ceil(totalWidth)}px`;
    }

    function updateCounter() {
        const lastVisible = Math.min(totalCards, currentIndex + visibleCards);
        counterEl.querySelector('.specialists__counter--current').textContent = lastVisible;
        counterEl.querySelector('.specialists__counter--total').textContent = totalCards;
    }

    function updateGalleryPosition() {
        const gap = readGap();
        const cardWidth = cards[0].offsetWidth;
        const slot = cardWidth + gap;
        const offset = -currentIndex * slot;
        gallery.style.transform = `translateX(${offset}px)`;
    }

    function nextSlide() {
        if (currentIndex < totalCards - visibleCards) {
            currentIndex++;
            updateGalleryPosition();
            updateCounter();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateGalleryPosition();
            updateCounter();
        }
    }

    function initCarousel() {
        if (!cards.length) return;

        visibleCards = calculateVisibleCards();
        visibleCards = Math.max(1, Math.min(totalCards, visibleCards));

        if (currentIndex > totalCards - visibleCards) {
            currentIndex = Math.max(0, totalCards - visibleCards);
        }

        setGalleryFullWidth();
        updateGalleryPosition();
        updateCounter();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    window.addEventListener('resize', initCarousel);

    initCarousel();
});


document.addEventListener('DOMContentLoaded', () => {

    const gallery = document.querySelector(".license__gallery");
    if (!gallery) return;

    const cards = Array.from(gallery.querySelectorAll(".license__card"));
    const prevBtn = document.querySelector(".license__prev");
    const nextBtn = document.querySelector(".license__next");
    const counterEl = document.querySelector(".license__counter");

    const currentEl = counterEl.querySelector(".license__counter--current");
    const totalEl = counterEl.querySelector(".license__counter--total");

    let currentIndex = 0;
    const totalCards = cards.length;

    function getSlotWidth(i) {
        const style = getComputedStyle(gallery);
        const gap = parseFloat(style.gap) || 0;
        return cards[i].offsetWidth + gap;
    }

    function getWidths() {
        return cards.map((_, i) => getSlotWidth(i));
    }

    function getCumulative(widths) {
        const out = [0];
        for (let i = 0; i < widths.length; i++) out.push(out[i] + widths[i]);
        return out;
    }

    function getVisible(widths) {
        const wrapperWidth = gallery.parentElement.clientWidth;
        let total = 0;
        let i = currentIndex;

        while (i < widths.length && total + widths[i] <= wrapperWidth) {
            total += widths[i];
            i++;
        }

        return Math.max(1, i - currentIndex);
    }

    function updateGallery(widths, cumulative) {
        gallery.style.transform = `translateX(${-cumulative[currentIndex]}px)`;
    }

    function updateCounter(visible) {
        currentEl.textContent = Math.min(totalCards, currentIndex + visible);
        totalEl.textContent = totalCards;
    }

    function initCarousel() {
        const widths = getWidths();
        const cumulative = getCumulative(widths);
        const visible = getVisible(widths);

        updateGallery(widths, cumulative);
        updateCounter(visible);

        nextBtn.onclick = () => {
            if (currentIndex < totalCards - 1) {
                currentIndex++;
                updateGallery(widths, cumulative);
                updateCounter(getVisible(widths));
            }
        };

        prevBtn.onclick = () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateGallery(widths, cumulative);
                updateCounter(getVisible(widths));
            }
        };
    }

    window.addEventListener("resize", initCarousel);
    initCarousel();
});