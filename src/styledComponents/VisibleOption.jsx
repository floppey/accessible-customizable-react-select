import styled, { css } from 'styled-components';

const VisibleOption = styled.option`
  ${({ active }) => css`
    background-color: ${active ? 'blue' : 'white'};
    color: ${active ? 'white' : 'black'};
  `} 
`;

export default VisibleOption;