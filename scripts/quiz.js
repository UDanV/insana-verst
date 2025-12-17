document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".quiz__step");
  const counterEl = document.querySelector(".quiz__counter span");
  const nextBtn = document.querySelector(".quiz__btn-next");
  const continueBtn = document.querySelector(".quiz__btn-continue");
  const backBtn = document.querySelector(".quiz__btn-back");
  const submitBtn = document.querySelector(".quiz__btn-submit");
  const imageContainer = document.querySelector(".quiz__image--container");
  const mainImage = document.querySelector(".quiz__image");
  const topTitle = document.querySelector(".quiz__info h2");
  const topSubtitle = document.querySelector(
    ".quiz__info p:not(.quiz__counter)"
  );

  const titles = [
    "Узнай твое дальнейшее лечение",
    "Узнай твое дальнейшее лечение",
    "Узнай твое дальнейшее лечение",
    "Узнай твое дальнейшее лечение",
    "Узнай твое дальнейшее лечение",
    "Узнай твое дальнейшее лечение",
    "Узнай твое дальнейшее лечение",
    "Куда прислать расчёт и рекомендации?",
  ];

  const subtitles = [
    "Пройди небольшой тест и получи рекомендации специалиста бесплатно",
    "Пройди небольшой тест и получи рекомендации специалиста бесплатно",
    "Пройди небольшой тест и получи рекомендации специалиста бесплатно",
    "Пройди небольшой тест и получи рекомендации специалиста бесплатно",
    "Пройди небольшой тест и получи рекомендации специалиста бесплатно",
    "Пройди небольшой тест и получи рекомендации специалиста бесплатно",
    "Пройди небольшой тест и получи рекомендации специалиста бесплатно",
    "Вот и всё! Благодарим за ответы. Укажите куда отправить расчёт и рекомендации.",
  ];

  let currentStep = 1;
  const totalSteps = steps.length;
  const answers = {};

  function showStep(step) {
    const counterContainer = document.querySelector(".quiz__counter");
    const progressbar = document.querySelector(".quiz__progressbar");

    steps.forEach((s) => s.classList.remove("active"));
    document
      .querySelector(`.quiz__step[data-step="${step}"]`)
      .classList.add("active");
    counterEl.textContent = step;

    topTitle.textContent = titles[step - 1];
    topSubtitle.textContent = subtitles[step - 1];

    if (step === 1) {
        nextBtn.style.display = "inline-block";
        backBtn.style.display = "none";
        continueBtn.style.display = "none";
        submitBtn.style.display = "none";
        nextBtn.disabled = true;
        imageContainer.style.display = "none";
    } else if (step === 8) {
        progressbar.style.display = "none";
        counterContainer.style.display = "none";
        nextBtn.style.display = "none";
        backBtn.style.display = "none";
        continueBtn.style.display = "none";
        submitBtn.style.display = "block";
        imageContainer.style.display = "flex";
        mainImage.style.display = "none";
    } else {
        nextBtn.style.display = "none";
        backBtn.style.display = "inline-block";
        continueBtn.style.display = "inline-block";
        continueBtn.disabled = true;
    }
  }

  function nextStep() {
    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
      continueBtn.disabled = true;
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  }

  nextBtn.addEventListener("click", () => {
    saveAnswer();
    nextStep();
  });

  continueBtn.addEventListener("click", () => {
    saveAnswer();
    nextStep();
  });

  backBtn.addEventListener("click", () => {
    prevStep();
    showStep(currentStep);
    updateProgress();
  });

  showStep(currentStep);

  function updateProgress() {
    const segments = document.querySelectorAll(".quiz__progress-segment");

    segments.forEach((seg, index) => {
      if (currentStep === 8) {
        seg.classList.add("active");
        return;
      }

      if (index < currentStep - 1) {
        seg.classList.add("active");
      } else {
        seg.classList.remove("active");
      }
    });

    counterEl.textContent = currentStep;
  }

  function checkAnswer() {
    const stepEl = document.querySelector(
      `.quiz__step[data-step="${currentStep}"]`
    );

    const inputs = stepEl.querySelectorAll(
      'input[type="radio"], input[type="checkbox"]'
    );
    const textInput = stepEl.querySelector('input[type="text"]');

    const hasChecked = Array.from(inputs).some((i) => i.checked);
    const hasText = textInput && textInput.value.trim() !== "";

    if (currentStep === 1) {
      nextBtn.disabled = !(hasChecked || hasText);
    } else {
      continueBtn.disabled = !(hasChecked || hasText);
    }
  }

  function saveAnswer() {
    const stepEl = document.querySelector(
      `.quiz__step[data-step="${currentStep}"]`
    );

    const checks = Array.from(
      stepEl.querySelectorAll(
        'input[type="radio"]:checked, input[type="checkbox"]:checked'
      )
    );
    const textInput = stepEl.querySelector('input[type="text"]');

    if (checks.length > 0) {
      const name = checks[0].name;
      answers[name] = checks.map((i) => i.value);
    }

    if (textInput && textInput.value.trim() !== "") {
      answers[textInput.name || "text_step_" + currentStep] =
        textInput.value.trim();
    }

    console.log("Ответы:", answers);
  }

  function goToNextStep() {
    if (currentStep >= totalSteps) {
      alert("Квиз завершён! Ответы: " + JSON.stringify(answers, null, 2));
      return;
    }

    document.querySelector(".quiz__step.active").classList.remove("active");
    currentStep++;
    document
      .querySelector(`.quiz__step[data-step="${currentStep}"]`)
      .classList.add("active");

    updateProgress();
    nextBtn.disabled = true;
  }

  document
    .querySelectorAll('input[type="radio"], input[type="checkbox"]')
    .forEach((input) => {
      input.addEventListener("change", checkAnswer);
    });

  document.querySelectorAll('input[type="text"]').forEach((input) => {
    input.addEventListener("input", checkAnswer);
  });

  document.querySelectorAll('input[name="family_line"]').forEach((input) => {
    input.addEventListener("change", (e) => {
      const group = document.querySelectorAll('input[name="family_line"]');
      group.forEach((i) => {
        if (i !== e.target) i.checked = false;
      });
      checkAnswer();
    });
  });

  updateProgress();
});
