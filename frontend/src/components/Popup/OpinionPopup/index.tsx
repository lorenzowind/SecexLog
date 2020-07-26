import React from 'react';

import { Background, FullContainer, Container, Content } from './styles';

import Select from '../../Select';

import IconClose from '../../../assets/ManualSearch/icon-close.png';
import IconSend from '../../../assets/ManualSearch/icon-send.png';

interface Props {
  setOpinionPopupActive(isActive: boolean): void;
}

const OpinionPopup: React.FC<Props> = ({ setOpinionPopupActive }) => {
  return (
    <Background>
      <FullContainer>
        <Container>
          <Content>
            <button type="button" onClick={() => setOpinionPopupActive(false)}>
              <img src={IconClose} alt="Close" />
            </button>

            <strong>Dê sua opinião!</strong>

            <Select name="subject">
              <option value="0">Selecione um assunto</option>
            </Select>

            <textarea placeholder="Opinião..." />

            <button type="button">
              <img src={IconSend} alt="Send" />
            </button>
          </Content>
        </Container>
      </FullContainer>
    </Background>
  );
};

export default OpinionPopup;
