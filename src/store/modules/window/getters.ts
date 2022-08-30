import WindowSize from "@/store/modules/window/types/WindowSize";

const getters = {
  windowSize(): WindowSize {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
};

export default getters;
