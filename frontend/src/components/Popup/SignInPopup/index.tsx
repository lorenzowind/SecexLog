import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Background, Container, OptionsContainer, Content } from './styles';

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

  const [dataError, setDataError] = useState(false);

  const handleSignIn = useCallback(() => {
    console.log('Working...');
  }, []);

  return (
    <Background>
      <Container>
        <Content>
          <button type="button" onClick={() => setSignInPopupActive(false)}>
            <img src={IconClose} alt="Close" />
          </button>

          {dataError && <strong>Nome ou senha incorreta!</strong>}

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
    </Background>
  );
};

export default SignInPopup;
