export default interface ICreateOrUpdateCityDTO {
  name: string;
  is_base?: boolean;
  is_auditated?: boolean;
  latitude?: number;
  longitude?: number;
  initial_flood_date?: string;
  end_flood_date?: string;
  interdiction_observation?: string;
  city_observation?: string;
}
