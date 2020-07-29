import React, { useRef, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import { useOpinion, OpinionOperationsData } from '../../../hooks/opinion';

import { Background, FullContainer, Container, Content } from './styles';

import Select from '../../Select';
import Textarea from '../../Textarea';
import LoadingPartial from '../../Loading/LoadingPartial';

import IconClose from '../../../assets/icon-close.png';
import IconSend from '../../../assets/icon-send.png';

interface Props {
  setOpinionPopupActive(isActive: boolean): void;
}

const OpinionPopup: React.FC<Props> = ({ setOpinionPopupActive }) => {
  const formRef = useRef<FormHandles>(null);

  const [loadingPartial, setLoadingPartial] = useState(false);

  const { sendOpinion } = useOpinion();

  const handleSend = useCallback(
    async (data: OpinionOperationsData) => {
      try {
        setLoadingPartial(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          titulo: Yup.mixed().test('match', 'Assunto obrigatório', () => {
            return data.titulo !== 'Selecione um assunto';
          }),
          desc: Yup.string().required('Opinião obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const opinionData: OpinionOperationsData = {
          titulo: data.titulo,
          desc: data.desc,
        };

        await sendOpinion(opinionData).then(() => {
          setLoadingPartial(false);
          setOpinionPopupActive(false);
        });
      } catch (err) {
        setLoadingPartial(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [sendOpinion, setOpinionPopupActive],
  );

  return (
    <>
      {loadingPartial && <LoadingPartial zIndex={4} />}

      <Background>
        <FullContainer>
          <Container>
            <Content>
              <Form ref={formRef} onSubmit={handleSend}>
                <button
                  type="button"
                  onClick={() => setOpinionPopupActive(false)}
                >
                  <img src={IconClose} alt="Close" />
                </button>

                <strong>Dê sua opinião!</strong>
                <Select name="titulo" defaultValue="Selecione um assunto">
                  <option value="Selecione um assunto" disabled>
                    Selecione um assunto
                  </option>
                  <option value="Sistema">Sistema</option>
                  <option value="Cidades">Cidades</option>
                  <option value="Modais">Modais</option>
                  <option value="Prestador de serviços">
                    Prestador de serviços
                  </option>
                  <option value="Trajetos">Trajetos</option>
                </Select>

                <section>
                  <Textarea name="desc" placeholder="Opinião..." />
                </section>

                <button type="submit">
                  <img src={IconSend} alt="Send" />
                </button>
              </Form>
            </Content>
          </Container>
        </FullContainer>
      </Background>
    </>
  );
};

export default OpinionPopup;
