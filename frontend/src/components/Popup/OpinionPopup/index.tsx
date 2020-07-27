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
            <Form ref={formRef} onSubmit={handleSend}>
              <button
                type="button"
                onClick={() => setOpinionPopupActive(false)}
              >
                <img src={IconClose} alt="Close" />
              </button>

              <strong>Dê sua opinião!</strong>
              <Select name="assunto" defaultValue="Selecione um assunto">
                <option value="Selecione um assunto" disabled>
                  Selecione um assunto
                </option>
                <option value="Sistema">Sistema</option>
                <option value="Cidades">Cidades</option>
                <option value="Modais">Modais</option>
                <option value="Prestador de serviços">
                  Prestador de serviços
                </option>
                <option value="Trajetos">Trajetos</option>
              </Select>

              <section>
                <Textarea name="opiniao" placeholder="Opinião..." />
              </section>

              <button type="submit">
                <img src={IconSend} alt="Send" />
              </button>
            </Form>
          </Content>
        </Container>
      </FullContainer>
    </Background>
  );
};

export default OpinionPopup;
