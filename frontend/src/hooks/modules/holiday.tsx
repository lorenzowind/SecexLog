import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../../services/api';

import { useAuth } from '../auth';
import { useToast } from '../toast';

export interface HolidayOperationsData {
  name: string;
  city_id?: string | null;
  initial_date: string;
  end_date: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface HolidayState extends HolidayOperationsData {
  id: string;
}

interface HolidayContextData {
  holidays: HolidayState[];
  holidaysPage: number;
  incrementHolidaysPage(): void;
  initializeHolidaysPage(): void;
  setSearchHolidays(searchHoliday: string): void;
  getHolidays(): Promise<void>;
  insertHoliday(holiday: HolidayOperationsData): Promise<void>;
  updateHoliday(id: string, holiday: HolidayOperationsData): Promise<void>;
  removeHoliday(id: string): Promise<void>;
}

const HolidayContext = createContext<HolidayContextData>(
  {} as HolidayContextData,
);

const HolidayProvider: React.FC = ({ children }) => {
  const [holidays, setHolidays] = useState<HolidayState[]>([]);
  const [holidaysPage, setHolidaysPage] = useState(1);
  const [search, setSearch] = useState('');

  const { user, token } = useAuth();
  const { addToast } = useToast();

  const incrementHolidaysPage = useCallback(() => {
    setHolidaysPage(holidaysPage + 1);
  }, [holidaysPage]);

  const initializeHolidaysPage = useCallback(() => {
    setHolidaysPage(1);
  }, []);

  const setSearchHolidays = useCallback(searchHoliday => {
    setSearch(searchHoliday);
  }, []);

  const getHolidays = useCallback(async () => {
    try {
      const query = `holidays/all?search=${search}&page=${holidaysPage}`;

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
  }, [addToast, holidaysPage, search, token]);

  const insertHoliday = useCallback(
    async (holiday: HolidayOperationsData) => {
      try {
        const response = await api.post('holidays', holiday, {
          headers: {
            Authorization: `Bearer ${token}`,
            user_position: user ? user.position : '',
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
    [addToast, token, user],
  );

  const updateHoliday = useCallback(
    async (id: string, holiday: HolidayOperationsData) => {
      try {
        const response = await api.put(`holidays/${id}`, holiday, {
          headers: {
            Authorization: `Bearer ${token}`,
            user_position: user ? user.position : '',
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
    [addToast, token, user],
  );

  const removeHoliday = useCallback(
    async (id: string) => {
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
        holidaysPage,
        incrementHolidaysPage,
        initializeHolidaysPage,
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
