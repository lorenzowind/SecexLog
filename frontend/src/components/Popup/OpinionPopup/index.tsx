import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Background, FullContainer, Container, Content } from './styles';

import Select from '../../Select';
import Textarea from '../../Textarea';

import IconClose from '../../../assets/icon-close.png';
import IconSend from '../../../assets/icon-send.png';

interface Props {
  setOpinionPopupActive(isActive: boolean): void;
}

const OpinionPopup: React.FC<Props> = ({ setOpinionPopupActive }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSend = useCallback(() => {
    console.log('Working...');
  }, []);

  return (
    <Background>
      <FullContainer>
        <Container>
          <Content>
            <button type="button" onClick={() => setOpinionPopupActive(false)}>
              <img src={IconClose} alt="Close" />
            </button>

            <strong>Dê sua opinião!</strong>

            <Select>
              <option value="0">Selecione um assunto</option>
              <option value="1">Sistema</option>
              <option value="2">Cidades</option>
              <option value="3">Modais</option>
              <option value="4">Prestador de serviços</option>
              <option value="5">Trajetos</option>
            </Select>

            <Form ref={formRef} onSubmit={handleSend}>
              <Textarea name="opinion" placeholder="Opinião..." />
            </Form>

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
