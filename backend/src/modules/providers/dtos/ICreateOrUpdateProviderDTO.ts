export default interface ICreateOrUpdateHolidayDTO {
  name: string;
  phone_number?: string;
  email?: string;
  modal_id: string;
  prefence: 'CPF' | 'CNPJ';
  prefence_data: string;
}
