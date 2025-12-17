document.addEventListener("DOMContentLoaded", () => {

  class GallerySlider {
    constructor(sectionSelector, wrapperSelector, trackSelector, prevBtnSelector, nextBtnSelector, dotsSelector, gapDefault = 20) {
      this.section = document.querySelector(sectionSelector);
      if (!this.section) return;

      this.wrapper = this.section.querySelector(wrapperSelector);
      this.track = this.wrapper.querySelector(trackSelector);
      this.slides = Array.from(this.track.children);

      this.prevBtn = this.section.querySelector(prevBtnSelector);
      this.nextBtn = this.section.querySelector(nextBtnSelector);

      this.dotsContainer = this.wrapper.querySelector(dotsSelector);
      this.dots = [];

      this.gap = parseFloat(getComputedStyle(this.track).gap) || gapDefault;
      this.currentIndex = 0;
      this.slidesPerView = 1;

      this.touchStartX = 0;
      this.touchEndX = 0;

      this.init();
    }

    init() {
      if (!this.track || !this.slides.length) return;

      if (this.prevBtn && this.nextBtn) {
        this.prevBtn.addEventListener("click", () => {
          if (window.innerWidth <= 768) return;
          this.currentIndex = Math.max(this.currentIndex - this.slidesPerView, 0);
          this.updatePosition();
        });

        this.nextBtn.addEventListener("click", () => {
          if (window.innerWidth <= 768) return;
          const maxIndex = this.slides.length - this.slidesPerView;
          this.currentIndex = Math.min(this.currentIndex + this.slidesPerView, maxIndex);
          this.updatePosition();
        });
      }

      this.track.addEventListener("touchstart", (e) => this.handleTouchStart(e));
      this.track.addEventListener("touchmove", (e) => this.handleTouchMove(e));
      this.track.addEventListener("touchend", () => this.handleTouchEnd());

      window.addEventListener("resize", () => this.updateSlider());
      this.updateSlider();
    }

    handleTouchStart(e) {
      this.touchStartX = e.touches[0].clientX;
    }

    handleTouchMove(e) {
      this.touchEndX = e.touches[0].clientX;
    }

    handleTouchEnd() {
      const diff = this.touchStartX - this.touchEndX;
      if (Math.abs(diff) < 50) return;

      if (diff > 0) this.swipeNext();
      else this.swipePrev();
    }

    swipeNext() {
      const maxIndex = this.slides.length - 1;
      this.currentIndex = Math.min(this.currentIndex + 1, maxIndex);
      this.updatePosition();
    }

    swipePrev() {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
      this.updatePosition();
    }

    updateSlider() {
      const wrapperWidth = this.wrapper.clientWidth;
      const slideWidth = this.slides[0].getBoundingClientRect().width;

      if (window.innerWidth <= 768) {
        this.slidesPerView = 1;

        if (this.dotsContainer) this.dotsContainer.style.display = "none";
        if (this.prevBtn) this.prevBtn.style.display = "none";
        if (this.nextBtn) this.nextBtn.style.display = "none";
      } else {
        this.slidesPerView = Math.max(Math.floor((wrapperWidth + this.gap) / (slideWidth + this.gap)), 1);

        if (this.dotsContainer) this.dotsContainer.style.display = "flex";
        if (this.prevBtn) this.prevBtn.style.display = "block";
        if (this.nextBtn) this.nextBtn.style.display = "block";

        this.createDots();
      }

      const maxIndex = Math.max(this.slides.length - this.slidesPerView, 0);
      this.currentIndex = Math.min(this.currentIndex, maxIndex);

      this.updatePosition();
    }

    updatePosition() {
      const slideWidth = this.slides[0].getBoundingClientRect().width;
      const offset = window.innerWidth <= 768
        ? this.currentIndex * slideWidth
        : this.currentIndex * (slideWidth + this.gap);

      this.track.style.transform = `translateX(-${offset}px)`;
      this.track.style.transition = "transform 0.3s ease";

      this.updateDots();
    }

    createDots() {
      if (!this.dotsContainer) return;

      this.dotsContainer.innerHTML = "";
      this.dots = [];
      const pages = Math.ceil(this.slides.length / this.slidesPerView);

      for (let i = 0; i < pages; i++) {
        const dot = document.createElement("div");
        dot.classList.add(this.dotsContainer.classList[0].replace("__dots", "__dot"));

        dot.addEventListener("click", () => {
          this.currentIndex = i * this.slidesPerView;
          this.updatePosition();
        });

        this.dotsContainer.appendChild(dot);
        this.dots.push(dot);
      }

      this.updateDots();
    }

    updateDots() {
      if (!this.dots.length) return;
      const activePage = Math.floor(this.currentIndex / this.slidesPerView);
      this.dots.forEach((dot, i) => dot.classList.toggle("active", i === activePage));
    }
  }

  new GallerySlider(".feedback", ".feedback__wrapper", ".feedback__gallery", ".feedback__arrow--prev", ".feedback__arrow--next", ".feedback__dots", 30);
  new GallerySlider(".results", ".results__wrapper", ".results__gallery", ".results__arrow--prev", ".results__arrow--next", ".results__dots", 30);
  new GallerySlider(".video", ".video__wrapper", ".video__gallery", ".video__arrow--prev", ".video__arrow--next", ".video__dots", 20);
  new GallerySlider(".everything", ".everything__wrapper", ".everything__gallery", ".everything__arrow--prev", ".everything__arrow--next", ".everything__dots", 20);
  new GallerySlider(".articles", ".articles__wrapper", ".articles__gallery", ".articles__arrow--prev", ".articles__arrow--next", ".articles__dots", 20);

});