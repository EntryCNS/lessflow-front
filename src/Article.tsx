import { json } from "express";
import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import TitleRect from "./components/TitleRect";

type sentence = { id: number; content: string; duration: number };
function getStartTime(sentences: Array<sentence>, item: sentence) {
  const idx = sentences.indexOf(item);

  let time = 0;
  for (let i = 0; i < idx; i++) {
    console.log(`${sentences[i].content}(${sentences[i].duration}초)`);
    time += sentences[i].duration;
  }

  return time;
}

function sumSentenceTime(sentences: Array<sentence>) {
  let time = 0;
  sentences.forEach((it) => (time += it.duration));
  return time;
}

const TIME_PADDING = 0.7;
const Article: React.FC<{
  news: {
    title: string;
    sentences: Array<sentence>;
  };
}> = ({ news }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const TIMEPADDING_FORFRAME = TIME_PADDING * videoConfig.fps;
  console.log(news.sentences);

  return (
    <>
      <div
        style={{
          flex: 1,
          height: "100%",
          position: "relative",
          backgroundImage:
            'url("https://file.miricanvas.com/user_image/2021/12/27/09/50/krgd1f6gwtwucopa/YRYMKDIBIVA7JIYKO3RRMPO64U.jpg")',
          backgroundColor: "rgba(0,0,0,0.5)",
          backgroundSize: "cover",
        }}
      >
        <div style={{ width: "100%", height: "70%" }}>
          {news.sentences.map((it) => {
            const next = news.sentences[news.sentences.indexOf(it) + 1] || {
              id: null,
              content: "",
              duration: 0,
            };
            return (
              <Sequence
                from={
                  TIMEPADDING_FORFRAME +
                  Math.round(getStartTime(news.sentences, it) * videoConfig.fps)
                }
                durationInFrames={Math.round(videoConfig.fps * it.duration)}
              >
                <div>
                  <h3
                    style={{
                      width: "80%",
                      fontSize: "55px",
                      marginTop: "100px",
                      marginLeft: "50px",
                      color: "white",
                      wordBreak: "keep-all",
                      fontWeight: "700",
                      //   textShadow: "0 0 5px #000",
                    }}
                  >
                    {it.content}
                  </h3>
                  <h4
                    style={{
                      width: "60%",
                      fontSize: "45px",
                      marginTop: "50px",
                      marginLeft: "50px",
                      color: "#ccc",
                      wordBreak: "keep-all",
                    }}
                  >
                    {next.content}
                  </h4>
                </div>
              </Sequence>
            );
          })}
        </div>
        <div
          style={{
            width: "100%",
            height: "28.5%",
            position: "relative",
          }}
        >
          <Sequence
            from={TIMEPADDING_FORFRAME}
            durationInFrames={Math.floor(
              videoConfig.fps * sumSentenceTime(news.sentences)
            )}
          >
            <TitleRect />
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
          </Sequence>
        </div>
        <div
          style={{
            width: "100%",
            height: "1.5%",
            backgroundColor: "violet",
            position: "relative",
          }}
        ></div>
      </div>
    </>
  );
};

export { sumSentenceTime, sentence, Article };
