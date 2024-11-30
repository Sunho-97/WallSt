import React from "react";
import styled from "styled-components";
import scorebar from "./scorebar.png";
import choice from "./choice.png";

//기업 정보 컴포넌트
const CompanyBlock = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "Noto";
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #ffffff;

  .title {
    display: flex;
    flex-direction: row;
  }

  .stockinfo {
    display: flex;
    flex-direction: row;
    color: white;
  }

  .score {
    display: flex;
    flex-direction: column;
  }

  .stock {
    display: flex;
    flex-direction: row;
  }

  .stock #diff {
    font-size: 20px;
    margin-left: 10px;
    margin-top: 10px;
    text-align: center;
    justify-content: center;
  }

  .stock #stocktoday {
    color: white;
  }

  h1 #stockname {
    font-size: 30px;
    color: #343a40;
    text-align: center;
    font-weight: bold;
  }

  .stockinfo .stock {
    text-align: center;
    justify-content: center;
  }

  .scorebar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .scorebar #tri {
    position: absolute;
    left: 6%; //1번
    //left: 26%; //2번
    //left: 45%; //3번
    //left: 64.5%; //4번
    //left: 84.5%; //5번
    top: 27px;
  }
`;

function Companyinfo(props) {
  function getTriMarginComment() {
    const triMargin = props.companyData[0].total_score;
    if (triMargin >= 80) {
      return "해당 종목에 투자는 매우 좋은 선택입니다.";
    }
    if (triMargin >= 60) {
      return "해당 종목에 투자를 권장합니다.";
    }
    if (triMargin >= 40) {
      return "해당 종목에 투자를 다시 고려해보세요.";
    }
    if (triMargin >= 20) {
      return "해당 종목에 투자는 권장하지 않습니다.";
    }
    if (triMargin >= 0) {
      return "해당 종목에 투자는 매우 위험합니다.";
    }
  }

  function getTriMargin() {
    const triMargin = props.companyData[0].total_score;
    if (triMargin >= 80) {
      return "84.5%";
    }
    if (triMargin >= 60) {
      return "64.5%";
    }
    if (triMargin >= 40) {
      return "45%";
    }
    if (triMargin >= 20) {
      return "26%";
    }
    if (triMargin >= 0) {
      return "6%";
    }
  }

  const CompanyBlock = styled.div`
    display: flex;
    flex-direction: row;
    font-family: "Noto";
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid #ffffff;

    .title {
      display: flex;
      flex-direction: row;
    }

    .stockinfo {
      display: flex;
      flex-direction: row;
      color: white;
    }

    .score {
      display: flex;
      flex-direction: column;
    }

    .stock {
      display: flex;
      flex-direction: row;
    }

    .stock #diff {
      font-size: 20px;
      margin-left: 10px;
      margin-top: 10px;
      text-align: center;
      justify-content: center;
    }

    .stock #stocktoday {
      color: white;
    }

    h1 #stockname {
      font-size: 30px;
      color: #343a40;
      text-align: center;
      font-weight: bold;
    }

    .stockinfo .stock {
      text-align: center;
      justify-content: center;
    }

    .scorebar {
      position: absolute;
      top: 50%; /* 세로 중앙 정렬을 위해 화면 상단에서 50% 위치로 이동 */
      left: 50%; /* 가로 중앙 정렬을 위해 화면 왼쪽에서 50% 위치로 이동 */
      transform: translate(
        -50%,
        -50%
      ); /* 요소의 중심을 기준으로 이동하여 정확한 가운데 정렬 */
    }
  `;

  function ratioColor() {
    if (props.companyData[0].ratio <= 0) {
      return "#10DE9E";
    }
    if (props.companyData[0].ratio > 0) {
      return "#F35A97";
    }
  }

  return (
    props.companyData && (
      <CompanyBlock>
        <div className="company">
          <p id="stockid">{props.companyData[0].stock_code} | KOSPI</p>
          <h1 id="stockname">{props.companyData[0].name}</h1>
          <div className="stock">
            <h1 id="stocktoday" style={{ color: ratioColor() }}>
              {props.companyData[0].stock_today}
            </h1>
            <p id="diff" style={{ color: ratioColor() }}>
              {props.companyData[0].ratio >= 0
                ? "▲ " + props.companyData[0].ratio
                : "▼ " + props.companyData[0].ratio}
              {" % "}
              <span style={{ color: "white" }}>|</span>{" "}
              {props.companyData[0].ratio >= 0
                ? " ▲ " + props.companyData[0].diff
                : " ▼ " + props.companyData[0].diff}{" "}
            </p>
          </div>
        </div>
        <div className="scorebar" style={{ position: "absolute" }}>
          <img src={scorebar} id="bar" style={{ left: getTriMargin() }}></img>
          <img
            src={choice}
            id="tri"
            style={{ position: "absolute", left: getTriMargin(), top: "29%" }}
          ></img>
          <p id="comment" style={{ textAlign: "center" }}>
            {getTriMarginComment()}
          </p>
        </div>
        <div className="stockinfo">
          <div className="score">
            <h3>재무점수 | {props.companyData[0].finance_score} / 30</h3>
            <h3>최근점수 | {props.companyData[0].recen_score} / 35 </h3>
            <h3>총 점수 | {props.companyData[0].total_score} / 100</h3>
          </div>
        </div>
      </CompanyBlock>
    )
  );
}

export default Companyinfo;
