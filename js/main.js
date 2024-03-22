const showMore = document.querySelector(".our-stories__show-more");
const videoInner = document.querySelector(".our-stories__vide-inner");
const cardHeight = document.querySelector(".our-stories__card").clientHeight;
const wrapperHeight = document.querySelector(".video-wrapper").clientHeight;
let innerHeight = videoInner.clientHeight;

showMore.addEventListener("click", (e) => {
  e.preventDefault();

  innerHeight += cardHeight;
  videoInner.style.maxHeight = `${innerHeight + 24}px`;

  console.log(innerHeight)
  if (videoInner.clientHeight >= wrapperHeight - cardHeight) {
    document.querySelector(".our-stories__show-more").disabled = true;
    videoInner.classList.add('end')
  }
});
