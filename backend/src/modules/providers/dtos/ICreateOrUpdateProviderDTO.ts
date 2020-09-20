export default interface ICreateOrUpdateHolidayDTO {
  name: string;
  phone_number?: string;
  email?: string;
  modal_id: string;
  preference: 'CPF' | 'CNPJ';
  preference_data: string;
}
