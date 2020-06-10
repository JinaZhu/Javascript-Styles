const hikeExp = document.querySelector(".hike-exp");
const slide = document.querySelector(".hike");

// // change classes base on scroll
// window.addEventListener("scroll", scrollReveal);
// function scrollReveal() {
//   const hikePos = hikeExp.getBoundingClientRect().top;
//   const windowHeight = window.innerHeight / 1.5;

//   if (hikePos < windowHeight) {
//     hikeExp.style.color = "red";
//   }
// }

//triger an element when it comes into view: intersection observer
let options = {
  threshold: 0.5,
};
let observer = new IntersectionObserver(slideAnim, options);

function slideAnim(entries) {
  // entries is all the item we have
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      slide.style.background = "white";
    }
  });
}
// these are entries, can have as many as you want
observer.observe(slide);
