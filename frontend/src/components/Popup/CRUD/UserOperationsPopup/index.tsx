import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { isEqual } from 'lodash';

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
  const [
    defaultSelectedUserCategory,
    setDefaultSelectedUserCategory,
  ] = useState(user ? user.position : 'Selecione um cargo');

  const { insertUser, updateUser, removeUser, getUsers } = useUser();

  const handleRefreshUsers = useCallback(async () => {
    await getUsers(true).then(() => {
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
          name: Yup.string().required('Nome obrigatório'),
          login: Yup.string().required('Login obrigatório'),
          position: Yup.mixed().test('match', 'Cargo obrigatório', () => {
            return data.position !== 'Selecione um cargo';
          }),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Insira um email válido'),
          password: Yup.string().min(6, 'Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const userData: UserOperationsData = {
          name: data.name,
          login: data.login,
          position: data.position,
          email: data.email,
          password: data.password,
        };

        if (user) {
          const { id, ...auxUser } = user;

          if (!isEqual(userData, auxUser)) {
            await updateUser(id, userData).then(() => {
              handleRefreshUsers();
            });
          } else {
            setLoadingPartial(false);
            setUserOperationsPopupActive(false);
          }
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
    [
      handleRefreshUsers,
      insertUser,
      setUserOperationsPopupActive,
      updateUser,
      user,
    ],
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
      {loadingPartial && <LoadingPartial zIndex={4} />}

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
                  name="name"
                  type="text"
                  defaultValue={user ? user.name : ''}
                />

                <strong>Login</strong>
                <Input
                  name="login"
                  type="text"
                  defaultValue={user ? user.login : ''}
                />

                <strong>Cargo</strong>
                <Select
                  name="position"
                  value={defaultSelectedUserCategory}
                  onChange={e => setDefaultSelectedUserCategory(e.target.value)}
                >
                  <option value="Selecione um cargo" disabled>
                    Selecione um cargo
                  </option>

                  <option value="Administrador">Administrador</option>
                  <option value="Usuário">Usuário</option>
                </Select>

                <strong>Email</strong>
                <Input
                  name="email"
                  type="email"
                  defaultValue={user ? user.email : ''}
                />

                <strong>{user ? 'Nova senha' : 'Senha'}</strong>
                <Input name="password" type="password" />

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
