let controller;
let slideScene;
let pageScene;

function animateSlides() {
  // init controller
  controller = new ScrollMagic.Controller();
  // select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  sliders.forEach((slide, index, slides) => {
    // targeting the div that's hiding the image
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    // GSAP (item, time, object with property I want to change)
    // gsap.to(revealImg, 1, { x: "100%" });
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    // target item, object where to animate from, object where to animate to
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    // add overflow hidden to make the image zoom in and out instead of making it bigger
    // -=1 animate one second sooner
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
    // create scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "slide",
      // })
      .addTo(controller);
    // new animation:
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      // last the whole time of the slide
      duration: "100%",
      triggerHook: 0,
    })
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "page",
      //   indent: 200,
      // })
      // animation doesn't start till the pin is hit
      .setPin(slide, { pushFollowers: false }) // push Follower allows page to come right after one another
      .setTween(pageTl)
      .addTo(controller);
  });
}
// mouse effects
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    gsap.to(".title-swipe", 1, { y: "100%" });
    mouseTxt.innerText = "";
  }
}
// window is the whole screen
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

// burger effect
const burger = document.querySelector(".burger");

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    // move circle that's at position -10% to enlarge and cover the page
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

burger.addEventListener("click", navToggle);

animateSlides();
