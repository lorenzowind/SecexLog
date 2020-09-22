import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

import { useToast } from './toast';

export interface ManualSearchData {
  data: {
    origin_city_id: string;
    destination_city_id: string;
    date: string;
  }[];
}

export interface AutomaticSearchData {
  initialCity: string;
  auditatedCities: string[];
  initialDate: Date;
  finalDate: Date;
}

export interface PathData {
  selected_period: {
    selected_date: string;
    selected_initial_time: string;
    selected_final_time: string;
    selected_initial_week_day: string;
    selected_final_week_day: string;
  };
  cities_location: {
    origin_city_latitude: number;
    origin_city_longitude: number;
    destination_city_latitude: number;
    destination_city_longitude: number;
  };
  path_data: {
    origin_city_name: string;
    destination_city_name: string;
    modal_name: string;
    modal_image: string;
    provider_name: string;
    duration: number;
    mileage: number;
    cost: number;
    boarding_place: string;
    departure_place: string;
  };
}

interface PathsCard {
  price: number;
  util_days: number;
  distance: number;
  initial_date: string;
  final_date: string;
  observations: {
    observation: string;
  }[];
  paths: PathData[];
}

interface SearchResult {
  result: {
    general_info: {
      origin_city_name: string;
      destination_cities_names: {
        destination_city_name: string;
      }[];
      initial_date: string;
      final_date: string;
    };
    paths_result: PathsCard[];
  };
}

interface SearchResultContextData {
  searchResult: SearchResult;
  pathsCardSelected: PathsCard;
  setPathsCard(pathsCard: PathsCard): void;
  getManualSearchResult(manualSearchData: ManualSearchData): Promise<void>;
  getAutomaticSearchResult(automaticSearchData: AutomaticSearchData): void;
}

const SearchResultContext = createContext<SearchResultContextData>(
  {} as SearchResultContextData,
);

const SearchResultProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();

  const [searchResult, setSearchResult] = useState<SearchResult>(
    {} as SearchResult,
  );
  const [pathsCardSelected, setPathsCardSelected] = useState<PathsCard>(
    {} as PathsCard,
  );

  const setPathsCard = useCallback((pathsCard: PathsCard) => {
    setPathsCardSelected(pathsCard);
  }, []);

  const getManualSearchResult = useCallback(
    async (manualSearchData: ManualSearchData) => {
      try {
        const response = await api.post('searches/manual', manualSearchData);

        if (response) {
          setSearchResult(response.data);

          if (response.data.length === 0) {
            addToast({
              type: 'info',
              title: 'Nenhuma trajeto encontrado',
            });
          }
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na consulta',
          description: 'Ocorreu um erro na consulta dos trajetos.',
        });
      }
    },
    [addToast],
  );

  const getAutomaticSearchResult = useCallback(
    (automaticSearchData: AutomaticSearchData) => {
      // setSearchResult({
      //   generalInfo: {
      //     initialCity: automaticSearchData.initialCity,
      //     finalCity: automaticSearchData.auditatedCities,
      //     initialDate: automaticSearchData.initialDate,
      //     finalDate: automaticSearchData.finalDate,
      //   },
      //   pathsResult: undefined,
      //   // pathsResult: automaticSearchData.auditatedCities.reduce(
      //   //   (pathsCard: PathsCard[], _auditatedCity) => {
      //   //     pathsCard.push({
      //   //       distance: 0,
      //   //       price: 0,
      //   //       utilDays: 0,
      //   //       initialDate: automaticSearchData.initialDate,
      //   //       finalDate: automaticSearchData.finalDate,
      //   //       modalsImages: [''],
      //   //       paths: [{} as PathResult],
      //   //     });
      //   //     return pathsCard;
      //   //   },
      //   //   [],
      //   // ),
      // });
    },
    [],
  );

  return (
    <SearchResultContext.Provider
      value={{
        searchResult,
        pathsCardSelected,
        setPathsCard,
        getManualSearchResult,
        getAutomaticSearchResult,
      }}
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
