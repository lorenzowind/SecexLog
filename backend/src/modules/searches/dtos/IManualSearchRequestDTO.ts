export default interface IManualSearchRequestDTO {
  data: {
    origin_city_id: string;
    destination_city_id: string;
    date: string;
  }[];
}
