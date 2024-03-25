const showMore = document.querySelector(".our-stories__show-more");
const videoInner = document.querySelector(".our-stories__vide-inner");
let innerHeight = videoInner.offsetHeight;

showMore.addEventListener("click", (e) => {
  e.preventDefault();

  const cardHeight = document.querySelector(".our-stories__card").offsetHeight;
  const wrapperHeight = document.querySelector(".video-wrapper").offsetHeight;

  innerHeight += cardHeight;
  videoInner.style.maxHeight = `${innerHeight + 24}px`;

  if (videoInner.clientHeight >= wrapperHeight - cardHeight) {
    showMore.disabled = true;
    videoInner.classList.add("end");
  }
});
