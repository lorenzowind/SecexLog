export default interface ICreateOrUpdateUserDTO {
  name: string;
  login: string;
  email: string;
  position: 'usuario' | 'admin';
  password: string;
}
