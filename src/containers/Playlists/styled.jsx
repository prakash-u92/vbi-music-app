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

const AlbumInfo = styled.p`
  font-size: 16px;
  padding-right: 16px;
`;

const Text = styled.span``;
const Count = styled.span``;
const Label = styled.strong``;

const CreatedAt = styled.span`
  float: right;
`;

const PlaylistDetail = styled.div`
  width: 100%;
  height: 130px;
  position: relative;
  padding: 15px 30px 10px;
  display: inline-flex;
  box-shadow: 1px 1px 2px 0 rgb(0 0 0 / 10%);
`;

const PlaylistSongs = styled.div`
  left: 0;
  right: 0;
  top: 172px;
  width: 100%;
  bottom: 30px;
  overflow-y: auto;
  position: absolute;
  padding: 10px 30px 15px;
  background-color: #FFFFFF;
`;

const Prev = styled.div`
  width: 3%;
  height: 100%;
  display: inline-block;

  i {
    top: 3px;
    left: 6px;
    position: relative;
  }
`;

const Detail = styled.div`
  width: 95%;
  height: 100%;
  display: inline-flex;
`;

const Thumbnail = styled.div`
  height: 100%;
  display: inline-block;
`;

const PlaylistTitle = styled.div`
  height: 100%;
  padding-left: 10px;
  display: inline-block;
`;

const Title = styled.p`
  font-size: 16px;
  margin-bottom: 2px;

  i {
    margin: 4px;
    cursor: pointer;
  }
`;

const DescriptionContent = styled.div``;

const Content = styled.div`
  width: 50%;
  display: inline-block;
  ${props => props.delete && css`
    text-align: right;
  `};

  i {
    cursor: pointer;
  }
`;

const TitleEdit = styled.div`
  height: 25px;

  i {
    margin-left: 4px;
    font-size: 16px;
  }

  .label {
    line-height: 0;
  }

  input {
    height: 25px;
  }
`;

export {
  Prev,
  Title,
  Detail,
  Content,
  Thumbnail,
  TitleEdit,
  PlaylistSongs,
  PlaylistTitle,
  PlaylistDetail,
  DescriptionContent,
  View,
  Text,
  Count,
  Label,
  Slider,
  AlbumInfo,
  CreatedAt,
	ViewWrapper,
  ViewContainer,
  InputContainer,
  ResultContainer,
	SearchBarContainer
};
