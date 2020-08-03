import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface PathOperationsData {
  initCidade: string;
  endCidade: string;
  modal: string;
  prestNome: string;
  dia: string[];
  hora: string[];
  mileage: number;
  cost: number;
  departure: string;
  arrival: string;
  linha: boolean;
  contratado: boolean;
  duration: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PathState extends PathOperationsData {
  id: number;
}

interface PathContextData {
  paths: PathState[];
  setSearchPaths(searchCity: string): void;
  getPaths(): Promise<void>;
  insertPath(path: PathOperationsData): Promise<void>;
  updatePath(id: number, path: PathOperationsData): Promise<void>;
  removePath(id: number): Promise<void>;
}

const PathContext = createContext<PathContextData>({} as PathContextData);

const PathProvider: React.FC = ({ children }) => {
  const [paths, setPaths] = useState<PathState[]>([]);
  const [search, setSearch] = useState('');

  const { token } = useAuth();
  const { addToast } = useToast();

  const setSearchPaths = useCallback(searchPath => {
    setSearch(searchPath);
  }, []);

  const getPaths = useCallback(async () => {
    try {
      const query = search ? `paths/${search}` : 'paths';

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
  }, [addToast, search, token]);

  const insertPath = useCallback(
    async (path: PathOperationsData) => {
      try {
        const response = await api.post('paths', path, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    [addToast, token],
  );

  const updatePath = useCallback(
    async (id: number, path: PathOperationsData) => {
      try {
        const response = await api.put(`paths/${id}`, path, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    [addToast, token],
  );

  const removePath = useCallback(
    async (id: number) => {
      try {
        const response = await api.delete(`paths/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
    [addToast, token],
  );

  return (
    <PathContext.Provider
      value={{
        paths,
        setSearchPaths,
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
