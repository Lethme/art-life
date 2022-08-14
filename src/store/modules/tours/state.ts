import TourType from "@/api/types/TourType";

export interface State {
  tourTypes: TourType[];
}

const state: State = {
  tourTypes: [],
};

export default state;
