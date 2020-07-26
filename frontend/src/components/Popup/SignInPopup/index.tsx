import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container, OptionsContainer, Content } from './styles';

import Input from '../../Input';
import Button from '../../Button';

import IconClose from '../../../assets/ManualSearch/icon-close.png';
import IconUser from '../../../assets/ManualSearch/icon-user.png';
import IconPassword from '../../../assets/ManualSearch/icon-password.png';

interface Props {
  setSignInPopupActive(isActive: boolean): void;
}

const SignInPopup: React.FC<Props> = ({ setSignInPopupActive }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSignIn = useCallback(() => {
    console.log('Working...');
  }, []);

  return (
    <Container>
      <Content>
        <button type="button" onClick={() => setSignInPopupActive(false)}>
          <img src={IconClose} alt="Close" />
        </button>

        <Form ref={formRef} onSubmit={handleSignIn}>
          <Input
            name="login"
            icon={IconUser}
            type="text"
            placeholder="Nome do usuário"
          />

          <Input
            name="password"
            icon={IconPassword}
            type="password"
            placeholder="Senha"
          />
        </Form>

        <OptionsContainer>
          <button type="button">Esqueceu sua senha?</button>

          <Button type="button">Logar</Button>
        </OptionsContainer>
      </Content>
    </Container>
  );
};

export default SignInPopup;
