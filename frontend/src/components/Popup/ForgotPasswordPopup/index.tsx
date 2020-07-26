import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Background, FullContainer, Container, Content } from './styles';

import Input from '../../Input';
import Button from '../../Button';

import IconClose from '../../../assets/ManualSearch/icon-close.png';

interface Props {
  setForgotPasswordPopupActive(isActive: boolean): void;
}

const ForgotPasswordPopup: React.FC<Props> = ({
  setForgotPasswordPopupActive,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSend = useCallback(() => {
    console.log('Working...');
  }, []);

  return (
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
  );
};

export default ForgotPasswordPopup;
