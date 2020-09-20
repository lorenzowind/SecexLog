import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../services/api';

import { useAuth } from './auth';
import { useToast } from './toast';

export interface OpinionOperationsData {
  title: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface OpinionState extends OpinionOperationsData {
  id: string;
}

interface OpinionContextData {
  opinions: OpinionState[];
  getOpinions(): Promise<void>;
  sendOpinion(opinion: OpinionOperationsData): Promise<void>;
  removeOpinion(id: string): Promise<void>;
}

const OpinionContext = createContext<OpinionContextData>(
  {} as OpinionContextData,
);

const OpinionProvider: React.FC = ({ children }) => {
  const [opinions, setOpinions] = useState<OpinionState[]>([]);

  const { user, token } = useAuth();
  const { addToast } = useToast();

  const getOpinions = useCallback(async () => {
    try {
      const response = await api.get('opinions/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        setOpinions(response.data);
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na listagem',
        description: 'Ocorreu um erro na listagem das opiniões.',
      });
    }
  }, [addToast, token]);

  const sendOpinion = useCallback(
    async (opinion: OpinionOperationsData) => {
      try {
        const response = await api.post('opinions', opinion);

        if (response) {
          addToast({
            type: 'success',
            title: 'Opinião enviada com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro durante o envio',
          description: 'Ocorreu um erro no envio da opinião.',
        });
      }
    },
    [addToast],
  );

  const removeOpinion = useCallback(
    async (id: string) => {
      try {
        const response = await api.delete(`opinions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            user_position: user ? user.position : '',
          },
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Opinião removida com sucesso!',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na remoção',
          description: 'Ocorreu um erro na remoção da opinião.',
        });
      }
    },
    [addToast, token, user],
  );

  return (
    <OpinionContext.Provider
      value={{
        opinions,
        getOpinions,
        sendOpinion,
        removeOpinion,
      }}
    >
      {children}
    </OpinionContext.Provider>
  );
};

function useOpinion(): OpinionContextData {
  const context = useContext(OpinionContext);

  if (!context) {
    throw new Error('useOpinion must be used within an OpinionProvider');
  }

  return context;
}

export { OpinionProvider, useOpinion };
