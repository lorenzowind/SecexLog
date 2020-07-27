import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  UserState,
  UserOperationsData,
  useUser,
} from '../../../../hooks/modules/user';

import Input from '../../../Input';
import Button from '../../../Button';
import Select from '../../../Select';
import LoadingPartial from '../../../Loading/LoadingPartial';

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

  const [loadingPartial, setLoadingPartial] = useState(false);

  const { insertUser, updateUser, removeUser, getUsers } = useUser();

  const handleRefreshUsers = useCallback(async () => {
    await getUsers().then(() => {
      setLoadingPartial(false);
      setUserOperationsPopupActive(false);
    });
  }, [getUsers, setUserOperationsPopupActive]);

  const handleCreateOrUpdateUser = useCallback(
    async (data: UserOperationsData) => {
      try {
        setLoadingPartial(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          login: Yup.string().required('Login obrigatório'),
          cargo: Yup.mixed().test('match', 'Cargo obrigatório', () => {
            return data.cargo !== 'Selecione um cargo';
          }),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Insira um email válido'),
          senha: Yup.string().min(6, 'Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const userData: UserOperationsData = {
          nome: data.nome,
          login: data.login,
          cargo: data.cargo,
          email: data.email,
          senha: data.senha,
        };

        if (user) {
          await updateUser(user.id, userData).then(() => {
            handleRefreshUsers();
          });
        } else {
          await insertUser(userData).then(() => {
            handleRefreshUsers();
          });
        }
      } catch (err) {
        setLoadingPartial(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleRefreshUsers, insertUser, updateUser, user],
  );

  const handleDeleteUser = useCallback(async () => {
    if (user) {
      await removeUser(user.id).then(() => {
        handleRefreshUsers();
      });
    }
  }, [handleRefreshUsers, removeUser, user]);

  return (
    <>
      {loadingPartial && <LoadingPartial />}

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
                <Input
                  name="nome"
                  type="text"
                  defaultValue={user ? user.nome : ''}
                />

                <strong>Login</strong>
                <Input
                  name="login"
                  type="text"
                  defaultValue={user ? user.login : ''}
                />

                <strong>Cargo</strong>
                <Select
                  name="cargo"
                  defaultValue={user ? user.cargo : 'Selecione um cargo'}
                >
                  {user?.cargo ? (
                    <option value={user.cargo}>{user.cargo}</option>
                  ) : (
                    <option value="Selecione um cargo" disabled>
                      Selecione um cargo
                    </option>
                  )}
                  <option value="Administrador">Administrador</option>
                  <option value="Usuário">Usuário</option>
                </Select>

                <strong>Email</strong>
                <Input
                  name="email"
                  type="email"
                  defaultValue={user ? user.email : ''}
                />

                <strong>Senha</strong>
                <Input
                  name="senha"
                  type="password"
                  defaultValue={
                    user?.senha ? '*'.repeat(user.senha.length) : ''
                  }
                />

                <section>
                  {user ? (
                    <button type="button" onClick={handleDeleteUser}>
                      <img src={IconTrash} alt="Trash" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setUserOperationsPopupActive(false)}
                    >
                      Cancelar
                    </button>
                  )}

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
