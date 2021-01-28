import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../../services/api';

import getValidationErrors from '../../../utils/getValidationErrors';

import { useSearchResult } from '../../../hooks/searchResult';
import { useToast } from '../../../hooks/toast';

import { Background, FullContainer, Container, Content } from './styles';

import Input from '../../Input';
import Button from '../../Button';
import LoadingPartial from '../../Loading/LoadingPartial';

import IconClose from '../../../assets/icon-close.png';

interface Props {
  setSendReportPopupActive(isActive: boolean): void;
}

interface SendReportFormData {
  email: string;
}

const SendReportPopup: React.FC<Props> = ({ setSendReportPopupActive }) => {
  const formRef = useRef<FormHandles>(null);

  const [loadingPartial, setLoadingPartial] = useState(false);

  const { pathsCardSelected } = useSearchResult();
  const { addToast } = useToast();

  const handleSend = useCallback(
    async (data: SendReportFormData) => {
      try {
        setLoadingPartial(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/searches/send-report', {
          email: data.email,
          data: pathsCardSelected,
        });

        addToast({
          type: 'success',
          title: 'Relatório de viagem enviado',
          description:
            'Enviamos um e-mail com o relatório da viagem, cheque sua caixa de entrada',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro durante o envio',
          description:
            'Ocorreu um erro ao tentar enviar o relatório para o e-mail informado, tente novamente.',
        });
      } finally {
        setLoadingPartial(false);
      }
    },
    [addToast, pathsCardSelected],
  );

  return (
    <>
      {loadingPartial && <LoadingPartial zIndex={4} />}
      <Background>
        <FullContainer>
          <Container>
            <Content>
              <button
                type="button"
                onClick={() => setSendReportPopupActive(false)}
              >
                <img src={IconClose} alt="Close" />
              </button>

              <strong>Insira o endereço de email!</strong>
              <h2>
                Insira o endereço de email para receber o relatório detalhado da
                viagem
              </h2>

              <Form ref={formRef} onSubmit={handleSend}>
                <Input name="email" type="email" placeholder="Email..." />

                <Button type="submit">Enviar</Button>
              </Form>
            </Content>
          </Container>
        </FullContainer>
      </Background>
    </>
  );
};

export default SendReportPopup;
