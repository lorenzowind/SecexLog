import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../utils/getValidationErrors';

import {
  ProviderState,
  ProviderOperationsData,
  useProvider,
} from '../../../../hooks/modules/provider';
import { useModal } from '../../../../hooks/modules/modal';

import Input from '../../../Input';
import Button from '../../../Button';
import Select from '../../../Select';
import LoadingPartial from '../../../Loading/LoadingPartial';

import { Background, FullContainer, Container, Content } from './styles';

import IconClose from '../../../../assets/icon-close.png';
import IconTrash from '../../../../assets/icon-trash.png';

interface ProviderUpdatingPopupProps {
  provider: ProviderState;
}

interface Props extends ProviderUpdatingPopupProps {
  setProviderUpdatingPopupActive(isActive: boolean): void;
}

const ProviderUpdatingPopup: React.FC<Props> = ({
  provider,
  setProviderUpdatingPopupActive,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [modalsSelect, setModalsSelect] = useState<String[]>([]);
  const [defaultSelectedModal, setDefaultSelectedModal] = useState('');

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { updateProvider, removeProvider, getProviders } = useProvider();
  const { modals, getModals } = useModal();

  const handleRefreshProviders = useCallback(async () => {
    await getProviders().then(() => {
      setLoadingPartial(false);
      setProviderUpdatingPopupActive(false);
    });
  }, [getProviders, setProviderUpdatingPopupActive]);

  const handleUpdateProvider = useCallback(
    async (data: ProviderOperationsData) => {
      try {
        setLoadingPartial(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome da cidade obrigatório'),
          email: Yup.string().required('Email obrigatório'),
          telefone: Yup.string().required('Telefone obrigatório'),
          modal: Yup.mixed().test('match', 'Nome do modal obrigatório', () => {
            return data.modal !== 'Selecione modal';
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const providerData: ProviderOperationsData = {
          nome: data.nome,
          email: data.email,
          modal: data.modal,
          telefone: data.telefone,
          preferenceTxt: provider.preferenceTxt,
          preference: provider.preference,
        };

        await updateProvider(provider.id, providerData).then(() => {
          handleRefreshProviders();
        });
      } catch (err) {
        setLoadingPartial(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleRefreshProviders, provider, updateProvider],
  );

  const handleDeleteProvider = useCallback(async () => {
    await removeProvider(provider.id).then(() => {
      handleRefreshProviders();
    });
  }, [handleRefreshProviders, provider.id, removeProvider]);

  const handleGetModals = useCallback(async () => {
    setLoadingPartial(true);

    await getModals().then(() => {
      setLoadingPartial(false);
    });
  }, [getModals]);

  useEffect(() => {
    setModalsSelect(modals.map(modal => modal.name));

    const foundModal = modals.find(modal => modal.name === provider.modal);

    if (foundModal) {
      setDefaultSelectedModal(foundModal.name);
    } else {
      setDefaultSelectedModal('Selecione cidade');
    }
  }, [modals, provider.modal]);

  useEffect(() => {
    if (!isLoaded) {
      handleGetModals();
      setIsLoaded(true);
    }
  }, [handleGetModals, isLoaded]);

  return (
    <>
      {loadingPartial && <LoadingPartial zIndex={4} />}

      <Background>
        <FullContainer>
          <Container>
            <Content>
              <button
                type="button"
                onClick={() => setProviderUpdatingPopupActive(false)}
              >
                <img src={IconClose} alt="Close" />
              </button>

              <h1>Editar Prestador</h1>

              <Form ref={formRef} onSubmit={handleUpdateProvider}>
                <strong>Nome do Prestador</strong>
                <Input name="nome" type="text" defaultValue={provider.nome} />

                <strong>Telefone</strong>
                <Input
                  name="telefone"
                  type="text"
                  defaultValue={provider.telefone}
                />

                <strong>Email</strong>
                <Input
                  name="email"
                  type="email"
                  defaultValue={provider.email}
                />

                <strong>Modal</strong>
                <Select defaultValue="Selecione modal" name="modal">
                  <option value="Selecione modal" disabled>
                    Selecione modal
                  </option>
                  <option
                    key={String(defaultSelectedModal)}
                    selected
                    value={String(defaultSelectedModal)}
                  >
                    {defaultSelectedModal}
                  </option>
                  {modalsSelect
                    .filter(modal => modal !== defaultSelectedModal)
                    .map(differentModal => (
                      <option
                        key={String(differentModal)}
                        value={String(differentModal)}
                      >
                        {differentModal}
                      </option>
                    ))}
                </Select>

                <section>
                  <button type="button" onClick={handleDeleteProvider}>
                    <img src={IconTrash} alt="Trash" />
                  </button>

                  <Button type="submit">Salvar</Button>
                </section>
              </Form>
            </Content>
          </Container>
        </FullContainer>
      </Background>
    </>
  );
};

export default ProviderUpdatingPopup;
