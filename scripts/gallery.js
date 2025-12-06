const wrapper = document.querySelector('.results__wrapper');
const track = document.querySelector('.results__gallery');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.results__arrow--next');
const prevBtn = document.querySelector('.results__arrow--prev');

let currentIndex = 0;
let slidesPerView = 1;
let gap = 30;

function updateSliderConfig() {
  const wrapperWidth = wrapper.clientWidth;
  const slideWidth = slides[0].getBoundingClientRect().width + gap;

  slidesPerView = Math.floor(wrapperWidth / slideWidth);
  if (slidesPerView < 1) slidesPerView = 1;

  updateSlidePosition();
}

function updateSlidePosition() {
  const slideWidth = slides[0].getBoundingClientRect().width + gap;
  const maxIndex = slides.length - slidesPerView;
  
  if (currentIndex > maxIndex) currentIndex = maxIndex < 0 ? 0 : maxIndex;
  
  const offset = slideWidth * currentIndex;
  track.style.transform = `translateX(-${offset}px)`;
}

nextBtn.addEventListener('click', () => {
  currentIndex++;
  updateSlidePosition();
});

prevBtn.addEventListener('click', () => {
  currentIndex--;
  updateSlidePosition();
});

window.addEventListener('load', updateSliderConfig);
window.addEventListener('resize', updateSliderConfig);