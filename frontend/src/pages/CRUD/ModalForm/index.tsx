import React, { useRef, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';
import {
  getArrayModalImages,
  ModalImageState,
} from '../../../utils/getArrayModalFiles';

import { useModal, ModalOperationsData } from '../../../hooks/modules/modal';
import { useToast } from '../../../hooks/toast';

import { Container, Content, InputsContainer } from './styles';

import {
  Header,
  Menu,
  Input,
  ImageModal,
  RadioInput,
  Button,
  LoadingPage,
} from '../../../components';

import iconCrud from '../../../assets/icon-crud-2.png';

const ModalForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [safeModal, setSafeModal] = useState('');
  const [cheapModal, setCheapModal] = useState('');
  const [fastModal, setFastModal] = useState('');

  const [arrayModalImages, setArrayModalImages] = useState(getArrayModalImages);

  const [loadingPage, setLoadingPage] = useState(false);

  const { insertModal } = useModal();
  const { addToast } = useToast();

  const handleClickModalImage = useCallback((index: number) => {
    setArrayModalImages(state =>
      state.reduce((newArray: ModalImageState[], modalImage, curIndex) => {
        newArray.push({
          isSelected: curIndex === index ? !modalImage.isSelected : false,
          url: modalImage.url,
          name: modalImage.name,
        });
        return newArray;
      }, []),
    );
  }, []);

  const handleCreate = useCallback(
    async (data: ModalOperationsData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do modal obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!safeModal || !cheapModal || !fastModal) {
          throw new Error();
        }

        const auxModalImage = arrayModalImages.find(
          modalImage => modalImage.isSelected,
        );

        const modalData: ModalOperationsData = {
          name: data.name,
          is_safe: safeModal === 'Sim',
          is_cheap: cheapModal === 'Sim',
          is_fast: fastModal === 'Sim',
          image: auxModalImage ? auxModalImage.name : '',
        };

        setLoadingPage(true);

        await insertModal(modalData).then(() => {
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
          title: 'Erro na criação do modal',
        });
      }
    },
    [
      addToast,
      arrayModalImages,
      cheapModal,
      fastModal,
      history,
      insertModal,
      safeModal,
    ],
  );

  return (
    <>
      {loadingPage && <LoadingPage />}

      <Header isAuthenticated />

      <Menu isAuthenticated />

      <Container>
        <Content>
          <img src={iconCrud} alt="Crud" />
          <h1>Cadastro de Modal</h1>
          <hr />

          <InputsContainer>
            <Form ref={formRef} onSubmit={handleCreate}>
              <section>
                <strong>Nome do modal</strong>
                <Input name="name" type="text" />
              </section>

              <section>
                <strong>Selecione ícone</strong>
                <nav>
                  {arrayModalImages.map((imageModal, index) => (
                    <button
                      type="button"
                      key={imageModal.url}
                      onClick={() => handleClickModalImage(index)}
                    >
                      <ImageModal
                        imageSize={75}
                        imageModal={imageModal.url}
                        isSelected={imageModal.isSelected}
                      />
                    </button>
                  ))}
                </nav>
              </section>

              <section>
                <strong>Esse modal é seguro?</strong>
                <section>
                  <RadioInput
                    name="is_safe"
                    options={['Sim', 'Não']}
                    onChangeValue={setSafeModal}
                  />
                </section>
              </section>
              <section>
                <strong>Esse modal é de baixo custo?</strong>
                <section>
                  <RadioInput
                    name="is_cheap"
                    options={['Sim', 'Não']}
                    onChangeValue={setCheapModal}
                  />
                </section>
              </section>
              <section>
                <strong>Esse modal é rápido?</strong>
                <section>
                  <RadioInput
                    name="is_fast"
                    options={['Sim', 'Não']}
                    onChangeValue={setFastModal}
                  />
                </section>
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

export default ModalForm;
