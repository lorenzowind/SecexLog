import styled from 'styled-components';

import iconBack from '../../assets/icon-back-2.png';
import iconNext from '../../assets/icon-next.png';

export const Container = styled.div`
  .DayPicker-Weekday {
    color: #fff;
  }

  .DayPicker-Day {
    color: #fff;
  }

  .DayPicker-Day--today {
    background-color: #ffffff;
    color: #7e46f8;
  }

  .DayPicker-Day--outside {
    background-color: transparent;
  }

  .DayPicker-Caption {
    color: #fff;
  }

  .DayPicker-NavButton--prev {
    background-image: url(${iconBack});
  }

  .DayPicker-NavButton--next {
    background-image: url(${iconNext});
  }
`;
