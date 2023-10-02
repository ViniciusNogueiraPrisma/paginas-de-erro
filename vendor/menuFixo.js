function debounce(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}

let offset = 0;
function menuFixo() {
  const header = document.querySelector(".headerFixoMenu");
  if (header) {
    if (window.pageYOffset > header.clientHeight && window.pageYOffset < 450) {
      header.classList.add("menu-bar");
      setTimeout(() => (header.style.top = "0"), 100);
    } else if (
      window.pageYOffset >= header.clientHeight &&
      header.classList.contains("menu-bar") &&
      offset <= window.pageYOffset
    ) {
      header.style.top = "";
      setTimeout(() => header.classList.remove("menu-bar"), 600);
    } else if (
      offset > window.pageYOffset &&
      !header.classList.contains("menu-bar")
    ) {
      header.classList.add("menu-bar");
      setTimeout(() => (header.style.top = "0"), 100);
    }
    offset = window.pageYOffset;

    if (window.pageYOffset == 0) {
      header.classList.remove("menu-bar");
      setTimeout(() => (header.style.top = ""), 100);
    }
  }
}
menuFixo();

window.addEventListener("scroll", debounce(menuFixo, 140));
