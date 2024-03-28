document.addEventListener("DOMContentLoaded", () => {
  // Показать еще

  // const showMore = document.querySelector(".our-stories__show-more");
  // const videoInner = document.querySelector(".our-stories__vide-inner");
  // let innerHeight = videoInner.offsetHeight;

  // showMore.addEventListener("click", (e) => {
  //   e.preventDefault();

  //   const cardHeight =
  //     document.querySelector(".our-stories__card").offsetHeight;
  //   const wrapperHeight = document.querySelector(".video-wrapper").offsetHeight;

  //   innerHeight += cardHeight;
  //   videoInner.style.maxHeight = `${innerHeight + 24}px`;

  //   if (videoInner.clientHeight >= wrapperHeight - cardHeight) {
  //     showMore.disabled = true;
  //     videoInner.classList.add("end");
  //   }
  // });

  // Аккордион

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

  const cardImages = document.querySelectorAll(".our-stories__card-img");

  Array.from(
    cardImages.forEach((cardImage) => {
      cardImage.addEventListener("click", (e) => {
        cardImage.parentNode.innerHTML = cardImage.dataset.iframe;
      });
    })
  );
});
