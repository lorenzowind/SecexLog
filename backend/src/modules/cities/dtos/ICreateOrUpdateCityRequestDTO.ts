export default interface ICreateOrUpdateCityDTO {
  name: string;
  is_base?: boolean;
  is_auditated?: boolean;
  related_cities?: {
    related_city_id: string;
  }[];
  latitude?: number;
  longitude?: number;
  initial_flood_date?: string;
  end_flood_date?: string;
  interdiction_observation?: string;
  city_observation?: string;
}
