import PaginationFilterQuery from "@/api/types/PaginationFilterQuery";

interface TourFilterQuery extends PaginationFilterQuery {
  country?: string;
  region?: string;
  comfort_level?: number;
  activity_level?: number;
  type?: number;
  price?: string;
  date?: string;
  sort?: string;
}
