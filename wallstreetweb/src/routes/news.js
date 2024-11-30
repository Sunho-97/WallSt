import "./news.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BoxTemplate from "../components/box";
import NewsHead from "../components/newsHead";
import Companyinfo from "../components/company";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

//전체 뉴스 컴포넌트
function News(props) {
  const { companyName } = useParams();

  const navi = useNavigate();

  const PaginationBox = styled.div`
    // 페이지네이션을 포함한 박스
    display: flex;
    flex-direction: column;
  `;

  const NotFoundBox = styled.div`
    text-align: center;
    background-color: #0c1229;
    margin-top: 25%;
  `;
  const NotFoundBoxH1 = styled.h1`
    margin: 10px;
    color: white;
    font-family: "NOTO";
    padding: 5px;
  `;

  const NotFoundBoxH3 = styled.h3`
    display: flex;
    margin: 10px;
    color: white;
    font-family: "NOTO";
    justify-content: center;
  `;

  const GoBackButton = styled.button`
    text-align: center;
    background-color: #0c1229;
    border: 3px solid white;
    border-radius: 5px;
    width: 13vw;
  `;

  const [newsData, setNewsData] = useState([]);
  const [corpData, setCorpData] = useState();
  const [dataSuccess, setDataSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // axios에서 정보를 받아오고 랜더링하기 위한 상태 state
  const [error, setError] = useState(null); // 에러발생시 에러를 저장할 수 있는 state

  useEffect(() => {
    // 데이터를 비동기로 가져옵니다.
    setLoading(true);
    fetchNewsData(); // 데이터 가져오는 함수 호출
    async function fetchNewsData() {
      try {
        const response = await axios.get(
          `http://localhost:3001/news/${companyName}`
        );
        if (response.data.news.length === 0) {
          throw new Error("에러");
        }
        setDataSuccess(true);
        setLoading(false);
        setNewsData(response.data.news);
        setCorpData(response.data.company);
      } catch (error) {
        setLoading(false);
        setError(error);
        setDataSuccess(false);
      }
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const handleChange = (e, value) => {
    setCurrentPage(value);
  };

  const newsPerPage = 3;
  const currentPageLast = currentPage * newsPerPage; // 현재 페이지의 처음
  const currentPageFirst = currentPageLast - newsPerPage; // 현재 페이지의 끝
  const currentNews = newsData.slice(currentPageFirst, currentPageLast); // 배열의 begin부터 end까지의 얕은 복사본
  const pageNumber = Math.ceil(newsData.length / newsPerPage); // 총 페이지 수(올림)

  if (loading)
    return (
      <NotFoundBox>
        <NotFoundBoxH1>기업 정보를 받아오는 중입니다.....</NotFoundBoxH1>
      </NotFoundBox>
    );
  if (error)
    return (
      <div style={{ textAlign: "center" }}>
        <NotFoundBox>
          <NotFoundBoxH1>
            기업이 존재하지 않습니다. 정확한 기업명을 입력해 주세요.
          </NotFoundBoxH1>
        </NotFoundBox>
        <GoBackButton
          onClick={() => {
            navi(-1);
          }}
        >
          <NotFoundBoxH3>이전 페이지</NotFoundBoxH3>
        </GoBackButton>
      </div>
    );
  return (
    <div className="main">
      {dataSuccess && (
        <BoxTemplate>
          <Companyinfo companyData={corpData} />
        </BoxTemplate>
      )}
      <PaginationBox>
        {dataSuccess ? (
          <div>
            <BoxTemplate>
              {currentNews &&
                currentNews.map((n) => {
                  return (
                    <NewsHead
                      key={n.toString()}
                      newsData={n}
                      companyName={n.companyName}
                    />
                  );
                })}
            </BoxTemplate>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Stack spacing={2}>
                <Pagination
                  count={pageNumber}
                  page={currentPage}
                  color="primary"
                  showFirstButton
                  showLastButton
                  onChange={handleChange}
                  style={{ color: "white" }}
                />
              </Stack>
            </div>
          </div>
        ) : null}
      </PaginationBox>
    </div>
  );
}

export default News;
