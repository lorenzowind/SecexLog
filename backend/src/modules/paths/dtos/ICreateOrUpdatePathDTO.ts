export default interface ICreateOrUpdatePathDTO {
  origin_city_id: string;
  destination_city_id: string;
  modal_id: string;
  provider_id: string;
  boarding_days: string;
  boarding_times: string;
  duration: number;
  mileage: number;
  cost: number;
  boarding_place: string;
  departure_place: string;
  is_hired: boolean;
}
