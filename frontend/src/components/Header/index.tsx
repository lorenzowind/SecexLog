import React, { useState } from 'react';

import { Container } from './styles';

import SignInPopup from '../Popup/SignInPopup';

import logoTce from '../../assets/ManualSearch/logo-tce.png';

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const [signInPopupActive, setSignInPopupActive] = useState(false);

  return (
    <Container>
      {signInPopupActive && (
        <SignInPopup setSignInPopupActive={setSignInPopupActive} />
      )}

      <button type="button">Dê sua Opinião</button>

      <button type="button" onClick={() => setSignInPopupActive(true)}>
        Login
      </button>

      <img src={logoTce} alt="TCE" />
    </Container>
  );
};

export default Header;
