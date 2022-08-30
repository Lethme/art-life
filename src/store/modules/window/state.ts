import WindowSize from "@/store/modules/window/types/WindowSize";

export interface State {
  windowSize: WindowSize;
}

const state: State = {
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
};

export default state;
