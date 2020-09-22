import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSearchResult } from '../../hooks/searchResult';

import { getArrayModalIcons } from '../../utils/getArrayModalFiles';

import {
  Header,
  Container,
  Content,
  Top,
  FilterSection,
  ModalsImages,
  PathCard,
  PathSelectionContainer,
} from './styles';

import { Menu, Button, ImageModal } from '../../components';

import logoTce from '../../assets/logo-tce.png';
import iconBack from '../../assets/icon-back-3.png';
import progressBar from '../../assets/progressBar-2.png';
import fastFilter from '../../assets/image-filter-fast.png';
import costFilter from '../../assets/image-filter-cost.png';
import safetyFilter from '../../assets/image-filter-safety.png';
import pathRepresentation from '../../assets/path-representation.png';

const ResultSearch: React.FC = () => {
  const history = useHistory();

  const [fastFilterSelected, setFastFilterSelected] = useState(false);
  const [costFilterSelected, setCostFilterSelected] = useState(false);
  const [safetyFilterSelected, setSafetyFilterSelected] = useState(false);

  const [arrayModalIcons] = useState(getArrayModalIcons);

  const { searchResult, setPathsCard } = useSearchResult();

  useEffect(() => {
    if (!searchResult.result) {
      history.goBack();
    }
  }, [history, searchResult]);

  const convertToTime = useCallback((minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const newMinutes = minutes % 60;

    return `${String(hours)}h${newMinutes}m`;
  }, []);

  const convertToLocalCurrency = useCallback((price: number) => {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }, []);

  return (
    <>
      <Header>
        <img src={logoTce} alt="TCE" />
      </Header>

      <Menu isAuthenticated={false} />

      {searchResult.result && (
        <Container>
          <Content>
            <Top>
              <button
                type="button"
                onClick={() => {
                  history.goBack();
                }}
              >
                <img src={iconBack} alt="Back" />
              </button>

              <div>
                <strong>Escolha modal para o trecho</strong>
                <img src={progressBar} alt="Progress Bar" />
              </div>
            </Top>

            <FilterSection>
              <nav>
                <button
                  type="button"
                  onClick={() => setFastFilterSelected(!fastFilterSelected)}
                >
                  <ImageModal
                    imageSize={60}
                    imageModal={fastFilter}
                    isSelected={fastFilterSelected}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setCostFilterSelected(!costFilterSelected)}
                >
                  <ImageModal
                    imageSize={60}
                    imageModal={costFilter}
                    isSelected={costFilterSelected}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setSafetyFilterSelected(!safetyFilterSelected)}
                >
                  <ImageModal
                    imageSize={60}
                    imageModal={safetyFilter}
                    isSelected={safetyFilterSelected}
                  />
                </button>
              </nav>
              <strong>
                {searchResult.result.general_info.origin_city_name}
              </strong>
              <strong>
                {searchResult.result.general_info.destination_cities_names
                  .map(destinationCity => destinationCity.destination_city_name)
                  .join(', ')}
              </strong>
              <strong>
                {`${
                  searchResult.result.general_info.initial_date
                    .toLocaleString()
                    .split(' ')[0]
                } -
                ${
                  searchResult.result.general_info.final_date
                    .toLocaleString()
                    .split(' ')[0]
                }`}
              </strong>
            </FilterSection>

            {searchResult.result.paths_result.length ? (
              searchResult.result.paths_result.map((pathCard, index) => (
                <section key={index}>
                  <ModalsImages>
                    {pathCard.paths.map((path, index2) => {
                      const modal = arrayModalIcons.find(
                        modalIcon =>
                          modalIcon.name === path.path_data.modal_image,
                      );

                      if (modal) {
                        return (
                          <img
                            key={`${path.path_data.modal_name}-${index2}`}
                            src={modal.url}
                            alt="Modal"
                          />
                        );
                      }

                      return null;
                    })}
                  </ModalsImages>

                  <PathCard>
                    <section>
                      {pathCard.paths.map(path => (
                        <aside
                          key={`${path.path_data.origin_city_name}-${path.path_data.destination_city_name}`}
                        >
                          <div>
                            <strong>
                              {`${path.selected_period.selected_initial_time}, ${path.selected_period.selected_initial_week_day}`}
                            </strong>
                            <h2>{path.path_data.origin_city_name}</h2>
                            <h2>{path.path_data.modal_name}</h2>
                          </div>
                          <div>
                            <h2>{convertToTime(path.path_data.duration)}</h2>
                            <img src={pathRepresentation} alt="Path" />
                          </div>
                          <div>
                            <strong>
                              {`${path.selected_period.selected_final_time}, ${path.selected_period.selected_final_week_day}`}
                            </strong>
                            <h2>{path.path_data.destination_city_name}</h2>
                            <h2>{path.path_data.modal_name}</h2>
                          </div>
                        </aside>
                      ))}

                      <h3>
                        {`Saída: ${pathCard.initial_date} - Retorno: ${pathCard.final_date}`}
                      </h3>

                      {pathCard.observations.map((pathObservation, index2) => (
                        <h4 key={`Obs-${index2}`}>
                          {`*${pathObservation.observation}`}
                        </h4>
                      ))}
                    </section>

                    <PathSelectionContainer>
                      <strong>
                        {`${convertToLocalCurrency(pathCard.price)}`}
                      </strong>
                      <h1>
                        {pathCard.util_days !== 1
                          ? `${pathCard.util_days} dias utéis`
                          : `${pathCard.util_days} dia útil`}
                      </h1>

                      <Button
                        type="button"
                        onClick={() => {
                          setPathsCard(pathCard);
                          history.push('/detailed-result');
                        }}
                      >
                        Selecionar
                      </Button>
                    </PathSelectionContainer>
                  </PathCard>
                </section>
              ))
            ) : (
              <footer>
                <strong>Nenhum caminho encontrado!</strong>
              </footer>
            )}
          </Content>
        </Container>
      )}
    </>
  );
};

export default ResultSearch;
