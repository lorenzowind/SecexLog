export interface PathData {
  selected_period: {
    selected_date: string;
    selected_initial_time: string;
    selected_final_time: string;
    selected_initial_week_day: string;
    selected_final_week_day: string;
  };
  cities_location: {
    origin_city_latitude: number;
    origin_city_longitude: number;
    destination_city_latitude: number;
    destination_city_longitude: number;
  };
  path_data: {
    origin_city_name: string;
    destination_city_name: string;
    modal_name: string;
    modal_image: string;
    provider_name: string;
    duration: number;
    mileage: number;
    cost: number;
    boarding_place: string;
    departure_place: string;
  };
}

export interface PathResultsSection {
  price: number;
  util_days: number;
  distance: number;
  initial_date: string;
  final_date: string;
  observations: {
    observation: string;
  }[];
  paths: PathData[];
}

export default interface ISearchResponseDTO {
  result: {
    general_info: {
      origin_city_name?: string;
      destination_cities_names?: {
        destination_city_name: string;
      }[];
      initial_date?: string;
      final_date?: string;
    };
    paths_result: PathResultsSection[];
  };
}
