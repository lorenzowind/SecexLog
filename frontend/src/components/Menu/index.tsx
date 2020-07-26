import React, { useState } from 'react';

import { ContainerClosed, ContainerOpened, Content } from './styles';

import Calendar from '../CalendarMenu';

import iconSecex from '../../assets/icon-secex.png';
import logoSecex from '../../assets/logo-secex-2.png';
import iconCrud from '../../assets/icon-crud.png';
import iconSettings from '../../assets/icon-settings.png';
import iconCalendar from '../../assets/icon-calendar-2.png';
import iconHistory from '../../assets/icon-history.png';
import iconBackup from '../../assets/icon-backup.png';
import iconReport from '../../assets/icon-report.png';
import iconOpinion from '../../assets/icon-opinion.png';
import iconHelp from '../../assets/icon-help.png';

const Menu: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      {isOpened ? (
        <ContainerOpened>
          <Content>
            <aside>
              <button
                type="button"
                onClick={() => {
                  setIsOpened(false);
                }}
              >
                <img src={logoSecex} alt="SecexLog" />
              </button>
            </aside>

            <nav>
              <button type="button">
                <img src={iconCrud} alt="Crud" />
                <strong>Cadastro</strong>
              </button>

              <button type="button">
                <img src={iconSettings} alt="Settings" />
                <strong>Configurações</strong>
              </button>

              <section>
                <nav>
                  <img src={iconCalendar} alt="Calendar" />
                  <strong>Calendário</strong>
                </nav>
                <Calendar />
              </section>
            </nav>

            <nav>
              <button type="button">
                <img src={iconHistory} alt="History" />
                <strong>Histórico de alterações</strong>
              </button>

              <button type="button">
                <img src={iconBackup} alt="Backup" />
                <strong>Backup e Restauração</strong>
              </button>

              <button type="button">
                <img src={iconReport} alt="Report" />
                <strong>Relatório</strong>
              </button>
            </nav>

            <nav>
              <button type="button">
                <img src={iconOpinion} alt="Opinion" />
                <strong>Dê sua opinião</strong>
              </button>

              <button type="button">
                <img src={iconHelp} alt="Help" />
                <strong>Ajuda</strong>
              </button>
            </nav>
          </Content>
        </ContainerOpened>
      ) : (
        <ContainerClosed>
          <Content>
            <aside>
              <button
                type="button"
                onClick={() => {
                  setIsOpened(true);
                }}
              >
                <img src={iconSecex} alt="Secex" />
              </button>
            </aside>

            <nav>
              <button type="button">
                <img src={iconCrud} alt="Crud" />
              </button>

              <button type="button">
                <img src={iconSettings} alt="Settings" />
              </button>

              <section>
                <img src={iconCalendar} alt="Calendar" />
              </section>
            </nav>

            <nav>
              <button type="button">
                <img src={iconHistory} alt="History" />
              </button>

              <button type="button">
                <img src={iconBackup} alt="Backup" />
              </button>

              <button type="button">
                <img src={iconReport} alt="Report" />
              </button>
            </nav>

            <nav>
              <button type="button">
                <img src={iconOpinion} alt="Opinion" />
              </button>

              <button type="button">
                <img src={iconHelp} alt="Help" />
              </button>
            </nav>
          </Content>
        </ContainerClosed>
      )}
    </>
  );
};

export default Menu;
