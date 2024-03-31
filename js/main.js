function postAjax(url, data, success) {
  var params =
    typeof data == "string"
      ? data
      : Object.keys(data)
        .map(function (k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        })
        .join("&");

  var xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open("POST", url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState > 3 && xhr.status == 200) {
      success(xhr.responseText);
    }
  };
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(params);
  return xhr;
}

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

  // change photo
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelector(".work__img").src = entry.target.dataset.img;
        }
      });
    },
    { threshold: 0.5 }
  );

  document
    .querySelectorAll(".work__card[data-img]")
    .forEach((card) => observer.observe(card));

  // sendForm
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener('shown.bs.modal', () => {
      myInput.focus()
    })
  })

  forms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let form = new FormData(event.target);

      let fields = {};
      fields["formid"] = event.target.dataset.formid;

      for (const key of form.keys()) {
        fields[key] = form.get(key);
      }

      console.log(fields);

      postAjax("SendForm.php", fields, function (data) {
        console.log(data);
      });
    });
  });

  document.querySelector('#modalForm').addEventListener('show.bs.modal', event => {

    const modalTitle = document.querySelector('.modal__form-title');
    const modalext = document.querySelector('.modal__form-text')

    if (event.relatedTarget.dataset.info === 'cost') {
      modalTitle.innerText = 'Расчитать стоимость'
    }
    if (event.relatedTarget.dataset.info === 'meetup') {
      modalTitle.innerText = 'Записаться на онлайн встречу'
    }
    if (event.relatedTarget.dataset.info === 'callback') {
      modalTitle.innerText = 'Заказать обратный звонок'
    }
  })

});
