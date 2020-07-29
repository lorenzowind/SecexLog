import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface HolidayOperationsData {
  nome: string;
  cidade: string;
  init: string;
  end: string;
  national: boolean;
}

export interface HolidayState extends HolidayOperationsData {
  id: number;
}

interface HolidayContextData {
  holidays: HolidayState[];
  setSearchHolidays(searchHoliday: string): void;
  getHolidays(): Promise<void>;
  insertHoliday(holiday: HolidayOperationsData): Promise<void>;
  updateHoliday(id: number, holiday: HolidayOperationsData): Promise<void>;
  removeHoliday(id: number): Promise<void>;
}

const HolidayContext = createContext<HolidayContextData>(
  {} as HolidayContextData,
);

const HolidayProvider: React.FC = ({ children }) => {
  const [holidays, setHolidays] = useState<HolidayState[]>([]);
  const [search, setSearch] = useState('');

  const { token } = useAuth();
  const { addToast } = useToast();

  const setSearchHolidays = useCallback(searchHoliday => {
    setSearch(searchHoliday);
  }, []);

  const getHolidays = useCallback(async () => {
    try {
      const query = search ? `holidays/${search}` : 'holidays';

      const response = await api.get(query, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        setHolidays(response.data);

        if (search && response.data.length === 0) {
          addToast({
            type: 'info',
            title: 'Nenhum feriado encontrado',
          });
        }
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na listagem',
        description: 'Ocorreu um erro na listagem dos feriados.',
      });
    }
  }, [addToast, search, token]);

  const insertHoliday = useCallback(
    async (holiday: HolidayOperationsData) => {
      try {
        const response = await api.post('holidays', holiday, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Feriado criado com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na criação',
          description: 'Ocorreu um erro na criação do feriado.',
        });
      }
    },
    [addToast, token],
  );

  const updateHoliday = useCallback(
    async (id: number, holiday: HolidayOperationsData) => {
      try {
        const response = await api.put(`holiday/${id}`, holiday, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Feriado alterado com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na alteração',
          description: 'Ocorreu um erro na alteração do feriado.',
        });
      }
    },
    [addToast, token],
  );

  const removeHoliday = useCallback(
    async (id: number) => {
      try {
        const response = await api.delete(`holidays/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Feriado removido com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na remoção',
          description: 'Ocorreu um erro na remoção do feriado.',
        });
      }
    },
    [addToast, token],
  );

  return (
    <HolidayContext.Provider
      value={{
        holidays,
        setSearchHolidays,
        getHolidays,
        insertHoliday,
        removeHoliday,
        updateHoliday,
      }}
    >
      {children}
    </HolidayContext.Provider>
  );
};

function useHoliday(): HolidayContextData {
  const context = useContext(HolidayContext);

  if (!context) {
    throw new Error('useHoliday must be used within an HolidayProvider');
  }

  return context;
}

export { HolidayProvider, useHoliday };
