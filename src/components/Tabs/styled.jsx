import styled, { css } from 'styled-components';

const TabContainer = styled.div`
  height: 40px;
  text-align: center;
`;

const TabWrapper = styled.div`
  width: 45%;
  height: 100%;
  margin: auto;
  font-size: 16px;
  font-weight: 600;
  line-height: 37px;
  border-radius: 4px;
  border: 1px solid #4a4a4a;
`;

const Tab = styled.div`
  width: 33.3%;
  height: 100%;
  cursor: pointer;
  display: inline-block;
  ${props => props.isCentered && css`
    border-left: 1px solid #4a4a4a;
    border-right: 1px solid #4a4a4a;
  `}
  ${props => props.selected && css`
    color: white;
    background-color: #103844;
  `};
`;

export { TabContainer, TabWrapper, Tab };