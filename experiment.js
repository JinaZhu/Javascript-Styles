const hikeExp = document.querySelector(".hike-exp");

window.addEventListener("scroll", scrollReveal);

function scrollReveal() {
  const hikePos = hikeExp.getBoundingClientRect().top;
  const windowHeight = window.innerHeight / 1.5;

  if (hikePos < windowHeight) {
    hikeExp.style.color = "red";
  }
}
