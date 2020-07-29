import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useUser, UserState } from '../../../hooks/modules/user';
import { useCity, CityState } from '../../../hooks/modules/city';
import { useHoliday, HolidayState } from '../../../hooks/modules/holiday';

import { Container, DataSection } from './styles';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Input from '../../../components/Input';
import Table from '../../../components/Table';
import LoadingPartial from '../../../components/Loading/LoadingPartial';

import UserOperationsPopup from '../../../components/Popup/CRUD/UserOperationsPopup';
import CityUpdatingPopup from '../../../components/Popup/CRUD/CityUpdatingPopup';

import iconSearch from '../../../assets/icon-search.png';
import iconEdit from '../../../assets/icon-edit.png';

interface ModuleHeaderProps {
  pluralName:
    | 'usuários'
    | 'cidades'
    | 'feriados'
    | 'provedores'
    | 'modais'
    | 'trajetos';
  singularName:
    | 'usuário'
    | 'cidade'
    | 'feriado'
    | 'provedor'
    | 'modal'
    | 'trajeto';
  name: 'User' | 'City' | 'Holiday' | 'Provider' | 'Modal' | 'Path';
}

interface UserOperationsPopupProps {
  operation: 'criar' | 'editar';
  user?: UserState;
}

interface CityUpdatingPopupProps {
  city: CityState;
}

interface SearchData {
  searchUser?: string;
  searchCity?: string;
  searchHoliday?: string;
  searchProvider?: string;
  searchModal?: string;
  searchPath?: string;
}

const ListingData: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [goCityForm, setGoCityForm] = useState(false);
  const [goHolidayForm, setGoHolidayForm] = useState(false);

  const [userOperationsPopupActive, setUserOperationsPopupActive] = useState(
    false,
  );
  const [userOperationsPopup, setUserOperationsPopup] = useState<
    UserOperationsPopupProps
  >({} as UserOperationsPopupProps);
  const [cityUpdatingPopupActive, setCityUpdatingPopupActive] = useState(false);
  const [cityUpdatingPopup, setCityUpdatingPopup] = useState<
    CityUpdatingPopupProps
  >({} as CityUpdatingPopupProps);

  const [loadingPartial, setLoadingPartial] = useState(false);

  const { users, getUsers, setSearchUsers } = useUser();
  const { cities, getCities, setSearchCities } = useCity();
  const { holidays, getHolidays, setSearchHolidays } = useHoliday();

  const handleGetData = useCallback(async () => {
    setLoadingPartial(true);

    await Promise.all([getUsers(), getCities(), getHolidays()]).then(() => {
      setLoadingPartial(false);
    });
  }, [getCities, getHolidays, getUsers]);

  const handleSearch = useCallback(
    (data: SearchData, module: ModuleHeaderProps) => {
      setLoadingPartial(true);

      switch (module.singularName) {
        case 'usuário':
          if (!data.searchUser) {
            setSearchUsers('');
          } else {
            setSearchUsers(data.searchUser);
          }
          break;
        case 'cidade':
          if (!data.searchCity) {
            setSearchCities('');
          } else {
            setSearchCities(data.searchCity);
          }
          break;
        case 'feriado':
          if (!data.searchHoliday) {
            setSearchHolidays('');
          } else {
            setSearchHolidays(data.searchHoliday);
          }
          break;
        default:
          break;
      }
      setLoadingPartial(false);
    },
    [setSearchCities, setSearchHolidays, setSearchUsers],
  );

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const ModuleHeader: React.FC<ModuleHeaderProps> = ({
    singularName,
    pluralName,
    name,
  }) => (
    <>
      <h1>{pluralName.charAt(0).toUpperCase() + pluralName.slice(1)}</h1>
      <hr />

      <strong>
        Pesquisar
        {` ${pluralName}`}
      </strong>

      <div>
        <Form
          ref={formRef}
          onSubmit={e => handleSearch(e, { pluralName, singularName, name })}
        >
          <Input
            name={`search${name}`}
            type="text"
            placeholder={
              singularName.charAt(0).toUpperCase() +
              singularName.slice(1).concat('...')
            }
          />
          <button type="submit">
            <img src={iconSearch} alt="Search" />
          </button>
        </Form>
      </div>

      <section>
        <strong>
          Adicionar
          {` ${singularName}`}
        </strong>
        <button
          type="button"
          onClick={() => {
            switch (singularName) {
              case 'usuário':
                setUserOperationsPopupActive(true);
                setUserOperationsPopup({
                  operation: 'criar',
                });
                setSearchUsers('');
                break;
              case 'cidade':
                setGoCityForm(true);
                break;
              case 'feriado':
                setGoHolidayForm(true);
                break;
              default:
                break;
            }
          }}
        >
          +
        </button>
      </section>
    </>
  );

  const UsersTable: React.FC = () => (
    <Table module="usuário">
      <thead>
        <tr>
          <th>Usuário</th>
          <th>Login</th>
          <th>Email</th>
          <th>Cargo</th>
          <th>Senha</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.nome}</td>
            <td>{user.login}</td>
            <td>{user.email}</td>
            <td>{user.cargo}</td>
            <td>{'*'.repeat(user.senha.length)}</td>
            <td>
              <button
                type="button"
                onClick={() => {
                  setUserOperationsPopupActive(true);
                  setUserOperationsPopup({
                    operation: 'editar',
                    user,
                  });
                }}
              >
                <img src={iconEdit} alt="Edit" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const CitiesTable: React.FC = () => (
    <Table module="cidade">
      <thead>
        <tr>
          <th>Nome</th>
          <th />
          <th>Nome</th>
          <th />
          <th>Nome</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {cities.map((_city, index, array) => {
          let current = index;

          if (current !== 0) {
            current += 2 * current;
          }
          return (
            <tr key={`${index}-${index + 1}-${index + 2}`}>
              {array[current] && (
                <>
                  <td>{array[current].nome}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setCityUpdatingPopupActive(true);
                        setCityUpdatingPopup({
                          city: array[current],
                        });
                      }}
                    >
                      <img src={iconEdit} alt="Edit" />
                    </button>
                  </td>
                </>
              )}
              {array[current + 1] && (
                <>
                  <td>{array[current + 1].nome}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setCityUpdatingPopupActive(true);
                        setCityUpdatingPopup({
                          city: array[current + 1],
                        });
                      }}
                    >
                      <img src={iconEdit} alt="Edit" />
                    </button>
                  </td>
                </>
              )}
              {array[current + 2] && (
                <>
                  <td>{array[current + 2].nome}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setCityUpdatingPopupActive(true);
                        setCityUpdatingPopup({
                          city: array[current + 2],
                        });
                      }}
                    >
                      <img src={iconEdit} alt="Edit" />
                    </button>
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  const HolidaysTable: React.FC = () => (
    <Table module="feriado">
      <div>
        <thead>
          <tr>
            <th>Nacionais</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {holidays
            .filter(holiday => holiday.national)
            .map(holidayNational => (
              <tr key={holidayNational.id}>
                <td>{holidayNational.nome}</td>
                <td>
                  <button type="button" onClick={() => {}}>
                    <img src={iconEdit} alt="Edit" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </div>
      <div>
        <thead>
          <tr>
            <th>Específicos</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {holidays
            .filter(holiday => !holiday.national)
            .map(holidaySpecific => (
              <tr key={holidaySpecific.id}>
                <td>{holidaySpecific.nome}</td>
                <td>
                  <button type="button" onClick={() => {}}>
                    <img src={iconEdit} alt="Edit" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </div>
    </Table>
  );

  return (
    <>
      {loadingPartial && <LoadingPartial />}

      {goCityForm && <Redirect push to="city-form" />}
      {goHolidayForm && <Redirect push to="holiday-form" />}

      {userOperationsPopupActive && (
        <UserOperationsPopup
          operation={userOperationsPopup.operation}
          user={userOperationsPopup.user}
          setUserOperationsPopupActive={setUserOperationsPopupActive}
        />
      )}
      {cityUpdatingPopupActive && (
        <CityUpdatingPopup
          city={cityUpdatingPopup.city}
          setCityUpdatingPopupActive={setCityUpdatingPopupActive}
        />
      )}

      <Header isAuthenticated />

      <Menu />

      <Container>
        <DataSection>
          <ModuleHeader
            pluralName="usuários"
            singularName="usuário"
            name="User"
          />
          <UsersTable />
        </DataSection>

        <DataSection>
          <ModuleHeader
            pluralName="cidades"
            singularName="cidade"
            name="City"
          />
          <CitiesTable />
        </DataSection>

        <DataSection>
          <ModuleHeader
            pluralName="feriados"
            singularName="feriado"
            name="Holiday"
          />
          <HolidaysTable />
        </DataSection>
      </Container>
    </>
  );
};

export default ListingData;
