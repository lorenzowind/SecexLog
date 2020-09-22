import React, { useEffect, useCallback, useState } from 'react';

import { getArrayModalIcons } from '../../utils/getArrayModalFiles';
import { titlesOpinion } from '../../utils/titlesOpinion';

import { useModal } from '../../hooks/modules/modal';
import { useOpinion } from '../../hooks/opinion';

import {
  Container,
  ModalIconsContainer,
  ModalIcon,
  FeedbacksContainer,
  Feedbacks,
  ProgressBarsContainer,
} from './styles';

import {
  Header,
  Menu,
  LoadingPartial,
  ProgressBar,
  RequestPopup,
} from '../../components';

interface MessageData {
  id: string;
  message: string;
}

interface FeedbacksData {
  title: string;
  titleColor: string;
  messages: MessageData[];
}

const Dashboard: React.FC = () => {
  const [loadingPartial, setLoadingPartial] = useState(false);

  const [arrayModalIcons, setArrayModalIcons] = useState(getArrayModalIcons);
  const [arrayFeedbacks, setArrayFeedbacks] = useState<FeedbacksData[]>([]);

  const [requestPopupActive, setRequestPopupActive] = useState(false);
  const [answerId, setAnswerId] = useState('');

  const { modals, getModals } = useModal();
  const { opinions, getOpinions, removeOpinion } = useOpinion();

  const handleGetData = useCallback(async () => {
    setLoadingPartial(true);

    await Promise.all([getModals(''), getOpinions()]).then(() => {
      setLoadingPartial(false);
    });
  }, [getModals, getOpinions]);

  const handleRefreshOpinions = useCallback(async () => {
    await getOpinions().then(() => {
      setLoadingPartial(false);
    });
  }, [getOpinions]);

  const handleDeleteOpinion = useCallback(async () => {
    await removeOpinion(answerId).then(() => {
      handleRefreshOpinions();
      setAnswerId('');
    });
  }, [answerId, handleRefreshOpinions, removeOpinion]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  useEffect(() => {
    setArrayFeedbacks(() =>
      titlesOpinion.map(title => {
        return {
          title: title.name,
          titleColor: title.color,
          messages: opinions.reduce((newArray: MessageData[], opinion) => {
            if (opinion.title === title.name) {
              newArray.push({
                id: opinion.id,
                message: opinion.description,
              });
            }
            return newArray;
          }, []),
        };
      }),
    );
  }, [opinions]);

  useEffect(() => {
    setArrayModalIcons(state =>
      state.map(modalIcon => {
        const newCount = modals.reduce((count, modal) => {
          if (modal.image === modalIcon.name) {
            // eslint-disable-next-line no-param-reassign
            count += 1;
          }
          return count;
        }, 0);

        return {
          color: modalIcon.color,
          equalImageUrl: modalIcon.equalImageUrl,
          name: modalIcon.name,
          url: modalIcon.url,
          count: newCount,
        };
      }),
    );
  }, [modals]);

  return (
    <>
      {requestPopupActive && (
        <RequestPopup
          setRequestPopupActive={setRequestPopupActive}
          handleFunctionToExecute={handleDeleteOpinion}
          question="Deseja remover este feedback?"
        />
      )}

      {loadingPartial && <LoadingPartial zIndex={1} />}

      <Header isAuthenticated />

      <Menu isAuthenticated />

      <Container>
        <ModalIconsContainer>
          {arrayModalIcons.map(modalIcon => (
            <ModalIcon key={modalIcon.name} color={modalIcon.color}>
              <img src={modalIcon.url} alt="Modal Icon" />
              <h1>{modalIcon.count}</h1>
              <strong>{modalIcon.name}</strong>
            </ModalIcon>
          ))}
        </ModalIconsContainer>

        <nav>
          <FeedbacksContainer>
            <h1>Feedback</h1>
            <hr />
            {opinions.length ? (
              arrayFeedbacks.map(feedbacks => (
                <Feedbacks key={feedbacks.title} color={feedbacks.titleColor}>
                  {feedbacks.messages.length ? (
                    <>
                      <h2>{feedbacks.title}</h2>
                      {feedbacks.messages.map(feedback => (
                        <section key={feedback.message}>
                          <button
                            type="button"
                            onClick={() => {
                              setAnswerId(feedback.id);
                              setRequestPopupActive(true);
                            }}
                          >
                            <h3>X</h3>
                          </button>
                          <strong>{feedback.message}</strong>
                        </section>
                      ))}
                    </>
                  ) : null}
                </Feedbacks>
              ))
            ) : (
              <h2>Nenhum feedback no momento</h2>
            )}
          </FeedbacksContainer>

          <ProgressBarsContainer>
            {arrayModalIcons.map(modalIcon => (
              <section key={`progress-${modalIcon.name}`}>
                <ProgressBar
                  percent={Number(
                    ((modalIcon.count / modals.length) * 100).toFixed(2),
                  )}
                  color={modalIcon.color}
                />
                <h1>{modalIcon.name}</h1>
              </section>
            ))}
          </ProgressBarsContainer>
        </nav>
      </Container>
    </>
  );
};

export default Dashboard;
