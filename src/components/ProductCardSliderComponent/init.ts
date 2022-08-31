/* That was forced 'cause sliders would work only on a first time page is loaded */
/* Check /public/js/apps.js for document.initProductSliders */
import ProductCardSliderComponent from "@/components/ProductCardSliderComponent/index";
import ProductCardSliderSkeletonComponent from "@/components/ProductCardSliderComponent/skeleton/ProductCardSliderSkeletonComponent.vue";

type Context =
  | typeof ProductCardSliderComponent
  | typeof ProductCardSliderSkeletonComponent;

const init = (context: Context) => {
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

const initSliders = async (context: Context) => {
  await init(context);
  document.addEventListener("DOMContentLoaded", init.bind(null, context));
};

export const removeInitSlidersListener = (context: Context) => {
  document.removeEventListener("DOMContentLoaded", init.bind(null, context));
};

export default initSliders;
