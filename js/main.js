document.addEventListener("DOMContentLoaded", () => {
  // set iframe
  const cardImages = document.querySelectorAll(".our-stories__card-img");

  cardImages.forEach((cardImage) => {
    cardImage.addEventListener("click", function (e) {
      const boxHeight = this.offsetHeight;
      const parentBox = this.parentNode;

      parentBox.innerHTML = this.dataset.iframe;
      parentBox.children[0].setAttribute("height", `${boxHeight}px`);
    });
  });

  // accordion

  const accordionLabels = document.querySelectorAll(".qa__lable-inner");
  const accordionBoxes = document.querySelectorAll(".qa__box");
  const qaInfo = document.querySelectorAll(".qa__info");

  accordionLabels.forEach((item) => {
    item.addEventListener("click", accordionAction);
    item.addEventListener("touchend", accordionAction);
  });

  function accordionAction() {
    const currentBox = this.closest(".qa__box");
    const currentContent = this.nextElementSibling;

    accordionBoxes.forEach((box) => {
      box.classList.remove("open");
    });
    qaInfo.forEach((item) => {
      item.style.maxHeight = "0";
    });

    currentBox.classList.toggle("open");

    if (currentBox.classList.contains("open")) {
      currentContent.style.maxHeight = `${currentContent.scrollHeight}px`;
    }
  }

  // show more
  const showButtons = document.querySelectorAll("button.show-more");

  Array.from(showButtons).forEach((button) => {
    button.addEventListener("click", showMore);
  });

  function showMore(e) {
    const currentBox = document.querySelector(`${this.dataset.id}`);
    const cardHeight =
      currentBox.children[currentBox.children.length - 1].offsetHeight;

    let innerHeight = currentBox.offsetHeight;
    innerHeight += cardHeight;

    currentBox.style.maxHeight = `${innerHeight + 24}px`;

    if (currentBox.offsetHeight >= currentBox.scrollHeight - cardHeight) {
      this.disabled = true;
      currentBox.classList.add("end");
    }
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry);
          // ссылка на оригинальное изображение хранится в атрибуте "data-src"
          document.querySelector(".work__img").src = entry.target.dataset.img;

          // observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document
    .querySelectorAll(".work__card[data-img]")
    .forEach((img) => observer.observe(img));
});
