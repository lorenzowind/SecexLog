export default interface ICreateOrUpdateHolidayDTO {
  name: string;
  city_id?: string;
  initial_date?: string;
  end_date?: string;
}
