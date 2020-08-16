import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useSearchResult } from '../../hooks/searchResult';

import { Menu } from '../../components';

import {
  Container,
  MapContainer,
  Top,
  PathDetailed,
  PeriodContainer,
  PathsContainer,
  UniquePathContainer,
  PathInfoContainer,
  CitiesContainer,
  ModalInfoContainer,
  TimeInfoContainer,
} from './styles';

import iconBack from '../../assets/icon-back-3.png';
import progressBar from '../../assets/progressBar-3.png';
import mapAmazon from '../../assets/map-amazon.png';
import iconCalendar from '../../assets/icon-calendar.png';
import iconPin from '../../assets/icon-pin.png';

const DetailedResult: React.FC = () => {
  const history = useHistory();

  const { pathsCardSelected } = useSearchResult();

  useEffect(() => {
    if (!pathsCardSelected.paths) {
      history.goBack();
    }
  }, [history, pathsCardSelected]);

  return (
    <>
      <Menu isAuthenticated={false} />

      <Container>
        <PathDetailed>
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
              <strong>Detalhes do trecho</strong>
              <img src={progressBar} alt="Progress Bar" />
            </div>
          </Top>

          {pathsCardSelected.paths && (
            <>
              <PeriodContainer>
                <div>
                  <img src={iconCalendar} alt="Calendar" />
                </div>
                <strong>Ida</strong>
                <b>
                  {pathsCardSelected.initialDate.toLocaleString().split(' ')[0]}
                </b>
                <strong>- Volta</strong>
                <b>
                  {pathsCardSelected.finalDate.toLocaleString().split(' ')[0]}
                </b>
              </PeriodContainer>

              <PathsContainer>
                {pathsCardSelected.paths.map((path, index) => (
                  <UniquePathContainer>
                    {index === 0 ||
                    index === pathsCardSelected.paths.length - 1 ? (
                      <nav />
                    ) : (
                      <section>
                        <img src={iconPin} alt="Pin" />
                        <strong>{index + 1}</strong>
                      </section>
                    )}

                    <PathInfoContainer>
                      <CitiesContainer>
                        <img src={path.modalImage} alt="Modal" />
                        <strong>{`${path.initCidade} - ${path.endCidade}`}</strong>
                      </CitiesContainer>
                      <ModalInfoContainer>
                        <strong>
                          <b>{path.modal}</b>
                          {` - ${path.prestNome}`}
                        </strong>
                      </ModalInfoContainer>
                      <TimeInfoContainer>
                        <strong>
                          {path.selectedPeriod.selectedDate
                            .toLocaleString()
                            .split(' ')[0]
                            .substring(0, 5)}
                        </strong>
                        <section>
                          <h2>{`Saída ${path.selectedPeriod.selectedInitTime}`}</h2>
                          <h2>{`Chegada ${path.selectedPeriod.selectedFinalTime}`}</h2>
                        </section>
                      </TimeInfoContainer>
                    </PathInfoContainer>

                    <h3>{path.duration}</h3>
                  </UniquePathContainer>
                ))}
              </PathsContainer>
            </>
          )}
        </PathDetailed>
        <MapContainer>
          <section>
            <img src={mapAmazon} alt="Amazon Map" />
          </section>
        </MapContainer>
      </Container>
    </>
  );
};

export default DetailedResult;
