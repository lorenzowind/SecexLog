import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';

import { Background, Container, OptionsContainer, Content } from './styles';

import Input from '../../Input';
import Button from '../../Button';

import IconClose from '../../../assets/icon-close.png';
import IconUser from '../../../assets/icon-user.png';
import IconPassword from '../../../assets/icon-password.png';

interface Props {
  setSignInPopupActive(isActive: boolean): void;
  setForgotPasswordPopupActive(isActive: boolean): void;
}

interface SignInFormData {
  login: string;
  password: string;
}

const SignInPopup: React.FC<Props> = ({
  setSignInPopupActive,
  setForgotPasswordPopupActive,
}) => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [dataError, setDataError] = useState(false);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        const schema = Yup.object().shape({
          login: Yup.string().required('Nome de usuário obrigatório'),
          password: Yup.string().min(6, 'Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          login: data.login,
          senha: data.password,
        });

        addToast({
          type: 'success',
          title: 'Login realizado com sucesso',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setDataError(true);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
        setSignInPopupActive(false);
      }
    },
    [addToast, history, setSignInPopupActive, signIn],
  );

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

            <OptionsContainer>
              <button
                type="button"
                onClick={() => setForgotPasswordPopupActive(true)}
              >
                Esqueceu sua senha?
              </button>

              <Button type="submit">Logar</Button>
            </OptionsContainer>
          </Form>
        </Content>
      </Container>
    </Background>
  );
};

export default SignInPopup;
