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
    item.addEventListener("click, touchend", function (e) {
      e.preventDefault();

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
    });
  });
});
