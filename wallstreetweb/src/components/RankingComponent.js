import styled from "styled-components";

const RankingHr = styled.div`
  margin-top: 1%;
  margin-bottom: 5%;
  width: 90%;
  height: 1%;
  background: white;
`;

//메인 페이지의 랭킹 컴포넌트
function RankingListComponent(props) {
  if (props.rankingState === "ratio") {
    return (
      <div>
        <h2 style={{ marginTop: "3%", textAlign: "center" }}>등락률 TOP 8</h2>
        <RankingHr />
        {props.rankingData.map((n, index) => (
          <table key={index} style={{ textAlign: "left", border: "none" }}>
            <tr>
              <td>{n.NAME}</td>
              <td>{n.stock_today} ₩</td>
              <td style={{ color: n.diff < 0 ? "#10DE9E" : "#F35A97" }}>
                {n.diff < 0 ? "▼ " + n.diff : "▲ " + n.diff}
              </td>
              <td style={{ color: n.ratio < 0 ? "#10DE9E" : "#F35A97" }}>
                {n.ratio < 0 ? "▼ " + n.ratio : "▲ " + n.ratio} %
              </td>
            </tr>
          </table>
        ))}
      </div>
    );
  }
  if (props.rankingState === "stock_today") {
    return (
      <div>
        <h2 style={{ marginTop: "3%", textAlign: "center" }}>현재가 TOP 8</h2>
        <RankingHr />
        {props.rankingData.map((n, index) => (
          <table key={index} style={{ textAlign: "left", border: "none" }}>
            <tr>
              <td>{n.NAME}</td>
              <td>{n.stock_today} ₩</td>
              <td style={{ color: n.diff < 0 ? "#10DE9E" : "#F35A97" }}>
                {n.diff < 0 ? "▼ " + n.diff : "▲ " + n.diff}
              </td>
              <td style={{ color: n.ratio < 0 ? "#10DE9E" : "#F35A97" }}>
                {n.ratio < 0 ? "▼ " + n.ratio : "▲ " + n.ratio} %
              </td>
            </tr>
          </table>
        ))}
      </div>
    );
  }
  if (props.rankingState === "market_cap") {
    return (
      <div>
        <h2 style={{ marginTop: "3%", textAlign: "center" }}>시가총액 TOP 8</h2>
        <RankingHr />
        {props.rankingData.map((n, index) => (
          <table key={index} style={{ textAlign: "left", border: "none" }}>
            <tr>
              <td>{n.NAME}</td>
              <td>{n.market_cap} 억</td>
              <td>{n.stock_today} </td>
              <td style={{ color: n.ratio < 0 ? "#10DE9E" : "#F35A97" }}>
                {n.ratio < 0 ? "▼ " + n.ratio : "▲ " + n.ratio} %
              </td>
            </tr>
          </table>
        ))}
      </div>
    );
  }
  if (props.rankingState === "trading_vol") {
    return (
      <div>
        <h2 style={{ marginTop: "3%", textAlign: "center" }}>거래량 TOP 8</h2>
        <RankingHr />
        {props.rankingData.map((n, index) => (
          <table key={index} style={{ textAlign: "left", border: "none" }}>
            <tr>
              <td>{n.NAME}</td>
              <td>{n.trading_vol} 개</td>
              <td>{n.stock_today} ₩</td>
              <td style={{ color: n.ratio < 0 ? "#10DE9E" : "#F35A97" }}>
                {n.ratio < 0 ? "▼ " + n.ratio : "▲ " + n.ratio} %
              </td>
            </tr>
          </table>
        ))}
      </div>
    );
  }
}

export default RankingListComponent;
