import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useSearchResult } from '../../hooks/searchResult';

import {
  Header,
  Container,
  Content,
  Top,
  FilterSection,
  ModalsImages,
  PathCard,
  PathSelectionContainer,
} from './styles';

import { Menu, Button } from '../../components';

import logoTce from '../../assets/logo-tce.png';
import iconBack from '../../assets/icon-back-3.png';
import progressBar from '../../assets/progressBar-2.png';
import fastFilter from '../../assets/image-filter-fast.png';
import costFilter from '../../assets/image-filter-cost.png';
import safetyFilter from '../../assets/image-filter-safety.png';
import pathRepresentation from '../../assets/path-representation.png';

const ResultSearch: React.FC = () => {
  const history = useHistory();

  const { searchResult } = useSearchResult();

  useEffect(() => {
    if (!searchResult.pathsResult) {
      history.goBack();
    }
  }, [history, searchResult]);

  return (
    <>
      <Header>
        <img src={logoTce} alt="TCE" />
      </Header>

      <Menu isAuthenticated={false} />

      {searchResult.pathsResult && (
        <Container>
          <Content>
            <Top>
              <button type="button">
                <img src={iconBack} alt="Back" />
              </button>

              <div>
                <strong>Escolha modal para o trecho</strong>
                <img src={progressBar} alt="Progress Bar" />
              </div>
            </Top>

            <FilterSection>
              <nav>
                <button type="button">
                  <img src={fastFilter} alt="Fast Filter" />
                </button>
                <button type="button">
                  <img src={costFilter} alt="Cost Filter" />
                </button>
                <button type="button">
                  <img src={safetyFilter} alt="Safety Filter" />
                </button>
              </nav>
              <strong>{searchResult.initialCity}</strong>
              <strong>{searchResult.finalCity.join(', ')}</strong>
              <strong>
                {`${searchResult.initialDate.toLocaleString().split(' ')[0]} -
                ${searchResult.finalDate.toLocaleString().split(' ')[0]}`}
              </strong>
            </FilterSection>

            {searchResult.pathsResult.map(pathCard => (
              <section>
                <ModalsImages>
                  {pathCard.modalsImages.map(modalImage => (
                    <img src={modalImage} alt="Modal" />
                  ))}
                </ModalsImages>

                <PathCard>
                  <section>
                    {pathCard.paths.map(path => (
                      <aside>
                        <div>
                          <strong>
                            {`${path.selectedPeriod.selectedInitTime}, ${path.selectedPeriod.selectedInitWeekDay}`}
                          </strong>
                          <h2>{path.initCidade}</h2>
                          <h2>{path.modal}</h2>
                        </div>
                        <div>
                          <h2>{path.duration}</h2>
                          <img src={pathRepresentation} alt="Path" />
                        </div>
                        <div>
                          <strong>
                            {`${path.selectedPeriod.selectedFinalTime}, ${path.selectedPeriod.selectedFinalWeekDay}`}
                          </strong>
                          <h2>{path.endCidade}</h2>
                          <h2>{path.modal}</h2>
                        </div>
                      </aside>
                    ))}

                    <h3>
                      {`Saída: ${
                        pathCard.initialDate.toLocaleString().split(' ')[0]
                      } - Retorno: ${
                        pathCard.finalDate.toLocaleString().split(' ')[0]
                      }`}
                    </h3>
                  </section>

                  <PathSelectionContainer>
                    <strong>{`R$ ${pathCard.price}`}</strong>
                    <h1>{`${pathCard.utilDays} dias utéis`}</h1>

                    <Button type="button">Selecionar</Button>
                  </PathSelectionContainer>
                </PathCard>
              </section>
            ))}
          </Content>
        </Container>
      )}
    </>
  );
};

export default ResultSearch;
