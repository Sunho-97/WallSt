import ReactWordcloud from "react-wordcloud";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//워드클라우드 컴포넌트
function MyWordcloud(props) {
  const WordCloudDiv = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 20px;
  `;

  const size = [790, 500];
  const navi = useNavigate();
  let words = props.words;
  const callbacks = {
    getWordColor: (word) => (word.ratio > 0 ? "#F35A97" : "#10DE9E"),
    onWordClick: (word) => navi(word.url),
    getWordTooltip: (word) => `${word.value}`,
  };
  const options = {
    rotations: 1,
    fontFamily: "Noto",
    rotationAngles: [0, 0],
    fontSizes: [20, 100],
    enableTooltip: false,
  };

  return (
    <WordCloudDiv>
      <ReactWordcloud
        callbacks={callbacks}
        options={options}
        size={size}
        minSize={[400, 400]}
        words={words}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.20)",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </WordCloudDiv>
  );
}

export default MyWordcloud;
