/* That was forced 'cause sliders would work only on a first time page is loaded */
/* Check /public/js/apps.js for document.initProductSliders */
const init = () => {
  const initProductSliders = (document as any).initProductSliders;

  if (initProductSliders) {
    initProductSliders({
      320: {
        slidesPerView: "auto",
        spaceBetween: 32,
        speed: 1e3,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    });
  }
};

const initSliders = () => {
  init();
  document.addEventListener("DOMContentLoaded", init);
};

export default initSliders;
