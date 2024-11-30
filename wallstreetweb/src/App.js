import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import News from "./routes/news";
import { useState, useEffect, useRef, memo } from "react";
import MyWordcloud from "./reactwordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import searchImg from "./scr_icon.png";
import RankingListComponent from "./components/RankingComponent";

//메인 페이지 컴포넌트
function App() {
  const navi = useNavigate();

  const search = (corpName) => {
    navi(`/news/${corpName}`);
  };

  const BackGround = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #0c1229;
    margin: 0;
    padding: 0;
    font-family: "NOTO";
    color: white;
  `;

  const HeaderDiv = styled.div`
    height: 6vh;
    background-color: #111834;
    width: 100%;
  `;

  const ContentDiv = styled.div`
    height: 94vh;
    display: flex;
    flex-direction: column;
    width: 70%;
  `;

  const Slogun = styled.div`
    font-size: 40px;
    margin-top: 2%;
    margin-left: 2%;
  `;
  const SearchContainer = styled.div`
    display: flex;
    height: 7vh;
    margin-top: 5%;
    margin-left: 2%;
  `;

  const SearchImg = styled.div`
    width: 5%;
    height: 5%;
  `;

  const SearchInput = styled.input`
    width: 53%;
    font-size: 18px;
    margin-right: 1%;
    margin-left: 1%; /* 검색 입력란과 버튼 사이 간격 */
    font-family: normal;
  `;

  const SearchButton = styled.div`
    padding: 10px;
    background-color: #0c1229;
    border: 1px white;
    color: white;
    font-size: 18px;
    cursor: pointer;
    font-family: "NOTO";
  `;

  const SearchLine = styled.div`
    margin-top: 1%;
    margin-bottom: 2%;
    width: 100%;
    height: 1vh;
    background: white;
  `;

  const SearchForm = styled.form`
    display: flex;
  `;

  const WordCloudAndRanking = styled.div`
    display: flex;
    min-height: 40%;
  `;

  const Ranking = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 40%;
    width: 40%;
    background-color: rgba(0, 0, 0, 0.2);
    margin-left: auto;
  `;

  const WordCloudContainer = styled.div`
    border-radius: 20px;
  `;

  const CircleButton = styled.button`
    width: 25px;
    height: 25px;
    border: none;
    border-radius: 50%;
    background-color: ${(props) => props.backgroundColor};
    color: #fff;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 10px;
    margin-top: 5px;
    margin-left: 15px;
  `;
  const ButtonContainer = styled.div`
    display: flex;
    margin-top: 5%;
  `;

  const [tabState, setTabState] = useState("economy");
  const [rankingData, setRankingData] = useState(null);
  const searchComp = useRef(null);
  const [rankingState, setRankingState] = useState("ratio");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const response = axios
      .get(`http://localhost:3001/${rankingState}`)
      .then((res) => {
        setRankingData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rankingState]);

  useEffect(() => {});
  const { data: companyData } = useQuery(["key1"], async () => {
    return axios.get(`http://localhost:3001/wordCloud`).then((res) => {
      const Values = [30, 20, 10, 5, 30, 20, 10, 5];

      const wordCloudData = res.data.map((item, index) => ({
        value: Values[index],
        text: item.NAME,
        url: "/news/" + item.NAME,
        ratio: item.ratio,
      }));
      return wordCloudData;
    });
  });

  return (
    <BackGround>
      <HeaderDiv>
        <Navbar data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/" style={{ color: "#f35a97" }}>
              WallSt
            </Navbar.Brand>
          </Container>
        </Navbar>
      </HeaderDiv>

      <ContentDiv>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Slogun>
                  <div>스마트하고 빠르게,</div>
                  <div>종목을 분석하고 찾아보는 Wallst</div>
                </Slogun>
                <SearchContainer>
                  <SearchImg>
                    <img
                      src={searchImg}
                      style={{ width: "100%", objectFit: "fill" }}
                    />
                  </SearchImg>
                  <SearchInput
                    type="text"
                    placeholder=" 찾고 싶은 기업 이름을 입력하세요"
                    ref={searchComp}
                  />
                  <SearchForm>
                    <SearchButton
                      type="submit"
                      onClick={() => {
                        {
                          const searchValue = searchComp.current?.value;
                          search(searchValue);
                        }
                      }}
                    >
                      검색
                    </SearchButton>
                  </SearchForm>
                </SearchContainer>
                <SearchLine />
                {/*비동기로 인해 변수가 넘어오지 않았을 때 오류 방지*/}
                {!isLoading && rankingData && companyData && (
                  <WordCloudAndRanking>
                    <WordCloudContainer>
                      <MyWordcloud
                        words={companyData}
                        setTabState={setTabState}
                      />
                    </WordCloudContainer>
                    <Ranking>
                      <RankingListComponent
                        rankingData={rankingData}
                        rankingState={rankingState}
                      />
                      <ButtonContainer>
                        <CircleButton
                          backgroundColor="#3498db"
                          onClick={() => {
                            setRankingState("ratio");
                          }}
                        ></CircleButton>
                        <CircleButton
                          backgroundColor="#e74c3c"
                          onClick={() => {
                            setRankingState("stock_today");
                          }}
                        ></CircleButton>
                        <CircleButton
                          backgroundColor="#27ae60"
                          onClick={() => {
                            setRankingState("market_cap");
                          }}
                        ></CircleButton>
                        <CircleButton
                          backgroundColor="#f1c40f"
                          onClick={() => {
                            setRankingState("trading_vol");
                          }}
                        ></CircleButton>
                      </ButtonContainer>
                    </Ranking>
                  </WordCloudAndRanking>
                )}
              </div>
            }
          ></Route>

          <Route
            path="/news/:companyName"
            element={<News companyData={companyData} />}
          ></Route>
        </Routes>
      </ContentDiv>
    </BackGround>
  );
}

export default App;
