import { Price } from "@/components/UI/PricePickerComponent/types";
import PricePickerComponent from "@/components/UI/PricePickerComponent/index";

export type UpdateFunc = (values: number[], valueIndex: number) => void;

export type InitFunc = (
  id: string,
  start: Price,
  range: Price,
  step: number,
  onUpdate: UpdateFunc
) => void;

type Context = typeof PricePickerComponent;

/* Another forced thing to make price picker work */
/* Check /public/js/apps.js for document.initRangedSlider */

const init = async (context: Context) => {
  const initRangedSlider: InitFunc = (document as any).initRangedSlider;

  if (initRangedSlider) {
    if (context.modelValue) {
      context.price.min = context.modelValue.price.min;
      context.price.max = context.modelValue.price.max;
      context.currency = context.modelValue.currency;
    }

    initRangedSlider(
      context.id,
      { ...context.price },
      { min: context.min, max: context.max },
      1,
      (values, handle) => {
        context.price = {
          min: +values[0],
          max: +values[1],
        };

        if (context.initialized) {
          context.pricePickerInitialized = true;
          context.$emit("statechange", context.state);
          context.$emit("update:modelValue", context.state);
        }
      }
    );
  }
};

const initRangedSlider = async (context: Context) => {
  await init(context);
  document.addEventListener("DOMContentLoaded", init.bind(null, context));
};

export const removeInitRangedSliderListener = (context: Context) => {
  document.removeEventListener("DOMContentLoaded", init.bind(null, context));
};

export default initRangedSlider;
