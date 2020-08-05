import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useUser, UserState } from '../../../hooks/modules/user';
import { useCity, CityState } from '../../../hooks/modules/city';
import { useHoliday, HolidayState } from '../../../hooks/modules/holiday';
import { useModal, ModalState } from '../../../hooks/modules/modal';
import { useProvider, ProviderState } from '../../../hooks/modules/provider';
import { usePath, PathState } from '../../../hooks/modules/path';

import { Container, DataSection, HolidaysTableContainer } from './styles';

import {
  Header,
  Menu,
  Input,
  Table,
  LoadingPartial,
  UserOperationsPopup,
  CityUpdatingPopup,
  HolidayUpdatingPopup,
  ModalUpdatingPopup,
  ProviderUpdatingPopup,
  PathUpdatingPopup,
} from '../../../components';

import iconSearch from '../../../assets/icon-search.png';
import iconEdit from '../../../assets/icon-edit.png';

interface ModuleHeaderProps {
  pluralName:
    | 'usuários'
    | 'cidades'
    | 'feriados'
    | 'prestadores'
    | 'modais'
    | 'trajetos';
  singularName:
    | 'usuário'
    | 'cidade'
    | 'feriado'
    | 'prestador'
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

interface HolidayUpdatingPopupProps {
  type: 'Nacional' | 'Específico';
  holiday: HolidayState;
}

interface ModalUpdatingPopupProps {
  modal: ModalState;
}

interface ProviderUpdatingPopupProps {
  provider: ProviderState;
}

interface PathUpdatingPopupProps {
  path: PathState;
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

  // states to control going to forms ------------------------------------------
  const [goCityForm, setGoCityForm] = useState(false);
  const [goHolidayForm, setGoHolidayForm] = useState(false);
  const [goModalForm, setGoModalForm] = useState(false);
  const [goProviderForm, setGoProviderForm] = useState(false);
  const [goPathForm, setGoPathForm] = useState(false);
  // ---------------------------------------------------------------------------

  // states to manage the popups -----------------------------------------------
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
  const [holidayUpdatingPopupActive, setHolidayUpdatingPopupActive] = useState(
    false,
  );
  const [holidayUpdatingPopup, setHolidayUpdatingPopup] = useState<
    HolidayUpdatingPopupProps
  >({} as HolidayUpdatingPopupProps);
  const [modalUpdatingPopupActive, setModalUpdatingPopupActive] = useState(
    false,
  );
  const [modalUpdatingPopup, setModalUpdatingPopup] = useState<
    ModalUpdatingPopupProps
  >({} as ModalUpdatingPopupProps);
  const [
    providerUpdatingPopupActive,
    setProviderUpdatingPopupActive,
  ] = useState(false);
  const [providerUpdatingPopup, setProviderUpdatingPopup] = useState<
    ProviderUpdatingPopupProps
  >({} as ProviderUpdatingPopupProps);
  const [pathUpdatingPopupActive, setPathUpdatingPopupActive] = useState(false);
  const [pathUpdatingPopup, setPathUpdatingPopup] = useState<
    PathUpdatingPopupProps
  >({} as PathUpdatingPopupProps);
  // ---------------------------------------------------------------------------

  // module hooks to make API operations ---------------------------------------
  const { users, getUsers, setSearchUsers } = useUser();
  const { cities, getCities, setSearchCities } = useCity();
  const { holidays, getHolidays, setSearchHolidays } = useHoliday();
  const { modals, getModals, setSearchModals } = useModal();
  const { providers, getProviders, setSearchProviders } = useProvider();
  const { paths, getPaths, setSearchPaths } = usePath();
  // ---------------------------------------------------------------------------

  const [loadingPartial, setLoadingPartial] = useState(false);

  const handleGetData = useCallback(async () => {
    setLoadingPartial(true);

    await Promise.all([
      getUsers(),
      getCities(),
      getHolidays(),
      getModals(),
      getProviders(),
      getPaths(),
    ]).then(() => {
      setLoadingPartial(false);
    });
  }, [getCities, getHolidays, getModals, getPaths, getProviders, getUsers]);

  const handleSearch = useCallback(
    (data: SearchData, module: ModuleHeaderProps) => {
      setLoadingPartial(true);

      switch (module.name) {
        case 'User':
          if (!data.searchUser) {
            setSearchUsers('');
          } else {
            setSearchUsers(data.searchUser);
          }
          break;
        case 'City':
          if (!data.searchCity) {
            setSearchCities('');
          } else {
            setSearchCities(data.searchCity);
          }
          break;
        case 'Holiday':
          if (!data.searchHoliday) {
            setSearchHolidays('');
          } else {
            setSearchHolidays(data.searchHoliday);
          }
          break;
        case 'Modal':
          if (!data.searchModal) {
            setSearchModals('');
          } else {
            setSearchModals(data.searchModal);
          }
          break;
        case 'Provider':
          if (!data.searchProvider) {
            setSearchProviders('');
          } else {
            setSearchProviders(data.searchProvider);
          }
          break;
        case 'Path':
          if (!data.searchPath) {
            setSearchPaths('');
          } else {
            setSearchPaths(data.searchPath);
          }
          break;
        default:
          break;
      }
      setLoadingPartial(false);
    },
    [
      setSearchCities,
      setSearchHolidays,
      setSearchModals,
      setSearchPaths,
      setSearchProviders,
      setSearchUsers,
    ],
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
            switch (name) {
              case 'User':
                setUserOperationsPopupActive(true);
                setUserOperationsPopup({
                  operation: 'criar',
                });
                setSearchUsers('');
                break;
              case 'City':
                setGoCityForm(true);
                break;
              case 'Holiday':
                setGoHolidayForm(true);
                break;
              case 'Modal':
                setGoModalForm(true);
                break;
              case 'Provider':
                setGoProviderForm(true);
                break;
              case 'Path':
                setGoPathForm(true);
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
    <HolidaysTableContainer>
      <Table module="feriado">
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
                  <button
                    type="button"
                    onClick={() => {
                      setHolidayUpdatingPopupActive(true);
                      setHolidayUpdatingPopup({
                        type: 'Nacional',
                        holiday: holidayNational,
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
      <Table module="feriado">
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
                  <button
                    type="button"
                    onClick={() => {
                      setHolidayUpdatingPopupActive(true);
                      setHolidayUpdatingPopup({
                        type: 'Específico',
                        holiday: holidaySpecific,
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
    </HolidaysTableContainer>
  );

  const ModalsTable: React.FC = () => (
    <Table module="modal">
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
        {modals.map((_city, index, array) => {
          let current = index;

          if (current !== 0) {
            current += 2 * current;
          }
          return (
            <tr key={`${index}-${index + 1}-${index + 2}`}>
              {array[current] && (
                <>
                  <td>{array[current].name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setModalUpdatingPopupActive(true);
                        setModalUpdatingPopup({
                          modal: array[current],
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
                  <td>{array[current + 1].name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setModalUpdatingPopupActive(true);
                        setModalUpdatingPopup({
                          modal: array[current + 1],
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
                  <td>{array[current + 2].name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setModalUpdatingPopupActive(true);
                        setModalUpdatingPopup({
                          modal: array[current + 2],
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

  const ProvidersTable: React.FC = () => (
    <Table module="prestador">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Modal</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {providers.map(provider => (
          <tr key={provider.id}>
            <td>{provider.nome}</td>
            <td>{provider.telefone}</td>
            <td>{provider.email}</td>
            <td>{provider.modal}</td>
            <td>
              <button
                type="button"
                onClick={() => {
                  setProviderUpdatingPopupActive(true);
                  setProviderUpdatingPopup({
                    provider,
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

  const PathsTable: React.FC = () => (
    <Table module="trajeto">
      <thead>
        <tr>
          <th>Origem</th>
          <th>Destino</th>
          <th>Modal</th>
          <th>Prestador</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {paths.map(path => (
          <tr key={path.id}>
            <td>{path.initCidade}</td>
            <td>{path.endCidade}</td>
            <td>{path.modal}</td>
            <td>{path.prestNome}</td>
            <td>
              <button
                type="button"
                onClick={() => {
                  setPathUpdatingPopupActive(true);
                  setPathUpdatingPopup({
                    path,
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

  return (
    <>
      {loadingPartial && <LoadingPartial zIndex={1} />}

      {goCityForm && <Redirect push to="city-form" />}
      {goHolidayForm && <Redirect push to="holiday-form" />}
      {goModalForm && <Redirect push to="modal-form" />}
      {goProviderForm && <Redirect push to="provider-form" />}
      {goPathForm && <Redirect push to="path-form" />}

      {/* jsx conditions to call the popups -------------------------------- */}
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
      {holidayUpdatingPopupActive && (
        <HolidayUpdatingPopup
          type={holidayUpdatingPopup.type}
          holiday={holidayUpdatingPopup.holiday}
          setHolidayUpdatingPopupActive={setHolidayUpdatingPopupActive}
        />
      )}
      {modalUpdatingPopupActive && (
        <ModalUpdatingPopup
          modal={modalUpdatingPopup.modal}
          setModalUpdatingPopupActive={setModalUpdatingPopupActive}
        />
      )}
      {providerUpdatingPopupActive && (
        <ProviderUpdatingPopup
          provider={providerUpdatingPopup.provider}
          setProviderUpdatingPopupActive={setProviderUpdatingPopupActive}
        />
      )}
      {pathUpdatingPopupActive && (
        <PathUpdatingPopup
          path={pathUpdatingPopup.path}
          setPathUpdatingPopupActive={setPathUpdatingPopupActive}
        />
      )}
      {/* ------------------------------------------------------------------ */}

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

        <DataSection>
          <ModuleHeader pluralName="modais" singularName="modal" name="Modal" />
          <ModalsTable />
        </DataSection>

        <DataSection>
          <ModuleHeader
            pluralName="prestadores"
            singularName="prestador"
            name="Provider"
          />
          <ProvidersTable />
        </DataSection>

        <DataSection>
          <ModuleHeader
            pluralName="trajetos"
            singularName="trajeto"
            name="Path"
          />
          <PathsTable />
        </DataSection>
      </Container>
    </>
  );
};

export default ListingData;
