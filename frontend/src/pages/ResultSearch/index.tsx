import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useSearchResult } from '../../hooks/searchResult';

import { Container } from './styles';

import { Header, Menu } from '../../components';

const ResultSearch: React.FC = () => {
  const history = useHistory();

  const { searchResult } = useSearchResult();

  useEffect(() => {
    if (!searchResult.pathsResult) {
      history.push('/');
    }
  }, [history, searchResult]);

  return (
    <>
      <Header isAuthenticated={false} />

      <Menu isAuthenticated={false} />

      <Container />
    </>
  );
};

export default ResultSearch;
