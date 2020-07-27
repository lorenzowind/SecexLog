import React from 'react';

import { Background, FullContainer, Container, Content } from './styles';

import Button from '../../Button';

import IconClose from '../../../assets/icon-close.png';

interface Props {
  setNotReadyPopupActive(isActive: boolean): void;
}

const NotReadyPopup: React.FC<Props> = ({ setNotReadyPopupActive }) => {
  return (
    <Background>
      <FullContainer>
        <Container>
          <Content>
            <button type="button" onClick={() => setNotReadyPopupActive(false)}>
              <img src={IconClose} alt="Close" />
            </button>

            <strong>Funcionalidade ainda não desenvolvida!</strong>

            <Button type="button" onClick={() => setNotReadyPopupActive(false)}>
              OK
            </Button>
          </Content>
        </Container>
      </FullContainer>
    </Background>
  );
};

export default NotReadyPopup;
