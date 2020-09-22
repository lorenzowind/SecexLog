import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSearchResult } from '../../hooks/searchResult';

import { getArrayModalIcons } from '../../utils/getArrayModalFiles';

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

  const [arrayModalIcons] = useState(getArrayModalIcons);

  const { pathsCardSelected } = useSearchResult();

  useEffect(() => {
    if (!pathsCardSelected.paths) {
      history.goBack();
    }
  }, [history, pathsCardSelected]);

  const getRelatedModalIcon = useCallback(
    pathModalIcon => {
      const modal = arrayModalIcons.find(
        modalIcon => modalIcon.name === pathModalIcon,
      );

      if (modal) {
        return <img src={modal.url} alt="Modal" />;
      }
    },
    [arrayModalIcons],
  );

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
                      pathsCardSelected.initial_date
                        .toLocaleString()
                        .split(' ')[0]
                    }
                  </b>
                  <strong>- Volta</strong>
                  <b>{pathsCardSelected.final_date}</b>
                </PeriodContainer>

                <PathsContainer>
                  {pathsCardSelected.paths.map((path, index) => (
                    <UniquePathContainer
                      key={`${path.path_data.origin_city_name}-${path.path_data.destination_city_name}`}
                    >
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
                          {getRelatedModalIcon(path.path_data.modal_image)}
                          <strong>{`${path.path_data.origin_city_name} - ${path.path_data.destination_city_name}`}</strong>
                        </CitiesContainer>
                        <ModalInfoContainer>
                          <strong>
                            <b>{path.path_data.modal_name}</b>
                            {` - ${path.path_data.provider_name}`}
                          </strong>
                        </ModalInfoContainer>
                        <TimeInfoContainer>
                          <strong>{path.selected_period.selected_date}</strong>
                          <section>
                            <h2>{`Saída ${path.selected_period.selected_initial_time}`}</h2>
                            <h2>{`Chegada ${path.selected_period.selected_final_time}`}</h2>
                          </section>
                        </TimeInfoContainer>
                      </PathInfoContainer>

                      <article>
                        <h3>{String(path.path_data.duration)}</h3>
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
