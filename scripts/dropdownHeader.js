document.querySelectorAll(".header__dropdown > a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const parent = this.closest(".header__dropdown");
    parent.classList.toggle("active");
  });
});

// Закрывать при клике вне
document.addEventListener("click", (e) => {
  document.querySelectorAll(".header__dropdown").forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});
