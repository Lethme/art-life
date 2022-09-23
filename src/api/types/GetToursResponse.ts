import Tour from "@/api/types/Tour";
import ToursMeta from "@/api/types/ToursMeta";
import ToursLinks from "@/api/types/ToursLinks";

interface GetToursResponse {
  data?: Array<Tour>;
  meta?: ToursMeta;
  links?: ToursLinks;
}

export default GetToursResponse;
