import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../utils/getValidationErrors';
import {
  getArrayModalImages,
  ModalImageState,
} from '../../../../utils/getArrayModalFiles';

import {
  useModal,
  ModalOperationsData,
  ModalState,
} from '../../../../hooks/modules/modal';

import Button from '../../../Button';
import Input from '../../../Input';
import ImageModal from '../../../ImageModal';
import RadioInput from '../../../RadioInput';
import LoadingPartial from '../../../Loading/LoadingPartial';

import { Background, FullContainer, Container, Content } from './styles';

import IconClose from '../../../../assets/icon-close.png';
import IconTrash from '../../../../assets/icon-trash.png';

interface ModalUpdatingPopupProps {
  modal: ModalState;
}

interface Props extends ModalUpdatingPopupProps {
  setModalUpdatingPopupActive(isActive: boolean): void;
}

const ModalUpdatingPopup: React.FC<Props> = ({
  modal,
  setModalUpdatingPopupActive,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [safeModal, setSafeModal] = useState(modal.is_safe ? 'Sim' : 'Não');
  const [cheapModal, setCheapModal] = useState(modal.is_cheap ? 'Sim' : 'Não');
  const [fastModal, setFastModal] = useState(modal.is_fast ? 'Sim' : 'Não');

  const [arrayModalImages, setArrayModalImages] = useState(() => {
    const auxArrayModalImages = getArrayModalImages();

    return auxArrayModalImages.reduce(
      (newArray: ModalImageState[], modalImage) => {
        newArray.push({
          isSelected: modalImage.name === modal.image,
          url: modalImage.url,
          name: modalImage.name,
        });
        return newArray;
      },
      [],
    );
  });

  const [loadingPartial, setLoadingPartial] = useState(false);

  const {
    initializeModalsPage,
    updateModal,
    removeModal,
    getModals,
  } = useModal();

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

  const handleRefreshModals = useCallback(async () => {
    await getModals(true).then(() => {
      setLoadingPartial(false);
      initializeModalsPage();
      setModalUpdatingPopupActive(false);
    });
  }, [getModals, setModalUpdatingPopupActive, initializeModalsPage]);

  const handleUpdateModal = useCallback(
    async (data: ModalOperationsData) => {
      try {
        setLoadingPartial(true);

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
          image: auxModalImage ? auxModalImage.url : '',
        };

        await updateModal(modal.id, modalData).then(() => {
          handleRefreshModals();
        });
      } catch (err) {
        setLoadingPartial(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [
      arrayModalImages,
      cheapModal,
      fastModal,
      handleRefreshModals,
      modal,
      safeModal,
      updateModal,
    ],
  );

  const handleDeleteModal = useCallback(async () => {
    await removeModal(modal.id).then(() => {
      handleRefreshModals();
    });
  }, [handleRefreshModals, modal.id, removeModal]);

  return (
    <>
      {loadingPartial && <LoadingPartial zIndex={4} />}

      <Background>
        <FullContainer>
          <Container>
            <Content>
              <button
                type="button"
                onClick={() => setModalUpdatingPopupActive(false)}
              >
                <img src={IconClose} alt="Close" />
              </button>

              <h1>Editar Modal</h1>

              <Form ref={formRef} onSubmit={handleUpdateModal}>
                <div>
                  <strong>Nome</strong>
                  <Input name="name" type="text" defaultValue={modal.name} />
                </div>

                <div>
                  <strong>Selecione ícone</strong>
                  <nav>
                    {arrayModalImages.map((imageModal, index) => (
                      <button
                        type="button"
                        key={imageModal.url}
                        onClick={() => handleClickModalImage(index)}
                      >
                        <ImageModal
                          imageSize={60}
                          imageModal={imageModal.url}
                          isSelected={imageModal.isSelected}
                        />
                      </button>
                    ))}
                  </nav>
                </div>

                <div>
                  <strong>Esse modal é seguro?</strong>
                  <section>
                    <RadioInput
                      name="is_safe"
                      defaultValue={safeModal}
                      options={['Sim', 'Não']}
                      onChangeValue={setSafeModal}
                    />
                  </section>
                </div>
                <div>
                  <strong>Esse modal é de baixo custo?</strong>
                  <section>
                    <RadioInput
                      name="is_cheap"
                      defaultValue={cheapModal}
                      options={['Sim', 'Não']}
                      onChangeValue={setCheapModal}
                    />
                  </section>
                </div>
                <div>
                  <strong>Esse modal é rápido?</strong>
                  <section>
                    <RadioInput
                      name="is_fast"
                      defaultValue={fastModal}
                      options={['Sim', 'Não']}
                      onChangeValue={setFastModal}
                    />
                  </section>
                </div>

                <nav>
                  <button type="button" onClick={handleDeleteModal}>
                    <img src={IconTrash} alt="Trash" />
                  </button>

                  <Button type="submit">Salvar</Button>
                </nav>
              </Form>
            </Content>
          </Container>
        </FullContainer>
      </Background>
    </>
  );
};

export default ModalUpdatingPopup;
