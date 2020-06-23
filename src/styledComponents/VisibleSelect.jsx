import styled, { css } from 'styled-components';
import VisibleOption from './VisibleOption';

const ScreenReaderOnly = styled.div`
  border: 1px solid black;

  ${VisibleOption} {
    ${({ open }) => css`
      display: ${open ? 'block' : 'none'};
    `}
  }
`;

export default ScreenReaderOnly;