import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container } from './styles';

import SignInPopup from '../Popup/SignInPopup';
import OpinionPopup from '../Popup/OpinionPopup';
import ForgotPasswordPopup from '../Popup/ForgotPasswordPopup';

import logoTce from '../../assets/logo-tce.png';

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const [signInPopupActive, setSignInPopupActive] = useState(false);
  const [opinionPopupActive, setOpinionPopupActive] = useState(false);
  const [forgotPasswordPopupActive, setForgotPasswordPopupActive] = useState(
    false,
  );

  const { signOut } = useAuth();
  const { addToast } = useToast();

  const handleSignOut = useCallback(() => {
    signOut();
    addToast({
      type: 'success',
      title: 'Logout realizado com sucesso',
    });
  }, [addToast, signOut]);

  return (
    <>
      {opinionPopupActive && (
        <OpinionPopup setOpinionPopupActive={setOpinionPopupActive} />
      )}

      {signInPopupActive && (
        <SignInPopup
          setSignInPopupActive={setSignInPopupActive}
          setForgotPasswordPopupActive={setForgotPasswordPopupActive}
        />
      )}

      {forgotPasswordPopupActive && (
        <ForgotPasswordPopup
          setForgotPasswordPopupActive={setForgotPasswordPopupActive}
        />
      )}

      <Container>
        {!isAuthenticated ? (
          <>
            <button type="button" onClick={() => setOpinionPopupActive(true)}>
              Dê sua Opinião
            </button>

            <button type="button" onClick={() => setSignInPopupActive(true)}>
              Login
            </button>
          </>
        ) : (
          <>
            <button type="button">
              <Link to="dashboard">Dashboard</Link>
            </button>

            <button type="button" onClick={handleSignOut}>
              Logout
            </button>
          </>
        )}
        <img src={logoTce} alt="TCE" />
      </Container>
    </>
  );
};

export default Header;
