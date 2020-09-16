import React, { useEffect, useState } from 'react';
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
  OptionsContainer,
  PathDetailedClosed,
} from './styles';

import iconBack from '../../assets/icon-back-3.png';
import progressBar from '../../assets/progressBar-3.png';
import mapAmazon from '../../assets/map-amazon.png';
import iconCalendar from '../../assets/icon-calendar.png';
import iconPin from '../../assets/icon-pin.png';
import iconMail from '../../assets/icon-mail.png';
import iconPrint from '../../assets/icon-print.png';

const DetailedResult: React.FC = () => {
  const history = useHistory();

  const [mapIsFull, setMapIsFull] = useState(false);

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
        {!mapIsFull ? (
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

              <button type="button" onClick={() => setMapIsFull(!mapIsFull)}>
                <h1>Mapa</h1>
              </button>
            </Top>

            {pathsCardSelected.paths && (
              <>
                <PeriodContainer>
                  <div>
                    <img src={iconCalendar} alt="Calendar" />
                  </div>
                  <strong>Ida</strong>
                  <b>
                    {
                      pathsCardSelected.initialDate
                        .toLocaleString()
                        .split(' ')[0]
                    }
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
                          <strong>{index}</strong>
                        </section>
                      )}

                      <PathInfoContainer>
                        <CitiesContainer>
                          <img src={path.modalImage} alt="Modal" />
                          <strong>{`${path.origin_city_id} - ${path.destination_city_id}`}</strong>
                        </CitiesContainer>
                        <ModalInfoContainer>
                          <strong>
                            <b>{path.modal_id}</b>
                            {` - ${path.provider_id}`}
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

                      <article>
                        <h3>{path.duration}</h3>
                      </article>
                    </UniquePathContainer>
                  ))}
                </PathsContainer>

                <OptionsContainer>
                  <button type="button">
                    <img src={iconMail} alt="Mail" />
                  </button>

                  <button type="button">
                    <img src={iconPrint} alt="Print" />
                  </button>
                </OptionsContainer>
              </>
            )}
          </PathDetailed>
        ) : (
          <PathDetailedClosed>
            <button type="button" onClick={() => setMapIsFull(!mapIsFull)}>
              <h1>Mapa</h1>
            </button>
          </PathDetailedClosed>
        )}
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
