import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import ListPaginationUsersService from './ListPaginationUsersService';

let draftUsersRepository: DraftUsersRepository;

let draftCacheProvider: DraftCacheProvider;

let listPaginationUsers: ListPaginationUsersService;

describe('ListPaginationUsers', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();

    draftCacheProvider = new DraftCacheProvider();

    listPaginationUsers = new ListPaginationUsersService(
      draftUsersRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the users from the first page', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe II',
      login: 'john doe II',
      email: 'johndoeII@example.com',
      position: 'Administrador',
      password: '123456',
    });

    const response = await listPaginationUsers.execute('', 1, user.id);

    expect(response).toHaveLength(2);
  });

  it('should not be able to list users without authentication', async () => {
    await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe II',
      login: 'john doe II',
      email: 'johndoeII@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await expect(
      listPaginationUsers.execute('', 1, null),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to validate a non positive page number', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    const response = await listPaginationUsers.execute('', -1, user.id);

    expect(response).toHaveLength(1);
  });

  it('should not be able to list users from the second page without accumulate the first one', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    const response = await listPaginationUsers.execute('', 2, user.id);

    expect(response).toHaveLength(0);
  });

  it('should be able to return the same users if the same request is made', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await listPaginationUsers.execute('', 1, user.id);

    const response = await listPaginationUsers.execute('', 1, user.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate users from the first page on the second one', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await listPaginationUsers.execute('', 1, user.id);

    const response = await listPaginationUsers.execute('', 2, user.id);

    expect(response).toHaveLength(1);
  });

  it('should be able to accumulate all the users', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe II',
      login: 'john doe II',
      email: 'johndoeII@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe III',
      login: 'john doe III',
      email: 'johndoeIII@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe IV',
      login: 'john doe IV',
      email: 'johndoeIV@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe V',
      login: 'john doe V',
      email: 'johndoeV@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe VI',
      login: 'john doe VI',
      email: 'johndoeVI@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe VII',
      login: 'john doe VII',
      email: 'johndoeVII@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe VIII',
      login: 'john doe VIII',
      email: 'johndoeVIII@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe IX',
      login: 'john doe IX',
      email: 'johndoeIX@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe X',
      login: 'john doe X',
      email: 'johndoeX@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe XI',
      login: 'john doe XI',
      email: 'johndoeXI@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe XII',
      login: 'john doe XII',
      email: 'johndoeXII@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await listPaginationUsers.execute('', 1, user.id);

    const response = await listPaginationUsers.execute('', 2, user.id);

    expect(response).toHaveLength(12);
  });

  it('should be able to list all the users from the first page who includes a search string', async () => {
    const userSearch = 'User Searching';

    const user = await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe II',
      login: 'john doe II',
      email: 'johndoeII@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: userSearch,
      login: 'john doe III',
      email: 'johndoeIII@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe IV',
      login: 'john doe IV',
      email: 'johndoeIV@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe V',
      login: 'john doe V',
      email: 'johndoeV@example.com',
      position: 'Administrador',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe VI',
      login: 'john doe VI',
      email: 'johndoeVI@example.com',
      position: 'Administrador',
      password: '123456',
    });

    const response = await listPaginationUsers.execute(userSearch, 1, user.id);

    expect(response).toHaveLength(1);
  });
});
