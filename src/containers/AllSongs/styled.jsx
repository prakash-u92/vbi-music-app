import styled, { css } from 'styled-components';

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  text-align: center;
  box-shadow: 1px 1px 2px 0 rgb(0 0 0 / 10%);
`;

const SearchBarContainer = styled.div`
  width: 75%;
  text-align: right;
`;

const ViewContainer = styled.div`
  width: 25%;
  display: flex;
  padding: 0 6px;
  position: relative;
  text-align: center;
`;

const ViewWrapper = styled.div`
  width: 45%;
  height: 90%;
  border-radius: 3px;
  position: relative;
  border: 1px solid #4a4a4a;
`;

const View = styled.div`
  width: 50%;
  height: 100%;
  cursor: pointer;
  line-height: 28px;
  position: relative;
  display: inline-block;
  ${props => props.selected && css`
    color: white;
    background-color: #103844;
  `};
`;

const ResultContainer = styled.div`
  left: 0;
  right: 0;
  top: 100px;
  width: 100%;
  bottom: 30px;
  overflow-y: auto;
  position: absolute;
  padding: 10px 30px 15px;
  background-color: #FFFFFF;
`;

const Slider = styled.div`
  width: 45%;
  display: inline-block;
  vertical-align: middle;
  height: 100%;

  input {
    height: 100%;
  }
`;

export {
  View,
  Slider,
	ViewWrapper,
  ViewContainer,
  InputContainer,
  ResultContainer,
	SearchBarContainer
};
