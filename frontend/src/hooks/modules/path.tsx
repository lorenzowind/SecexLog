import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface PathOperationsData {
  origin_city_id: string;
  destination_city_id: string;
  modal_id: string;
  provider_id: string;
  boarding_days: string;
  boarding_times: string;
  duration: number | string;
  mileage: number;
  cost: number;
  boarding_place: string;
  departure_place: string;
  is_hired: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface PathState extends PathOperationsData {
  id: string;
}

interface PathContextData {
  paths: PathState[];
  getPaths(search: string): Promise<void>;
  insertPath(path: PathOperationsData): Promise<void>;
  updatePath(id: string, path: PathOperationsData): Promise<void>;
  removePath(id: string): Promise<void>;
}

const PathContext = createContext<PathContextData>({} as PathContextData);

const PathProvider: React.FC = ({ children }) => {
  const [paths, setPaths] = useState<PathState[]>([]);

  const { user, token } = useAuth();
  const { addToast } = useToast();

  const getPaths = useCallback(
    async (search: string) => {
      try {
        const query = search
          ? `paths/all/origin?origin_city_name=${search}`
          : `paths/all`;

        const response = await api.get(query, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          setPaths(response.data);

          if (search && response.data.length === 0) {
            addToast({
              type: 'info',
              title: 'Nenhum trajeto encontrado',
            });
          }
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na listagem',
          description: 'Ocorreu um erro na listagem dos trajetos.',
        });
      }
    },
    [addToast, token],
  );

  const insertPath = useCallback(
    async (path: PathOperationsData) => {
      try {
        const response = await api.post('paths', path, {
          headers: {
            Authorization: `Bearer ${token}`,
            user_position: user ? user.position : '',
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Trajeto criado com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na criação',
          description: 'Ocorreu um erro na criação do trajeto.',
        });
      }
    },
    [addToast, token, user],
  );

  const updatePath = useCallback(
    async (id: string, path: PathOperationsData) => {
      try {
        const response = await api.put(`paths/${id}`, path, {
          headers: {
            Authorization: `Bearer ${token}`,
            user_position: user ? user.position : '',
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Trajeto alterado com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na alteração',
          description: 'Ocorreu um erro na alteração do trajeto.',
        });
      }
    },
    [addToast, token, user],
  );

  const removePath = useCallback(
    async (id: string) => {
      try {
        const response = await api.delete(`paths/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            user_position: user ? user.position : '',
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Trajeto removido com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na remoção',
          description: 'Ocorreu um erro na remoção do trajeto.',
        });
      }
    },
    [addToast, token, user],
  );

  return (
    <PathContext.Provider
      value={{
        paths,
        getPaths,
        insertPath,
        removePath,
        updatePath,
      }}
    >
      {children}
    </PathContext.Provider>
  );
};

function usePath(): PathContextData {
  const context = useContext(PathContext);

  if (!context) {
    throw new Error('usePath must be used within an PathProvider');
  }

  return context;
}

export { PathProvider, usePath };
