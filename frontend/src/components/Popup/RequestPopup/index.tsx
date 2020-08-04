import React, { useCallback } from 'react';

import { Background, FullContainer, Container, Content } from './styles';

import Button from '../../Button';

import IconClose from '../../../assets/icon-close.png';

interface Props {
  setRequestPopupActive(isActive: boolean): void;
  handleFunctionToExecute(): Promise<void>;
  question: string;
}

const RequestPopup: React.FC<Props> = ({
  setRequestPopupActive,
  question,
  handleFunctionToExecute,
}) => {
  const handlePositiveAnswer = useCallback(() => {
    handleFunctionToExecute();
    setRequestPopupActive(false);
  }, [handleFunctionToExecute, setRequestPopupActive]);

  return (
    <Background>
      <FullContainer>
        <Container>
          <Content>
            <button type="button" onClick={() => setRequestPopupActive(false)}>
              <img src={IconClose} alt="Close" />
            </button>

            <strong>{question}</strong>

            <section>
              <button
                type="button"
                onClick={() => setRequestPopupActive(false)}
              >
                Cancelar
              </button>

              <Button type="button" onClick={handlePositiveAnswer}>
                Sim
              </Button>
            </section>
          </Content>
        </Container>
      </FullContainer>
    </Background>
  );
};

export default RequestPopup;
