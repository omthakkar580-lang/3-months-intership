gsap.registerPlugin(ScrollTrigger);

// Hero animation
gsap.from(".hero-title", {
  opacity: 0,
  y: -50,
  duration: 1
});

gsap.from(".hero-subtitle", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.5
});

gsap.from(".btn", {
  opacity: 0,
  scale: 0.5,
  duration: 0.8,
  delay: 1
});

// Section animations
gsap.utils.toArray(".section").forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 100,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 80%"
    }
  });
});

// Project cards animation
gsap.from(".project-card", {
  opacity: 0,
  y: 50,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".projects",
    start: "top 75%"
  }
});
