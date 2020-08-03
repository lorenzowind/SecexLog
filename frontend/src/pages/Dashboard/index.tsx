import React, { useEffect, useCallback, useState } from 'react';

import {
  getArrayModalIcons,
  ModalIconState,
} from '../../utils/getArrayModalFiles';

import { useModal } from '../../hooks/modules/modal';

import { Container, ModalIconsContainer, ModalIcon } from './styles';

import { Header, Menu, LoadingPartial } from '../../components';

const Dashboard: React.FC = () => {
  const [loadingPartial, setLoadingPartial] = useState(false);
  const [arrayModalIcons, setArrayModalIcons] = useState(getArrayModalIcons);

  const { modals, getModals } = useModal();

  const handleGetData = useCallback(async () => {
    setLoadingPartial(true);

    await getModals().then(() => {
      setLoadingPartial(false);
    });
  }, [getModals]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  useEffect(() => {
    setArrayModalIcons(state =>
      state.map(modalIcon => {
        const newCount = modals.reduce((count, modal) => {
          if (modal.imgUrl === modalIcon.equalImageUrl) {
            // eslint-disable-next-line no-param-reassign
            count += 1;
          }
          return count;
        }, 0);

        return {
          color: modalIcon.color,
          equalImageUrl: modalIcon.equalImageUrl,
          name: modalIcon.name,
          url: modalIcon.url,
          count: newCount,
        };
      }),
    );
  }, [modals]);

  return (
    <>
      {loadingPartial && <LoadingPartial zIndex={1} />}

      <Header isAuthenticated />

      <Menu />

      <Container>
        <ModalIconsContainer>
          {arrayModalIcons.map(modalIcon => (
            <ModalIcon key={modalIcon.name} color={modalIcon.color}>
              <img src={modalIcon.url} alt="Modal Icon" />
              <h1>{modalIcon.count}</h1>
              <strong>{modalIcon.name}</strong>
            </ModalIcon>
          ))}
        </ModalIconsContainer>
      </Container>
    </>
  );
};

export default Dashboard;
