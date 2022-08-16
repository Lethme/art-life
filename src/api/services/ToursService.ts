import TourType from "@/api/types/TourType";
import axios from "axios";
import ApiService from "@/api/services/ApiService";
import PaginationFilterQuery from "@/api/types/PaginationFilterQuery";
import Tour from "@/api/types/Tour";
import CountryType from "@/api/types/CountryType";

class ToursService extends ApiService {
  static async GetTourTypes(): Promise<TourType[] | undefined> {
    const response = await axios.get(this.CreateRequest("tours/types"));

    if (response.data) return response.data.data;
    return undefined;
  }
  static async GetToursByTypeId(
    id: number,
    query?: PaginationFilterQuery
  ): Promise<Tour[] | undefined> {
    const response = await axios.get(this.CreateRequest("tours", query));

    if (response.data) return response.data.data;
    return undefined;
  }
  static async GetCountries(): Promise<CountryType[] | undefined> {
    const response = await axios.get(this.CreateRequest("tours/countries"));

    if (response.data) return response.data.data;
    return undefined;
  }
}

export default ToursService;
