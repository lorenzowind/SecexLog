import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import ListUsersService from './ListUsersService';

let draftUsersRepository: DraftUsersRepository;

let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();

    listUsers = new ListUsersService(draftUsersRepository);
  });

  it('should be able to list the users', async () => {
    await draftUsersRepository.create({
      name: 'John Doe',
      login: 'john doe',
      email: 'johndoe@example.com',
      position: 'admin',
      password: '123456',
    });

    await draftUsersRepository.create({
      name: 'John Doe II',
      login: 'john doe II',
      email: 'johndoeII@example.com',
      position: 'admin',
      password: '123456',
    });

    const response = await listUsers.execute();

    expect(response).toHaveLength(2);
  });
});
