import React from "react";
import styled from "styled-components";

const BoxBlock = styled.div`
  position: relative;
  background-color: rgba(128, 128, 128, 0);

  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

function BoxTemplate({ children }) {
  return <BoxBlock>{children}</BoxBlock>;
}

export default BoxTemplate;
