import TourType from "@/api/types/TourType";
import CountryType from "@/api/types/CountryType";

export interface State {
  tourTypes: TourType[];
  countries: CountryType[];
}

const state: State = {
  tourTypes: [],
  countries: [],
};

export default state;
