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

export interface ModuleName {
  name: 'USER' | 'CITY' | 'HOLIDAY' | 'PROVIDER' | 'MODAL' | 'PATH';
}

interface ModuleHeaderProps extends ModuleName {
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
}

interface UserOperationsPopupProps {
  operation: 'CREATE' | 'UPDATE';
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

interface NewPageModule {
  name: ModuleName['name'] | '';
}

interface SearchModule extends NewPageModule {
  search: string;
}

interface HandleDataOperation {
  type: 'SEARCH' | 'PAGINATION' | 'LOAD';
}

interface SearchData {
  search_USER?: string;
  search_CITY?: string;
  search_HOLIDAY?: string;
  search_PROVIDER?: string;
  search_MODAL?: string;
  search_PATH?: string;
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
  const {
    users,
    usersPage,
    initializeUsersPage,
    incrementUsersPage,
    getUsers,
  } = useUser();
  const {
    cities,
    citiesPage,
    getCities,
    initializeCitiesPage,
    incrementCitiesPage,
  } = useCity();
  const {
    holidays,
    holidaysPage,
    initializeHolidaysPage,
    incrementHolidaysPage,
    getHolidays,
  } = useHoliday();
  const {
    modals,
    modalsPage,
    initializeModalsPage,
    incrementModalsPage,
    getModals,
  } = useModal();
  const {
    providers,
    providersPage,
    initializeProvidersPage,
    incrementProvidersPage,
    getProviders,
  } = useProvider();
  const {
    paths,
    pathsPage,
    incrementPathsPage,
    initializePathsPage,
    getPaths,
  } = usePath();
  // ---------------------------------------------------------------------------

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [newPageModule, setNewPageModule] = useState<NewPageModule>({
    name: '',
  });
  const [searchModule, setSearchModule] = useState<SearchModule>({
    name: '',
    search: '',
  });
  const [dataOperation, setDataOperation] = useState<HandleDataOperation>({
    type: 'LOAD',
  });

  const handleInitializeModules = useCallback(() => {
    initializeCitiesPage();
    initializeUsersPage();
    initializeHolidaysPage();
    initializeModalsPage();
    initializeProvidersPage();
    initializePathsPage();
  }, [
    initializeCitiesPage,
    initializeUsersPage,
    initializeHolidaysPage,
    initializeModalsPage,
    initializeProvidersPage,
    initializePathsPage,
  ]);

  const handleVerifyInitialization = useCallback(() => {
    return (
      citiesPage === 1 &&
      usersPage === 1 &&
      holidaysPage === 1 &&
      modalsPage === 1 &&
      providersPage === 1 &&
      pathsPage === 1
    );
  }, [
    citiesPage,
    usersPage,
    holidaysPage,
    modalsPage,
    providersPage,
    pathsPage,
  ]);

  const handleGetData = useCallback(async () => {
    setLoadingPartial(true);

    switch (dataOperation.type) {
      case 'SEARCH': {
        switch (searchModule.name) {
          case 'USER': {
            await getUsers(searchModule.search, true).then(() => {
              setLoadingPartial(false);
            });
            break;
          }
          case 'CITY': {
            await getCities(searchModule.search, true).then(() => {
              setLoadingPartial(false);
            });
            break;
          }
          case 'HOLIDAY': {
            await getHolidays(searchModule.search, true).then(() => {
              setLoadingPartial(false);
            });
            break;
          }
          case 'MODAL': {
            await getModals(searchModule.search, true).then(() => {
              setLoadingPartial(false);
            });
            break;
          }
          case 'PROVIDER': {
            await getProviders(searchModule.search, true).then(() => {
              setLoadingPartial(false);
            });
            break;
          }
          case 'PATH': {
            await getPaths(searchModule.search, true).then(() => {
              setLoadingPartial(false);
            });
            break;
          }
          default: {
            break;
          }
        }
        break;
      }
      case 'PAGINATION': {
        if (newPageModule.name) {
          switch (newPageModule.name) {
            case 'USER': {
              await getUsers(searchModule.search, true).then(() => {
                setLoadingPartial(false);
              });
              break;
            }
            case 'CITY': {
              await getCities(searchModule.search, true).then(() => {
                setLoadingPartial(false);
              });
              break;
            }
            case 'HOLIDAY': {
              await getHolidays(searchModule.search, true).then(() => {
                setLoadingPartial(false);
              });
              break;
            }
            case 'MODAL': {
              await getModals(searchModule.search, true).then(() => {
                setLoadingPartial(false);
              });
              break;
            }
            case 'PROVIDER': {
              await getProviders(searchModule.search, true).then(() => {
                setLoadingPartial(false);
              });
              break;
            }
            case 'PATH': {
              await getPaths(searchModule.search, true).then(() => {
                setLoadingPartial(false);
              });
              break;
            }
            default: {
              break;
            }
          }
        }
        break;
      }
      case 'LOAD': {
        handleInitializeModules();

        if (handleVerifyInitialization()) {
          await Promise.all([
            getUsers('', true),
            getCities('', true),
            getHolidays('', true),
            getModals('', true),
            getProviders('', true),
            getPaths('', true),
          ]).then(() => {
            setLoadingPartial(false);
          });
        }
        break;
      }
      default: {
        break;
      }
    }
  }, [
    dataOperation,
    getCities,
    getHolidays,
    getModals,
    getPaths,
    getProviders,
    getUsers,
    handleInitializeModules,
    handleVerifyInitialization,
    newPageModule,
    searchModule,
  ]);

  const handleSearch = useCallback(
    async (data: SearchData, module: ModuleHeaderProps) => {
      switch (module.name) {
        case 'USER':
          initializeUsersPage();
          setSearchModule({
            name: 'USER',
            search: data.search_USER || '',
          });
          break;
        case 'CITY':
          initializeCitiesPage();
          setSearchModule({
            name: 'CITY',
            search: data.search_CITY || '',
          });
          break;
        case 'HOLIDAY':
          initializeHolidaysPage();
          setSearchModule({
            name: 'HOLIDAY',
            search: data.search_HOLIDAY || '',
          });
          break;
        case 'MODAL':
          initializeModalsPage();
          setSearchModule({
            name: 'MODAL',
            search: data.search_MODAL || '',
          });
          break;
        case 'PROVIDER':
          initializeProvidersPage();
          setSearchModule({
            name: 'PROVIDER',
            search: data.search_PROVIDER || '',
          });
          break;
        case 'PATH':
          initializePathsPage();
          setSearchModule({
            name: 'PATH',
            search: data.search_PATH || '',
          });
          break;
        default:
          break;
      }
      setDataOperation({
        type: 'SEARCH',
      });
    },
    [
      initializeCitiesPage,
      initializeHolidaysPage,
      initializeModalsPage,
      initializePathsPage,
      initializeProvidersPage,
      initializeUsersPage,
    ],
  );

  useEffect(() => {
    const loadData = async () => {
      await handleGetData();
    };

    loadData();
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
            name={`search_${name}`}
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
              case 'USER':
                setUserOperationsPopupActive(true);
                setUserOperationsPopup({
                  operation: 'CREATE',
                });
                break;
              case 'CITY':
                setGoCityForm(true);
                break;
              case 'HOLIDAY':
                setGoHolidayForm(true);
                break;
              case 'MODAL':
                setGoModalForm(true);
                break;
              case 'PROVIDER':
                setGoProviderForm(true);
                break;
              case 'PATH':
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
    <Table name="USER">
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
            <td>{user.name}</td>
            <td>{user.login}</td>
            <td>{user.email}</td>
            <td>{user.position}</td>
            <td>{'*'.repeat(user.password.length)}</td>
            <td>
              <button
                type="button"
                onClick={() => {
                  setUserOperationsPopupActive(true);
                  setUserOperationsPopup({
                    operation: 'UPDATE',
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
    <Table name="CITY">
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
                  <td>{array[current].name}</td>
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
                  <td>{array[current + 1].name}</td>
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
                  <td>{array[current + 2].name}</td>
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
      <Table name="HOLIDAY">
        <thead>
          <tr>
            <th>Nacionais</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {holidays
            .filter(holiday => !holiday.city_id)
            .map(holidayNational => (
              <tr key={holidayNational.id}>
                <td>{holidayNational.name}</td>
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
      <Table name="HOLIDAY">
        <thead>
          <tr>
            <th>Específicos</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {holidays
            .filter(holiday => holiday.city_id)
            .map(holidaySpecific => (
              <tr key={holidaySpecific.id}>
                <td>{holidaySpecific.name}</td>
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
    <Table name="MODAL">
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
    <Table name="PROVIDER">
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
            <td>{provider.name}</td>
            <td>{provider.phone_number}</td>
            <td>{provider.email}</td>
            <td>
              {modals.find(modal => modal.id === provider.modal_id)?.name ||
                `${provider.modal_id}`}
            </td>
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
    <Table name="PATH">
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
            <td>
              {cities.find(city => city.id === path.origin_city_id)?.name ||
                `${path.origin_city_id}`}
            </td>
            <td>
              {cities.find(city => city.id === path.destination_city_id)
                ?.name || `${path.destination_city_id}`}
            </td>
            <td>
              {modals.find(modal => modal.id === path.modal_id)?.name ||
                `${path.modal_id}`}
            </td>
            <td>
              {providers.find(provider => provider.id === path.provider_id)
                ?.name || `${path.provider_id}`}
            </td>
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

      <Menu isAuthenticated />

      <Container>
        <DataSection>
          <ModuleHeader
            pluralName="usuários"
            singularName="usuário"
            name="USER"
          />

          <UsersTable />

          {users.length ? (
            <button
              type="button"
              onClick={() => {
                setDataOperation({
                  type: 'PAGINATION',
                });
                setNewPageModule({
                  name: 'USER',
                });
                incrementUsersPage();
              }}
            >
              Carregar mais
            </button>
          ) : null}
        </DataSection>

        <DataSection>
          <ModuleHeader
            pluralName="cidades"
            singularName="cidade"
            name="CITY"
          />

          <CitiesTable />

          {cities.length ? (
            <button
              type="button"
              onClick={() => {
                setDataOperation({
                  type: 'PAGINATION',
                });
                setNewPageModule({
                  name: 'CITY',
                });
                incrementCitiesPage();
              }}
            >
              Carregar mais
            </button>
          ) : null}
        </DataSection>

        <DataSection>
          <ModuleHeader
            pluralName="feriados"
            singularName="feriado"
            name="HOLIDAY"
          />

          <HolidaysTable />

          {holidays.length ? (
            <button
              type="button"
              onClick={() => {
                setDataOperation({
                  type: 'PAGINATION',
                });
                setNewPageModule({
                  name: 'HOLIDAY',
                });
                incrementHolidaysPage();
              }}
            >
              Carregar mais
            </button>
          ) : null}
        </DataSection>

        <DataSection>
          <ModuleHeader pluralName="modais" singularName="modal" name="MODAL" />

          <ModalsTable />

          {modals.length ? (
            <button
              type="button"
              onClick={() => {
                setDataOperation({
                  type: 'PAGINATION',
                });
                setNewPageModule({
                  name: 'MODAL',
                });
                incrementModalsPage();
              }}
            >
              Carregar mais
            </button>
          ) : null}
        </DataSection>

        <DataSection>
          <ModuleHeader
            pluralName="prestadores"
            singularName="prestador"
            name="PROVIDER"
          />

          <ProvidersTable />

          {providers.length ? (
            <button
              type="button"
              onClick={() => {
                setDataOperation({
                  type: 'PAGINATION',
                });
                setNewPageModule({
                  name: 'PROVIDER',
                });
                incrementProvidersPage();
              }}
            >
              Carregar mais
            </button>
          ) : null}
        </DataSection>

        <DataSection>
          <ModuleHeader
            pluralName="trajetos"
            singularName="trajeto"
            name="PATH"
          />
          <PathsTable />

          {paths.length ? (
            <button
              type="button"
              onClick={() => {
                setDataOperation({
                  type: 'PAGINATION',
                });
                setNewPageModule({
                  name: 'PATH',
                });
                incrementPathsPage();
              }}
            >
              Carregar mais
            </button>
          ) : null}
        </DataSection>
      </Container>
    </>
  );
};

export default ListingData;
