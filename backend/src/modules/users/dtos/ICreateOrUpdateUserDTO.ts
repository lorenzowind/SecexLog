export default interface ICreateOrUpdateUserDTO {
  name: string;
  login: string;
  email: string;
  position: 'Usuário' | 'Administrador';
  password: string;
}
