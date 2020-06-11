let controller;
let slideScene;

function animateSlides() {
  // init controller
  controller = new ScrollMagic.Controller();
  // select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  sliders.forEach((slide) => {
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
    })
      .setTween(slideTl)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "slide",
      })
      .addTo(controller);
  });
}

animateSlides();
