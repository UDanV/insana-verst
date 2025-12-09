const cards = document.querySelectorAll('.feedback__card');

cards.forEach(card => {
  const text = card.querySelector('.feedback__text');
  const btn  = card.querySelector('.feedback__more');

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    text.classList.toggle('expanded');
    btn.textContent = text.classList.contains('expanded')
      ? 'Скрыть'
      : 'Читать полностью';
  });
});