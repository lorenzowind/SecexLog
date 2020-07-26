import React from 'react';

import { Container, DataSection } from './styles';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Table from '../../../components/Table';

import iconSearch from '../../../assets/icon-search.png';
import iconEdit from '../../../assets/icon-edit.png';

const ListingData: React.FC = () => {
  return (
    <>
      <Header isAuthenticated />

      <Menu />

      <Container>
        <DataSection>
          <h1>Usuários</h1>
          <hr />

          <strong>Pesquisar usuários</strong>
          <div>
            <input type="text" placeholder="Usuário..." />
            <button type="button">
              <img src={iconSearch} alt="Search" />
            </button>
          </div>

          <section>
            <strong>Adicionar usuário</strong>
            <button type="button">+</button>
          </section>

          <Table>
            <tr>
              <th>Usuário</th>
              <th>Login</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Senha</th>
            </tr>
            <tr>
              <td>Maria Silva</td>
              <td>SMaria</td>
              <td>mariasilva@gmail.comaaaaaaaaaaaaa</td>
              <td>Admin</td>
              <td>*********</td>
              <td>
                <button type="button">
                  <img src={iconEdit} alt="Edit" />
                </button>
              </td>
            </tr>
          </Table>
        </DataSection>

        <DataSection>
          <h1>Usuários</h1>
          <hr />

          <strong>Pesquisar usuários</strong>
          <div>
            <input type="text" placeholder="Usuário..." />
            <button type="button">
              <img src={iconSearch} alt="Search" />
            </button>
          </div>

          <section>
            <strong>Adicionar usuário</strong>
            <button type="button">+</button>
          </section>

          <Table>
            <tr>
              <th>Usuário</th>
              <th>Login</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Senha</th>
            </tr>
            <tr>
              <td>Maria Silva</td>
              <td>SMaria</td>
              <td>mariasilva@gmail.comaaaaaaaaaaaaa</td>
              <td>Admin</td>
              <td>*********</td>
              <td>
                <button type="button">
                  <img src={iconEdit} alt="Edit" />
                </button>
              </td>
            </tr>
          </Table>
        </DataSection>

        <DataSection>
          <h1>Usuários</h1>
          <hr />

          <strong>Pesquisar usuários</strong>
          <div>
            <input type="text" placeholder="Usuário..." />
            <button type="button">
              <img src={iconSearch} alt="Search" />
            </button>
          </div>

          <section>
            <strong>Adicionar usuário</strong>
            <button type="button">+</button>
          </section>

          <Table>
            <tr>
              <th>Usuário</th>
              <th>Login</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Senha</th>
            </tr>
            <tr>
              <td>Maria Silva</td>
              <td>SMaria</td>
              <td>mariasilva@gmail.comaaaaaaaaaaaaa</td>
              <td>Admin</td>
              <td>*********</td>
              <td>
                <button type="button">
                  <img src={iconEdit} alt="Edit" />
                </button>
              </td>
            </tr>
          </Table>
        </DataSection>

        <DataSection>
          <h1>Usuários</h1>
          <hr />

          <strong>Pesquisar usuários</strong>
          <div>
            <input type="text" placeholder="Usuário..." />
            <button type="button">
              <img src={iconSearch} alt="Search" />
            </button>
          </div>

          <section>
            <strong>Adicionar usuário</strong>
            <button type="button">+</button>
          </section>

          <Table>
            <tr>
              <th>Usuário</th>
              <th>Login</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Senha</th>
            </tr>
            <tr>
              <td>Maria Silva</td>
              <td>SMaria</td>
              <td>mariasilva@gmail.comaaaaaaaaaaaaa</td>
              <td>Admin</td>
              <td>*********</td>
              <td>
                <button type="button">
                  <img src={iconEdit} alt="Edit" />
                </button>
              </td>
            </tr>
          </Table>
        </DataSection>

        <DataSection>
          <h1>Usuários</h1>
          <hr />

          <strong>Pesquisar usuários</strong>
          <div>
            <input type="text" placeholder="Usuário..." />
            <button type="button">
              <img src={iconSearch} alt="Search" />
            </button>
          </div>

          <section>
            <strong>Adicionar usuário</strong>
            <button type="button">+</button>
          </section>

          <Table>
            <tr>
              <th>Usuário</th>
              <th>Login</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Senha</th>
            </tr>
            <tr>
              <td>Maria Silva</td>
              <td>SMaria</td>
              <td>mariasilva@gmail.comaaaaaaaaaaaaa</td>
              <td>Admin</td>
              <td>*********</td>
              <td>
                <button type="button">
                  <img src={iconEdit} alt="Edit" />
                </button>
              </td>
            </tr>
          </Table>
        </DataSection>

        <DataSection>
          <h1>Usuários</h1>
          <hr />

          <strong>Pesquisar usuários</strong>
          <div>
            <input type="text" placeholder="Usuário..." />
            <button type="button">
              <img src={iconSearch} alt="Search" />
            </button>
          </div>

          <section>
            <strong>Adicionar usuário</strong>
            <button type="button">+</button>
          </section>

          <Table>
            <tr>
              <th>Usuário</th>
              <th>Login</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Senha</th>
            </tr>
            <tr>
              <td>Maria Silva</td>
              <td>SMaria</td>
              <td>mariasilva@gmail.comaaaaaaaaaaaaa</td>
              <td>Admin</td>
              <td>*********</td>
              <td>
                <button type="button">
                  <img src={iconEdit} alt="Edit" />
                </button>
              </td>
            </tr>
          </Table>
        </DataSection>
      </Container>
    </>
  );
};

export default ListingData;
