import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useSearchResult } from '../../hooks/searchResult';
import { useToast } from '../../hooks/toast';

import { getArrayModalIcons } from '../../utils/getArrayModalFiles';

import { Menu, LoadingPartial, SendReportPopup } from '../../components';

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
  ObservationsContainer,
  OptionsContainer,
  PathDetailedClosed,
  CityPin,
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

  const [sendReportPopupActive, setSendReportPopupActive] = useState(false);

  const [mapIsFull, setMapIsFull] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [cities, setCities] = useState<string[]>([]);

  const [arrayModalIcons] = useState(getArrayModalIcons);

  const { pathsCardSelected } = useSearchResult();
  const { addToast } = useToast();

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

  const convertToTime = useCallback((minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const newMinutes = minutes % 60;

    return `${String(hours)}h${newMinutes}m`;
  }, []);

  const handleDownloadSearchReport = useCallback(async () => {
    try {
      setLoading(true);

      await api
        .post('searches/report', {
          data: pathsCardSelected,
        })
        .then(response => {
          window.open(response.data, '_blank');
        });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao fazer download do relatório da viagem',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, pathsCardSelected]);

  useEffect(() => {
    if (!isLoaded && pathsCardSelected.paths) {
      pathsCardSelected.paths.forEach((pathCard, index) => {
        if (index === 0) {
          setCities(state => [...state, pathCard.path_data.origin_city_name]);
        }

        setCities(state => [
          ...state,
          pathCard.path_data.destination_city_name,
        ]);
      });

      setCities(state =>
        state.reduce((newArray: string[], city) => {
          const cityExists = newArray.find(cityFind => cityFind === city);

          if (!cityExists) {
            newArray.push(city);
          }

          return newArray;
        }, []),
      );

      setIsLoaded(true);
    }
  }, [cities, isLoaded, pathsCardSelected.paths]);

  return (
    <>
      {loading && <LoadingPartial zIndex={1} />}

      {sendReportPopupActive && (
        <SendReportPopup setSendReportPopupActive={setSendReportPopupActive} />
      )}

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
                      key={`${path.path_data.origin_city_name}-${path.path_data.destination_city_name}-${index}`}
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
                        <h3>{convertToTime(path.path_data.duration)}</h3>
                      </article>
                    </UniquePathContainer>
                  ))}
                </PathsContainer>

                <ObservationsContainer>
                  {pathsCardSelected.observations.map(
                    (pathObservation, index2) => (
                      <h4 key={`Obs-${index2}`}>
                        {`*${pathObservation.observation}`}
                      </h4>
                    ),
                  )}
                </ObservationsContainer>

                <OptionsContainer>
                  <button
                    type="button"
                    onClick={() => setSendReportPopupActive(true)}
                  >
                    <img src={iconMail} alt="Mail" />
                  </button>

                  <button type="button" onClick={handleDownloadSearchReport}>
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
            <>
              {cities.map((city, index) => (
                <CityPin key={`${city}-${index}`} cityName={city}>
                  {index === 0 || index === cities.length - 1 ? (
                    <nav />
                  ) : (
                    <img src={iconPin} alt="Pin" />
                  )}
                </CityPin>
              ))}
              <img src={mapAmazon} alt="Amazon Map" />
            </>
          </section>
        </MapContainer>
      </Container>
    </>
  );
};

export default DetailedResult;
