export default interface ICreateOrUpdateUserDTO {
  name: string;
  login: string;
  email: string;
  position: 'user' | 'admin';
  password: string;
}
