import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../../services/api';

import getValidationErrors from '../../../utils/getValidationErrors';

import { useToast } from '../../../hooks/toast';

import { Background, FullContainer, Container, Content } from './styles';

import Input from '../../Input';
import Button from '../../Button';
import LoadingPartial from '../../Loading/LoadingPartial';

import IconClose from '../../../assets/icon-close.png';

interface Props {
  setForgotPasswordPopupActive(isActive: boolean): void;
}

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordPopup: React.FC<Props> = ({
  setForgotPasswordPopupActive,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [loadingPartial, setLoadingPartial] = useState(false);

  const { addToast } = useToast();

  const handleSend = useCallback(
    async (data: ForgotPasswordFormData) => {
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

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      } finally {
        setLoadingPartial(false);
      }
    },
    [addToast],
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
                onClick={() => setForgotPasswordPopupActive(false)}
              >
                <img src={IconClose} alt="Close" />
              </button>

              <strong>Insira o endereço de email!</strong>
              <h2>Insira o endereço de email que está vinculado a sua conta</h2>

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

export default ForgotPasswordPopup;
