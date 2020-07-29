import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  useCity,
  CityOperationsData,
  CityState,
} from '../../../../hooks/modules/city';
import { useHoliday } from '../../../../hooks/modules/holiday';

import Input from '../../../Input';
import Button from '../../../Button';
import SwitchInput from '../../../SwitchInput';
import MultiSelect, { Option } from '../../../MultiSelect';
import LoadingPartial from '../../../Loading/LoadingPartial';

import { Background, FullContainer, Container, Content } from './styles';

import IconClose from '../../../../assets/icon-close.png';
import IconTrash from '../../../../assets/icon-trash.png';
import IconGo from '../../../../assets/icon-go.png';

interface CityUpdatingPopupProps {
  city: CityState;
}

interface Props extends CityUpdatingPopupProps {
  setCityUpdatingPopupActive(isActive: boolean): void;
}

const CityUpdatingPopup: React.FC<Props> = ({
  city,
  setCityUpdatingPopupActive,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [isNewFlood, setIsNewFlood] = useState(!city.initDataCheia);
  const [isBaseCity, setIsBaseCity] = useState(city.cBase);
  const [isAuditatedCity, setIsAuditatedCity] = useState(city.cAuditada);
  const [isInterdicted, setIsInterdicted] = useState(!!city.obsInterdicao);
  const [selectedRelatedCities, setSelectedRelatedCities] = useState<Option[]>(
    () => {
      if (city.relations) {
        city.relations.split(', ').map(relatedCity => {
          return {
            value: relatedCity,
            label: relatedCity,
          };
        });
      }
      return [];
    },
  );

  const [citiesSelect, setCitiesSelect] = useState<Option[]>([]);

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { cities, updateCity, removeCity, getCities } = useCity();
  const { holidays, getHolidays } = useHoliday();

  const handleRefreshCities = useCallback(async () => {
    await getCities().then(() => {
      setLoadingPartial(false);
      setCityUpdatingPopupActive(false);
    });
  }, [getCities, setCityUpdatingPopupActive]);

  const handleUpdateCity = useCallback(
    async (data: CityOperationsData) => {
      try {
        setLoadingPartial(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const cityData: CityOperationsData = {
          cAuditada: isAuditatedCity,
          cBase: isBaseCity,
          nome: data.nome,
          relations: selectedRelatedCities
            .map(relatedCity => relatedCity.value)
            .join(', '),
          initDataCheia: isNewFlood ? data.initDataCheia : city.initDataCheia,
          endDataCheia: isNewFlood ? data.endDataCheia : city.endDataCheia,
          obsInterdicao: !isInterdicted ? '' : city.obsInterdicao,
        };

        await updateCity(city.id, cityData).then(() => {
          handleRefreshCities();
        });
      } catch (err) {
        setLoadingPartial(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [
      city,
      handleRefreshCities,
      isAuditatedCity,
      isBaseCity,
      isInterdicted,
      isNewFlood,
      selectedRelatedCities,
      updateCity,
    ],
  );

  const handleDeleteCity = useCallback(async () => {
    await removeCity(city.id).then(() => {
      handleRefreshCities();
    });
  }, [city.id, handleRefreshCities, removeCity]);

  const handleGetData = useCallback(async () => {
    setLoadingPartial(true);

    await Promise.all([getHolidays(), getCities()]).then(() => {
      setLoadingPartial(false);
    });
  }, [getCities, getHolidays]);

  useEffect(() => {
    setCitiesSelect(
      cities
        .filter(generalCity => generalCity.nome !== city.nome)
        .map(differentCity => {
          return {
            value: differentCity.nome,
            label: differentCity.nome,
          };
        }),
    );
  }, [cities, city.nome]);

  useEffect(() => {
    if (!isLoaded) {
      handleGetData();
      setIsLoaded(true);
    }
  }, [handleGetData, isLoaded]);

  return (
    <>
      {loadingPartial && <LoadingPartial />}

      <Background>
        <FullContainer>
          <Container>
            <Content>
              <button
                type="button"
                onClick={() => setCityUpdatingPopupActive(false)}
              >
                <img src={IconClose} alt="Close" />
              </button>

              <h1>Editar Cidade</h1>

              <Form ref={formRef} onSubmit={handleUpdateCity}>
                <strong>Nome</strong>
                <Input name="nome" type="text" defaultValue={city.nome} />

                <strong>Cidades relacionadas</strong>
                <MultiSelect
                  placeholder="Selecione"
                  setSelectedOptions={setSelectedRelatedCities}
                  defaultValues={selectedRelatedCities}
                  options={citiesSelect}
                />

                <strong>Cidade base</strong>
                <SwitchInput
                  isChecked={isBaseCity}
                  setIsChecked={setIsBaseCity}
                />
                <strong>Cidade auditada</strong>
                <SwitchInput
                  isChecked={isAuditatedCity}
                  setIsChecked={setIsAuditatedCity}
                />
                <strong>Cidade interditada</strong>
                <SwitchInput
                  isChecked={isInterdicted}
                  setIsChecked={setIsInterdicted}
                />

                <strong>Feriados</strong>
                {holidays
                  .filter(holiday => holiday.city_id === city.id)
                  .map(cityHoliday => (
                    <h2>
                      {cityHoliday.init.substring(0, 5).concat(' - ')}
                      {cityHoliday.nome}
                    </h2>
                  ))}

                <strong>Período de cheia</strong>
                {isNewFlood ? (
                  <>
                    <Input name="initDataCheia" type="text" />
                    <img src={IconGo} alt="Go" />
                    <Input name="endDataCheia" type="text" />
                    <h3>+</h3>
                  </>
                ) : (
                  <>
                    <Input name="initDataCheia" type="text" disabled />
                    <img src={IconGo} alt="Go" />
                    <Input name="endDataCheia" type="text" disabled />
                    <h4>+</h4>
                    <button type="button" onClick={() => setIsNewFlood(true)}>
                      X
                    </button>
                    <h2>
                      {city.initDataCheia &&
                        city.initDataCheia.substring(0, 5).concat(' até ')}
                      {city.endDataCheia && city.endDataCheia.substring(0, 5)}
                    </h2>
                  </>
                )}

                <section>
                  <button type="button" onClick={handleDeleteCity}>
                    <img src={IconTrash} alt="Trash" />
                  </button>

                  <Button type="submit">Salvar</Button>
                </section>
              </Form>
            </Content>
          </Container>
        </FullContainer>
      </Background>
    </>
  );
};

export default CityUpdatingPopup;
