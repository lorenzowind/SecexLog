import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import {
  useProvider,
  ProviderOperationsData,
} from '../../../hooks/modules/provider';
import { useModal } from '../../../hooks/modules/modal';
import { useToast } from '../../../hooks/toast';

import { Container, Content, InputsContainer } from './styles';

import {
  Header,
  Menu,
  Input,
  Button,
  Select,
  LoadingPartial,
  LoadingPage,
} from '../../../components';

import iconCrud from '../../../assets/icon-crud-2.png';

const ProviderForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [modalSelected, setModalSelected] = useState('Selecione modal');
  const [preferenceSelected, setPreferenceSelected] = useState(
    'Selecione preferência',
  );

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { insertProvider } = useProvider();
  const { modals, getModals } = useModal();
  const { addToast } = useToast();

  const handleGetModals = useCallback(async () => {
    setLoadingPartial(true);

    await getModals('', false).then(() => {
      setLoadingPartial(false);
    });
  }, [getModals]);

  useEffect(() => {
    if (!isLoaded) {
      handleGetModals();
      setIsLoaded(true);
    }
  }, [handleGetModals, isLoaded]);

  const handleCreate = useCallback(
    async (data: ProviderOperationsData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome da cidade obrigatório'),
          email: Yup.string().required('Email obrigatório'),
          phone_number: Yup.string().required('Telefone obrigatório'),
          modal_id: Yup.mixed().test(
            'match',
            'Nome do modal obrigatório',
            () => {
              return data.modal_id !== 'Selecione modal';
            },
          ),
          preference_data: Yup.string().required('Preferência obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const providerData: ProviderOperationsData = {
          name: data.name,
          email: data.email,
          modal_id: data.modal_id,
          phone_number: data.phone_number,
          preference_data: data.preference_data,
          preference: data.preference,
        };

        setLoadingPage(true);

        await insertProvider(providerData).then(() => {
          setLoadingPage(false);
        });

        history.push('/listing-data');
      } catch (err) {
        setLoadingPage(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na criação do prestador',
        });
      }
    },
    [addToast, history, insertProvider],
  );

  return (
    <>
      {loadingPartial && <LoadingPartial zIndex={1} />}
      {loadingPage && <LoadingPage />}

      <Header isAuthenticated />

      <Menu isAuthenticated />

      <Container>
        <Content>
          <img src={iconCrud} alt="Crud" />
          <h1>Cadastro de Prestador</h1>
          <hr />

          <InputsContainer>
            <Form ref={formRef} onSubmit={handleCreate}>
              <div>
                <strong>Nome do Prestador</strong>
                <Input name="name" type="text" />
              </div>

              <section>
                <div>
                  <strong>Telefone</strong>
                  <Input
                    name="phone_number"
                    type="text"
                    mask="(999)99999-9999"
                  />
                </div>
                <div>
                  <strong>Email</strong>
                  <Input name="email" type="email" />
                </div>
              </section>

              <div>
                <strong>Modal</strong>
                <Select
                  name="modal_id"
                  value={modalSelected}
                  onChange={e => setModalSelected(e.target.value)}
                >
                  <option value="Selecione modal" disabled>
                    Selecione modal
                  </option>
                  {modals.map(modal => (
                    <option key={modal.id} value={modal.name}>
                      {modal}
                    </option>
                  ))}
                </Select>
              </div>

              <section>
                <div>
                  <strong>Você prefere</strong>
                  <Select
                    name="preference"
                    value={preferenceSelected}
                    onChange={e => setPreferenceSelected(e.currentTarget.value)}
                  >
                    <option value="Selecione preferência" disabled>
                      Selecione preferência
                    </option>
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                  </Select>
                </div>

                {preferenceSelected && (
                  <div>
                    <strong>{preferenceSelected}</strong>
                    <Input
                      name="preference_data"
                      type="text"
                      mask={
                        preferenceSelected === 'CPF'
                          ? '999.999.999-99'
                          : '99-999-999/9999-99'
                      }
                    />
                  </div>
                )}
              </section>

              <aside>
                <Button type="submit">Criar</Button>
              </aside>
            </Form>
          </InputsContainer>
        </Content>
      </Container>
    </>
  );
};

export default ProviderForm;
