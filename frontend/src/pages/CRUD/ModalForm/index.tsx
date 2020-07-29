import React, { useRef, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';
import getArrayModalImages, {
  ModalImageState,
} from '../../../utils/getArrayModalImages';

import { useModal, ModalOperationsData } from '../../../hooks/modules/modal';

import { Container, Content, InputsContainer } from './styles';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Input from '../../../components/Input';
import ImageModal from '../../../components/ImageModal';
import Button from '../../../components/Button';
import LoadingPage from '../../../components/Loading/LoadingPage';

import iconCrud from '../../../assets/icon-crud-2.png';

const ModalForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [isSafe, setIsSafe] = useState(false);
  const [isCheap, setIsCheap] = useState(false);
  const [isFast, setIsFast] = useState(false);

  const [modalImageUrl, setModalImageUrl] = useState('');

  const [arrayModalImages, setArrayModalImages] = useState(getArrayModalImages);

  const [loadingPage, setLoadingPage] = useState(false);

  const { insertModal } = useModal();

  const handleClickModalImage = useCallback((index: number) => {
    setArrayModalImages(state =>
      state.reduce((newArray: ModalImageState[], modalImage, curIndex) => {
        newArray.push({
          isSelected: curIndex === index ? !modalImage.isSelected : false,
          url: modalImage.url,
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
          name: Yup.string().required('Nome de feriado obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const ModalData: ModalOperationsData = {
          name: data.name,
          safety: isSafe,
          cost: isCheap,
          fast: isFast,
          imgUrl: modalImageUrl,
        };

        setLoadingPage(true);

        await insertModal(ModalData).then(() => {
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
    [history, insertModal, isCheap, isFast, isSafe, modalImageUrl],
  );

  return (
    <>
      {loadingPage && <LoadingPage />}

      <Header isAuthenticated />

      <Menu />

      <Container>
        <Content>
          <img src={iconCrud} alt="Crud" />
          <h1>Cadastro de Modal</h1>
          <hr />

          <InputsContainer>
            <Form ref={formRef} onSubmit={handleCreate}>
              <section>
                <strong>Nome do modal</strong>
                <Input name="nome" type="text" />
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
                        imageModal={imageModal.url}
                        isSelected={imageModal.isSelected}
                      />
                    </button>
                  ))}
                </nav>
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
