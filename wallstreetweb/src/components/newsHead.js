import React, { useState } from "react";
import styled from "styled-components";
import ModalComponent from "./modal";

function NewsHead(props) {
  const NewsHeadBlock = styled.div`
    margin: 10px;
    border-bottom: 1px solid #FFFFFF;
    padding-bottom: 5px;
    display: flex;
    flex-direction: row;
    color: #FFFFFF;
    filter: brightness(0.8);

    img {
      width: 150px;
      height: 100px;
      object-fit: contain; /* 이미지가 비율을 유지하며 컨테이너에 맞게 축소됩니다. */
    }

    h1 {
      margin-left: 20px;
      font-weight: bold;
      font-size: 20px;
      
    }

    p {
      margin-left: 20px;
      font-size: 16px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      
    }
    
    .content {
      display: flex;
      flex-direction: column;
    }

    .info {
      font-weight: bold;
      margin-left: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  `;

  const ImgDiv = styled.div`
    width: 150px;
    height: 100px;
    background-color: #000;
    display: flex;
    justify-content: center;
    flex-direction: column;
  `;
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <NewsHeadBlock>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ImgDiv>
          <img src={props.newsData.thumbnail_link} />
        </ImgDiv>
      </div>
      <div className="content">
        <h1 onClick={openModal}>{props.newsData.title}</h1>
        <ModalComponent
          img={props.newsData.thumbnail_link}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          title={props.newsData.title}
          newscom={props.newsData.press}
          date={props.newsData.date}
          content={props.newsData.content}
        />
        <p>{props.newsData.content}</p>
        <div className="info">
          <span>{props.newsData.press}</span>
          <span>{props.newsData.date}</span>
        </div>
      </div>
    </NewsHeadBlock>
  );
}

export default NewsHead;
