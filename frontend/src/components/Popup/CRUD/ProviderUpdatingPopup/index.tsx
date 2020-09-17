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

  const [defaultSelectedModal, setDefaultSelectedModal] = useState('');

  const [loadingPartial, setLoadingPartial] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { updateProvider, removeProvider, getProviders } = useProvider();
  const { modals, getModals } = useModal();

  const handleRefreshProviders = useCallback(async () => {
    await getProviders('').then(() => {
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
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const providerData: ProviderOperationsData = {
          name: data.name,
          email: data.email,
          modal_id: data.modal_id,
          phone_number: data.phone_number,
          preference_data: provider.preference_data,
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

    await getModals('').then(() => {
      setLoadingPartial(false);
    });
  }, [getModals]);

  useEffect(() => {
    const foundModal = modals.find(modal => modal.id === provider.modal_id);

    if (foundModal) {
      setDefaultSelectedModal(foundModal.id);
    } else {
      setDefaultSelectedModal('Selecione modal');
    }
  }, [modals, provider.modal_id]);

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
                <Input name="name" type="text" defaultValue={provider.name} />

                <strong>Telefone</strong>
                <Input
                  name="phone_number"
                  type="text"
                  mask="(999)99999-9999"
                  defaultValue={provider.phone_number}
                />

                <strong>Email</strong>
                <Input
                  name="email"
                  type="email"
                  defaultValue={provider.email}
                />

                <strong>Modal</strong>
                <Select
                  value={defaultSelectedModal}
                  name="modal_id"
                  onChange={e => setDefaultSelectedModal(e.target.value)}
                >
                  <option value="Selecione modal" disabled>
                    Selecione modal
                  </option>
                  {modals.map(differentModal => (
                    <option key={differentModal.id} value={differentModal.id}>
                      {differentModal.name}
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
