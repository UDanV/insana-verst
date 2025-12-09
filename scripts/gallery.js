// ResultsGallery

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

// FeedbackGallery

const fbWrapper = document.querySelector('.feedback__wrapper');
const fbTrack = fbWrapper.querySelector('.feedback__gallery');
const fbSlides = Array.from(fbTrack.children);
const fbNextBtn = document.querySelector('.feedback__arrow--next');
const fbPrevBtn = document.querySelector('.feedback__arrow--prev');
const fbDotsContainer = fbWrapper.querySelector('.feedback__dots');

let fbCurrentIndex = 0;
let fbSlidesPerView = 1;
let fbGap = 30;
let fbDots = [];

function updateFeedbackSlider() {
  const wrapperWidth = fbWrapper.clientWidth;
  const slideWidth = fbSlides[0].getBoundingClientRect().width + fbGap;

  fbSlidesPerView = Math.floor(wrapperWidth / slideWidth);
  if (fbSlidesPerView < 1) fbSlidesPerView = 1;

  updateFeedbackPosition();
  createFeedbackDots();
}

function createFeedbackDots() {
  fbDotsContainer.innerHTML = '';
  const pages = Math.ceil(fbSlides.length / fbSlidesPerView);

  fbDots = [];
  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('feedback__dot');
    if (i === Math.floor(fbCurrentIndex / fbSlidesPerView)) dot.classList.add('active');

    dot.addEventListener('click', () => {
      fbCurrentIndex = i * fbSlidesPerView; 
      updateFeedbackPosition();
    });

    fbDotsContainer.appendChild(dot);
    fbDots.push(dot);
  }
}

function updateFeedbackDots() {
  const activePage = Math.floor(fbCurrentIndex / fbSlidesPerView);
  fbDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activePage);
  });
}

function updateFeedbackPosition() {
  const slideWidth = fbSlides[0].getBoundingClientRect().width + fbGap;
  const maxIndex = fbSlides.length - fbSlidesPerView;

  fbCurrentIndex = Math.max(0, Math.min(fbCurrentIndex, maxIndex));

  const offset = slideWidth * fbCurrentIndex;
  fbTrack.style.transform = `translateX(-${offset}px)`;

  updateFeedbackDots();
}

if (fbNextBtn && fbPrevBtn) {
  fbNextBtn.addEventListener('click', () => {
    fbCurrentIndex += fbSlidesPerView;
    updateFeedbackPosition();
  });

  fbPrevBtn.addEventListener('click', () => {
    fbCurrentIndex -= fbSlidesPerView;
    updateFeedbackPosition();
  });
}

window.addEventListener('load', updateFeedbackSlider);
window.addEventListener('resize', updateFeedbackSlider);

// VideoGallery

const videoWrapper = document.querySelector('.video__wrapper');
const videoTrack = videoWrapper.querySelector('.video__gallery');
const videoSlides = Array.from(videoTrack.children);
const videoNextBtn = document.querySelector('.video__arrow--next');
const videoPrevBtn = document.querySelector('.video__arrow--prev');
const videoDotsContainer = videoWrapper.querySelector('.video__dots');

let videoCurrentIndex = 0;
let videoSlidesPerView = 1;
let videoGap = 20;
let videoDots = [];

function updateVideoSlider() {
  const wrapperWidth = videoWrapper.clientWidth;
  const slideWidth = videoSlides[0].getBoundingClientRect().width + videoGap;

  videoSlidesPerView = Math.floor(wrapperWidth / slideWidth);
  if (videoSlidesPerView < 1) videoSlidesPerView = 1;

  updateVideoPosition();
  createVideoDots();
}

function createVideoDots() {
  videoDotsContainer.innerHTML = '';
  const pages = Math.ceil(videoSlides.length / videoSlidesPerView);

  videoDots = [];
  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('video__dot');
    if (i === Math.floor(videoCurrentIndex / videoSlidesPerView)) dot.classList.add('active');

    dot.addEventListener('click', () => {
      videoCurrentIndex = i * videoSlidesPerView;
      updateVideoPosition();
    });

    videoDotsContainer.appendChild(dot);
    videoDots.push(dot);
  }
}

function updateVideoDots() {
  const activePage = Math.floor(videoCurrentIndex / videoSlidesPerView);
  videoDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activePage);
  });
}

function updateVideoPosition() {
  const slideWidth = videoSlides[0].getBoundingClientRect().width + videoGap;
  const maxIndex = videoSlides.length - videoSlidesPerView;

  videoCurrentIndex = Math.max(0, Math.min(videoCurrentIndex, maxIndex));

  const offset = slideWidth * videoCurrentIndex;
  videoTrack.style.transform = `translateX(-${offset}px)`;

  updateVideoDots();
}

if (videoNextBtn && videoPrevBtn) {
  videoNextBtn.addEventListener('click', () => {
    videoCurrentIndex += videoSlidesPerView;
    updateVideoPosition();
  });

  videoPrevBtn.addEventListener('click', () => {
    videoCurrentIndex -= videoSlidesPerView;
    updateVideoPosition();
  });
}

window.addEventListener('load', updateVideoSlider);
window.addEventListener('resize', updateVideoSlider);

// EverythingGallery

const everythWrapper = document.querySelector('.everything__wrapper');
const everythTrack = everythWrapper.querySelector('.everything__gallery');
const everythSlides = Array.from(everythTrack.children);
const everythNextBtn = document.querySelector('.everything__arrow--next');
const everythPrevBtn = document.querySelector('.everything__arrow--prev');
const everythDotsContainer = everythWrapper.querySelector('.everything__dots');

let everythCurrentIndex = 0;
let everythSlidesPerView = 1;
let everythGap = 20;
let everythDots = [];

function updateEverythingSlider() {
  const wrapperWidth = everythWrapper.clientWidth;
  const slideWidth = everythSlides[0].getBoundingClientRect().width + everythGap;

  everythSlidesPerView = Math.floor(wrapperWidth / slideWidth);
  if (everythSlidesPerView < 1) everythSlidesPerView = 1;

  updateEverythingPosition();
  createEverythingDots();
}

function createEverythingDots() {
  everythDotsContainer.innerHTML = '';
  const pages = Math.ceil(everythSlides.length / everythSlidesPerView);

  everythDots = [];
  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('everything__dot');
    if (i === Math.floor(everythCurrentIndex / everythSlidesPerView)) dot.classList.add('active');

    dot.addEventListener('click', () => {
      everythCurrentIndex = i * everythSlidesPerView;
      updateEverythingPosition();
    });

    everythDotsContainer.appendChild(dot);
    everythDots.push(dot);
  }
}

function updateEverythingDots() {
  const activePage = Math.floor(everythCurrentIndex / everythSlidesPerView);
  everythDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activePage);
  });
}

function updateEverythingPosition() {
  const slideWidth = everythSlides[0].getBoundingClientRect().width + everythGap;
  const maxIndex = everythSlides.length - everythSlidesPerView;

  everythCurrentIndex = Math.max(0, Math.min(everythCurrentIndex, maxIndex));

  const offset = slideWidth * everythCurrentIndex;
  everythTrack.style.transform = `translateX(-${offset}px)`;

  updateEverythingDots();
}

if (everythNextBtn && everythPrevBtn) {
  everythNextBtn.addEventListener('click', () => {
    everythCurrentIndex += everythSlidesPerView;
    updateEverythingPosition();
  });

  everythPrevBtn.addEventListener('click', () => {
    everythCurrentIndex -= everythSlidesPerView;
    updateEverythingPosition();
  });
}

window.addEventListener('load', updateEverythingSlider);
window.addEventListener('resize', updateEverythingSlider);

// ArticlesGallery

const articlesWrapper = document.querySelector('.articles__wrapper');
const articlesTrack = articlesWrapper.querySelector('.articles__gallery');
const articlesSlides = Array.from(articlesTrack.children);
const articlesNextBtn = document.querySelector('.articles__arrow--next');
const articlesPrevBtn = document.querySelector('.articles__arrow--prev');
const articlesDotsContainer = articlesWrapper.querySelector('.articles__dots');

let articlesCurrentIndex = 0;
let articlesSlidesPerView = 1;
let articlesGap = 20;
let articlesDots = [];

function updateArticlesSlider() {
  const wrapperWidth = articlesWrapper.clientWidth;
  const slideWidth = articlesSlides[0].getBoundingClientRect().width + articlesGap;

  articlesSlidesPerView = Math.floor(wrapperWidth / slideWidth);
  if (articlesSlidesPerView < 1) articlesSlidesPerView = 1;

  updateArticlesPosition();
  createArticlesDots();
}

function createArticlesDots() {
  articlesDotsContainer.innerHTML = '';
  const pages = Math.ceil(articlesSlides.length / articlesSlidesPerView);

  articlesDots = [];
  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('articles__dot');
    if (i === Math.floor(articlesCurrentIndex / articlesSlidesPerView)) dot.classList.add('active');

    dot.addEventListener('click', () => {
      articlesCurrentIndex = i * articlesSlidesPerView;
      updateArticlesPosition();
    });

    articlesDotsContainer.appendChild(dot);
    articlesDots.push(dot);
  }
}

function updateArticlesDots() {
  const activePage = Math.floor(articlesCurrentIndex / articlesSlidesPerView);
  articlesDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activePage);
  });
}

function updateArticlesPosition() {
  const slideWidth = articlesSlides[0].getBoundingClientRect().width + articlesGap;
  const maxIndex = articlesSlides.length - articlesSlidesPerView;

  articlesCurrentIndex = Math.max(0, Math.min(articlesCurrentIndex, maxIndex));

  const offset = slideWidth * articlesCurrentIndex;
  articlesTrack.style.transform = `translateX(-${offset}px)`;

  updateArticlesDots();
}

if (articlesNextBtn && articlesPrevBtn) {
  articlesNextBtn.addEventListener('click', () => {
    articlesCurrentIndex += articlesSlidesPerView;
    updateArticlesPosition();
  });

  articlesPrevBtn.addEventListener('click', () => {
    articlesCurrentIndex -= articlesSlidesPerView;
    updateArticlesPosition();
  });
}

window.addEventListener('load', updateArticlesSlider);
window.addEventListener('resize', updateArticlesSlider);