/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useCallback, useState, useContext } from 'react';
// import api from '../services/api';

import iconModal5 from '../assets/icon-modal-5.png';
import iconModal4 from '../assets/icon-modal-4.png';
import iconModal3 from '../assets/icon-modal-3.png';
import iconModal2 from '../assets/icon-modal-2.png';

import { PathState } from './modules/path';

export interface ManualSearchData {
  paths: {
    goCity: string;
    backCity: string;
    date: Date;
  }[];
}

export interface AutomaticSearchData {
  initialCity: string;
  auditatedCities: string[];
  initialDate: Date;
  finalDate: Date;
}

interface PathResult extends PathState {
  selectedPeriod: {
    selectedDate: Date;
    selectedInitTime: string;
    selectedFinalTime: string;
    selectedInitWeekDay: string;
    selectedFinalWeekDay: string;
  };
}

interface PathsCard {
  price: number;
  utilDays: number;
  distance: number;
  initialDate: Date;
  finalDate: Date;
  modalsImages: string[];
  paths: PathResult[];
}

interface SearchResult {
  generalInfo: {
    initialCity: string;
    finalCity: string[];
    initialDate: Date;
    finalDate: Date;
  };
  pathsResult: PathsCard[] | undefined;
}

interface SearchResultContextData {
  searchResult: SearchResult;
  getManualSearchResult(manualSearchData: ManualSearchData): void;
  getAutomaticSearchResult(automaticSearchData: AutomaticSearchData): void;
}

const SearchResultContext = createContext<SearchResultContextData>(
  {} as SearchResultContextData,
);

const SearchResultProvider: React.FC = ({ children }) => {
  const [searchResult, setSearchResult] = useState<SearchResult>(
    {} as SearchResult,
  );

  const getManualSearchResult = useCallback(
    (manualSearchData: ManualSearchData) => {
      setSearchResult({
        generalInfo: {
          initialCity: 'Manaus',
          finalCity: ['Itacoatiara'],
          initialDate: manualSearchData.paths[0].date,
          finalDate:
            manualSearchData.paths[manualSearchData.paths.length - 1].date,
        },
        pathsResult: manualSearchData.paths.reduce(
          (pathsCard: PathsCard[], path) => {
            pathsCard.push(
              {
                distance: 200,
                price: 800,
                utilDays: 5,
                modalsImages: [iconModal5, iconModal4],
                initialDate: path.date,
                finalDate: path.date,
                paths: [
                  {
                    initCidade: 'Manaus',
                    endCidade: 'Itacoatiara',
                    modal: 'Taxi aéreo',
                    dia: ['10:00'],
                    hora: ['quinta-feira'],
                    arrival: '',
                    departure: '',
                    prestNome: '',
                    duration: '00:30',
                    id: 1,
                    contratado: true,
                    linha: false,
                    mileage: 100,
                    cost: 400,
                    selectedPeriod: {
                      selectedDate: path.date,
                      selectedInitTime: '10:00',
                      selectedFinalTime: '10:30',
                      selectedInitWeekDay: 'qui',
                      selectedFinalWeekDay: 'qui',
                    },
                  },
                  {
                    initCidade: 'Itacoatiara',
                    endCidade: 'Manaus',
                    modal: 'Taxi aéreo',
                    dia: ['07:00'],
                    hora: ['sexta-feira'],
                    arrival: '',
                    departure: '',
                    prestNome: '',
                    duration: '00:30',
                    id: 1,
                    contratado: true,
                    linha: false,
                    mileage: 100,
                    cost: 400,
                    selectedPeriod: {
                      selectedDate: path.date,
                      selectedInitTime: '07:00',
                      selectedFinalTime: '07:30',
                      selectedInitWeekDay: 'sex',
                      selectedFinalWeekDay: 'sex',
                    },
                  },
                ],
              },
              {
                distance: 200,
                price: 800,
                utilDays: 5,
                modalsImages: [iconModal5],
                initialDate: path.date,
                finalDate: path.date,
                paths: [
                  {
                    initCidade: 'Manaus',
                    endCidade: 'Itacoatiara',
                    modal: 'Taxi aéreo',
                    dia: ['10:00'],
                    hora: ['quinta-feira'],
                    arrival: '',
                    departure: '',
                    prestNome: '',
                    duration: '00:30',
                    id: 1,
                    contratado: true,
                    linha: false,
                    mileage: 100,
                    cost: 400,
                    selectedPeriod: {
                      selectedDate: path.date,
                      selectedInitTime: '10:00',
                      selectedFinalTime: '10:30',
                      selectedInitWeekDay: 'qui',
                      selectedFinalWeekDay: 'qui',
                    },
                  },
                ],
              },
              {
                distance: 200,
                price: 800,
                utilDays: 5,
                modalsImages: [iconModal5, iconModal3, iconModal2],
                initialDate: path.date,
                finalDate: path.date,
                paths: [
                  {
                    initCidade: 'Manaus',
                    endCidade: 'Itacoatiara',
                    modal: 'Taxi aéreo',
                    dia: ['10:00'],
                    hora: ['quinta-feira'],
                    arrival: '',
                    departure: '',
                    prestNome: '',
                    duration: '00:30',
                    id: 1,
                    contratado: true,
                    linha: false,
                    mileage: 100,
                    cost: 400,
                    selectedPeriod: {
                      selectedDate: path.date,
                      selectedInitTime: '10:00',
                      selectedFinalTime: '10:30',
                      selectedInitWeekDay: 'qui',
                      selectedFinalWeekDay: 'qui',
                    },
                  },
                  {
                    initCidade: 'Manaus',
                    endCidade: 'Itacoatiara',
                    modal: 'Taxi aéreo',
                    dia: ['10:00'],
                    hora: ['quinta-feira'],
                    arrival: '',
                    departure: '',
                    prestNome: '',
                    duration: '00:30',
                    id: 1,
                    contratado: true,
                    linha: false,
                    mileage: 100,
                    cost: 400,
                    selectedPeriod: {
                      selectedDate: path.date,
                      selectedInitTime: '10:00',
                      selectedFinalTime: '10:30',
                      selectedInitWeekDay: 'qui',
                      selectedFinalWeekDay: 'qui',
                    },
                  },
                  {
                    initCidade: 'Manaus',
                    endCidade: 'Itacoatiara',
                    modal: 'Taxi aéreo',
                    dia: ['10:00'],
                    hora: ['quinta-feira'],
                    arrival: '',
                    departure: '',
                    prestNome: '',
                    duration: '00:30',
                    id: 1,
                    contratado: true,
                    linha: false,
                    mileage: 100,
                    cost: 400,
                    selectedPeriod: {
                      selectedDate: path.date,
                      selectedInitTime: '10:00',
                      selectedFinalTime: '10:30',
                      selectedInitWeekDay: 'qui',
                      selectedFinalWeekDay: 'qui',
                    },
                  },
                ],
              },
            );

            return pathsCard;
          },
          [],
        ),
      });
    },
    [],
  );

  const getAutomaticSearchResult = useCallback(
    (automaticSearchData: AutomaticSearchData) => {
      setSearchResult({
        generalInfo: {
          initialCity: automaticSearchData.initialCity,
          finalCity: automaticSearchData.auditatedCities,
          initialDate: automaticSearchData.initialDate,
          finalDate: automaticSearchData.finalDate,
        },
        pathsResult: undefined,
        // pathsResult: automaticSearchData.auditatedCities.reduce(
        //   (pathsCard: PathsCard[], _auditatedCity) => {
        //     pathsCard.push({
        //       distance: 0,
        //       price: 0,
        //       utilDays: 0,
        //       initialDate: automaticSearchData.initialDate,
        //       finalDate: automaticSearchData.finalDate,
        //       modalsImages: [''],
        //       paths: [{} as PathResult],
        //     });

        //     return pathsCard;
        //   },
        //   [],
        // ),
      });
    },
    [],
  );

  return (
    <SearchResultContext.Provider
      value={{ searchResult, getManualSearchResult, getAutomaticSearchResult }}
    >
      {children}
    </SearchResultContext.Provider>
  );
};

function useSearchResult(): SearchResultContextData {
  const context = useContext(SearchResultContext);

  if (!context) {
    throw new Error(
      'useSearchResult must be used within a SearchResultProvider',
    );
  }

  return context;
}

export { SearchResultProvider, useSearchResult };
