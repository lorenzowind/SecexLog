import styled from 'styled-components';

interface Props {
  percent: number;
  color: string;
}

export const Container = styled.div<Props>`
  position: relative;

  .ui.progress .bar {
    background: ${props => props.color};
  }

  .ui.progress .bar > .progress {
    margin-top: -40px;
    margin-right: -15px;
    background: ${props => props.color};
    padding: 3px;
    border-radius: 6px;
  }
`;

export const Span = styled.span<Props>`
  position: absolute;
  border-style: solid;
  border-color: ${props => props.color} transparent;
  border-width: 6px 6px 0 6px;
  margin-top: -35px;
  top: 100%;
  left: ${props => (props.percent > 7 ? props.percent : 7)}%;
  transform: translate(-50%);
`;
