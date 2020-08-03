import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface CityOperationsData {
  nome: string;
  relations?: string;
  cBase: boolean;
  cAuditada: boolean;
  initDataCheia?: string;
  endDataCheia?: string;
  obsInterdicao?: string;
  obsCidade?: string;
  latitute?: string;
  longitude?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CityState extends CityOperationsData {
  id: number;
}

interface CityContextData {
  cities: CityState[];
  setSearchCities(searchCity: string): void;
  getCities(): Promise<void>;
  insertCity(city: CityOperationsData): Promise<void>;
  updateCity(id: number, city: CityOperationsData): Promise<void>;
  removeCity(id: number): Promise<void>;
}

const CityContext = createContext<CityContextData>({} as CityContextData);

const CityProvider: React.FC = ({ children }) => {
  const [cities, setCities] = useState<CityState[]>([]);
  const [search, setSearch] = useState('');

  const { token } = useAuth();
  const { addToast } = useToast();

  const setSearchCities = useCallback(searchCity => {
    setSearch(searchCity);
  }, []);

  const getCities = useCallback(async () => {
    try {
      const query = search ? `cities/${search}` : 'cities';

      const response = await api.get(query, {
        headers: {
          Authorization: `Bearer ${token}`,
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
  }, [addToast, search, token]);

  const insertCity = useCallback(
    async (city: CityOperationsData) => {
      try {
        const response = await api.post('cities', city, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    [addToast, token],
  );

  const updateCity = useCallback(
    async (id: number, city: CityOperationsData) => {
      try {
        const response = await api.put(`cities/${id}`, city, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    [addToast, token],
  );

  const removeCity = useCallback(
    async (id: number) => {
      try {
        const response = await api.delete(`cities/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    [addToast, token],
  );

  return (
    <CityContext.Provider
      value={{
        cities,
        setSearchCities,
        getCities,
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
