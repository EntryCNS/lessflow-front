import React from "react";

const Title = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          right: 0,
          width: "40%",
          zIndex: 999,
        }}
      >
        <h1
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            fontSize: "50px",
            zIndex: 2,
            color: "white",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "34px",
                color: "#eee",
                position: "absolute",
                left: "65px",
                top: "50px",
              }}
            >
              lessf!ow 뉴스 | 연합뉴스 제공
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                right: "25px",
                top: "120px",
                textAlign: "center",
                wordBreak: "keep-all",
              }}
            >
              {news.title}
            </div>
          </div>
        </h1>
      </div>
    </>
  );
};

export default Title;
