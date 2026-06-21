gsap.registerPlugin(ScrollTrigger);

/* Hero Animation */

gsap.from(".hero-title", {
    opacity: 0,
    y: 100,
    duration: 1.5
});

gsap.from(".hero-hashtag", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.4
});

gsap.from(".hero-buttons", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.8
});

/* Scroll Reveal */

gsap.utils
.toArray(".reveal")
.forEach((element) => {

    gsap.from(element, {
        opacity: 0,
        y: 80,
        duration: 1,

        scrollTrigger: {
            trigger: element,
            start: "top 85%"
        }
    });

});