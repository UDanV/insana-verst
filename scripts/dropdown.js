document.querySelectorAll('.faq__card').forEach(card => {
    const header = card.querySelector('.faq__header');
    header.addEventListener('click', () => {
        card.classList.toggle('open');
    });
});
