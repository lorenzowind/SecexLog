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

import { Container, Content, InputsContainer } from './styles';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import LoadingPartial from '../../../components/Loading/LoadingPartial';
import LoadingPage from '../../../components/Loading/LoadingPage';

import iconCrud from '../../../assets/icon-crud-2.png';

const ProviderForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [preferenceSelected, setPreferenceSelected] = useState('');
  const [modalsSelect, setModalsSelect] = useState<String[]>([]);

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { insertProvider } = useProvider();
  const { modals, getModals } = useModal();

  const handleGetModals = useCallback(async () => {
    setLoadingPartial(true);

    await getModals().then(() => {
      setLoadingPartial(false);
    });
  }, [getModals]);

  useEffect(() => {
    setModalsSelect(modals.map(modal => modal.name));
  }, [modals]);

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
          nome: Yup.string().required('Nome da cidade obrigatório'),
          email: Yup.string().required('Email obrigatório'),
          telefone: Yup.string().required('Telefone obrigatório'),
          modal: Yup.mixed().test('match', 'Nome do modal obrigatório', () => {
            return data.modal !== 'Selecione modal';
          }),
          preferenceTxt: Yup.mixed().test(
            'match',
            'Preferência obrigatória',
            () => {
              return data.preferenceTxt !== 'Selecione preferência';
            },
          ),
          preference: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const providerData: ProviderOperationsData = {
          nome: data.nome,
          email: data.email,
          modal: data.modal,
          telefone: data.telefone,
          preferenceTxt: data.preferenceTxt,
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
      }
    },
    [history, insertProvider],
  );

  return (
    <>
      {loadingPartial && <LoadingPartial zIndex={1} />}
      {loadingPage && <LoadingPage />}

      <Header isAuthenticated />

      <Menu />

      <Container>
        <Content>
          <img src={iconCrud} alt="Crud" />
          <h1>Cadastro de Prestador</h1>
          <hr />

          <InputsContainer>
            <Form ref={formRef} onSubmit={handleCreate}>
              <strong>Nome do Prestador</strong>
              <Input name="nome" type="text" />

              <strong>Telefone</strong>
              <Input name="telefone" type="text" />

              <strong>Email</strong>
              <Input name="email" type="email" />

              <strong>Modal</strong>
              <Select defaultValue="Selecione modal" name="modal">
                <option value="Selecione modal" disabled>
                  Selecione modal
                </option>
                {modalsSelect.map((modal, index) => (
                  <option key={String(index)} value={String(modal)}>
                    {modal}
                  </option>
                ))}
              </Select>

              <strong>Você prefere</strong>
              <Select
                defaultValue="Selecione modal"
                name="modal"
                onChange={e => setPreferenceSelected(e.currentTarget.value)}
              >
                <option value="Selecione modal" disabled>
                  Selecione preferência
                </option>
                <option value="CPF">CPF</option>
                <option value="CNPJ">CNPJ</option>
              </Select>

              {preferenceSelected && (
                <>
                  <strong>{preferenceSelected}</strong>
                  <Input name="preferenceTxt" type="text" />
                </>
              )}

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
