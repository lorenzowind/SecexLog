import React, { useState } from 'react';

import { Container } from './styles';

import SignInPopup from '../Popup/SignInPopup';
import OpinionPopup from '../Popup/OpinionPopup';

import logoTce from '../../assets/ManualSearch/logo-tce.png';

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const [signInPopupActive, setSignInPopupActive] = useState(false);
  const [opinionPopupActive, setOpinionPopupActive] = useState(false);

  return (
    <>
      {opinionPopupActive && (
        <OpinionPopup setOpinionPopupActive={setOpinionPopupActive} />
      )}

      {signInPopupActive && (
        <SignInPopup setSignInPopupActive={setSignInPopupActive} />
      )}

      <Container>
        <button type="button" onClick={() => setOpinionPopupActive(true)}>
          Dê sua Opinião
        </button>

        <button type="button" onClick={() => setSignInPopupActive(true)}>
          Login
        </button>

        <img src={logoTce} alt="TCE" />
      </Container>
    </>
  );
};

export default Header;
