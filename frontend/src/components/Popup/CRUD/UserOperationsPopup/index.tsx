import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { UserState } from '../../../../hooks/modules/user';

import Input from '../../../Input';
import Button from '../../../Button';
import Select from '../../../Select';
import Loading from '../../../Loading';

import { Background, FullContainer, Container, Content } from './styles';

import IconClose from '../../../../assets/icon-close.png';
import IconTrash from '../../../../assets/icon-trash.png';

interface UserOperationsPopupProps {
  operation: 'criar' | 'editar';
  user?: UserState;
}

interface Props extends UserOperationsPopupProps {
  setUserOperationsPopupActive(isActive: boolean): void;
}

const UserOperationsPopup: React.FC<Props> = ({
  operation,
  user,
  setUserOperationsPopupActive,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const handleCreateOrUpdateUser = useCallback(() => {
    console.log('Working...');
  }, []);

  const handleDeleteUser = useCallback(() => {
    console.log('Working...');
  }, []);

  return (
    <>
      {loading && <Loading />}

      <Background>
        <FullContainer>
          <Container>
            <Content>
              <button
                type="button"
                onClick={() => setUserOperationsPopupActive(false)}
              >
                <img src={IconClose} alt="Close" />
              </button>

              <h1>
                {operation.charAt(0).toUpperCase() +
                  operation.slice(1).concat(' usuário')}
              </h1>

              <Form ref={formRef} onSubmit={handleCreateOrUpdateUser}>
                <strong>Nome</strong>
                <Input name="nome" type="text" defaultValue={user?.nome} />

                <strong>Login</strong>
                <Input name="login" type="text" defaultValue={user?.login} />

                <strong>Cargo</strong>
                <Select>
                  {user?.cargo ? (
                    <option selected>{user.cargo}</option>
                  ) : (
                    <option selected disabled>
                      Selecione um cargo
                    </option>
                  )}
                  <option value="1">Administrador</option>
                  <option value="2">Usuário</option>
                </Select>

                <strong>Email</strong>
                <Input name="email" type="email" defaultValue={user?.email} />

                <strong>Senha</strong>
                <Input
                  name="senha"
                  type="password"
                  defaultValue={
                    user?.senha ? '*'.repeat(user.senha.length) : ''
                  }
                />

                <section>
                  <button type="button" onClick={handleDeleteUser}>
                    <img src={IconTrash} alt="Trash" />
                  </button>

                  <Button type="submit">
                    {operation === 'editar' ? 'Salvar' : 'Criar'}
                  </Button>
                </section>
              </Form>
            </Content>
          </Container>
        </FullContainer>
      </Background>
    </>
  );
};

export default UserOperationsPopup;
