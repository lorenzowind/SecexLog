import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface CityOperationsData {
  name: string;
  is_base?: boolean;
  is_auditated?: boolean;
  related_cities?: {
    related_city_id: string;
  }[];
  latitude?: number | null;
  longitude?: number | null;
  initial_flood_date?: string;
  end_flood_date?: string;
  interdiction_observation?: string;
  city_observation?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CityState extends CityOperationsData {
  id: string;
}

export interface RelatedCityState {
  related_city_id: string;
}

interface CityContextData {
  cities: CityState[];
  relatedCities: RelatedCityState[];
  citiesPage: number;
  incrementCitiesPage(): void;
  initializeCitiesPage(): void;
  getCities(search: string, isPagination: boolean): Promise<void>;
  getRelatedCities(city_id: string): Promise<void>;
  insertCity(city: CityOperationsData): Promise<void>;
  updateCity(id: string, city: CityOperationsData): Promise<void>;
  removeCity(id: string): Promise<void>;
}

const CityContext = createContext<CityContextData>({} as CityContextData);

const CityProvider: React.FC = ({ children }) => {
  const [cities, setCities] = useState<CityState[]>([]);
  const [relatedCities, setRelatedCities] = useState<RelatedCityState[]>([]);
  const [citiesPage, setCitiesPage] = useState(1);

  const { user, token } = useAuth();
  const { addToast } = useToast();

  const incrementCitiesPage = useCallback(() => {
    setCitiesPage(citiesPage + 1);
  }, [citiesPage]);

  const initializeCitiesPage = useCallback(() => {
    setCitiesPage(1);
  }, []);

  const getCities = useCallback(
    async (search: string, isPagination: boolean) => {
      try {
        const query = isPagination
          ? `cities/pagination/all?search=${search}&page=${citiesPage}`
          : 'cities/all';

        console.log(query);

        const response = await api.get(query, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (response) {
          setCities(response.data);

          if (search && response.data.length === 0) {
            addToast({
              type: 'info',
              title: 'Nenhuma cidade encontrada',
            });
          }
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na listagem',
          description: 'Ocorreu um erro na listagem das cidades.',
        });
      }
    },
    [addToast, citiesPage, token],
  );

  const getRelatedCities = useCallback(
    async (city_id: string) => {
      try {
        const response = await api.get(`cities/related/${city_id}`, {
          headers: {
            Authorization: user ? `Bearer ${token}` : '',
          },
        });

        if (response) {
          setRelatedCities(response.data);
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na listagem',
          description: 'Ocorreu um erro na listagem de cidades relacionadas.',
        });
      }
    },
    [addToast, token, user],
  );

  const insertCity = useCallback(
    async (city: CityOperationsData) => {
      try {
        const response = await api.post('cities', city, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            user_position: user ? user.position : '',
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Cidade criada com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na criação',
          description: 'Ocorreu um erro na criação da cidade.',
        });
      }
    },
    [addToast, token, user],
  );

  const updateCity = useCallback(
    async (id: string, city: CityOperationsData) => {
      try {
        const response = await api.put(`cities/${id}`, city, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            user_position: user ? user.position : '',
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Cidade alterada com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na alteração',
          description: 'Ocorreu um erro na alteração da cidade.',
        });
      }
    },
    [addToast, token, user],
  );

  const removeCity = useCallback(
    async (id: string) => {
      try {
        const response = await api.delete(`cities/${id}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            user_position: user ? user.position : '',
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Cidade removida com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na remoção',
          description: 'Ocorreu um erro na remoção da cidade.',
        });
      }
    },
    [addToast, token, user],
  );

  return (
    <CityContext.Provider
      value={{
        cities,
        relatedCities,
        citiesPage,
        incrementCitiesPage,
        initializeCitiesPage,
        getCities,
        getRelatedCities,
        insertCity,
        removeCity,
        updateCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

function useCity(): CityContextData {
  const context = useContext(CityContext);

  if (!context) {
    throw new Error('useCity must be used within an CityProvider');
  }

  return context;
}

export { CityProvider, useCity };
