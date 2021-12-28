import { json } from "express";
import { useEffect } from "react";
import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import TitleRect from "./components/TitleRect";
import data from "./newsData";
import { videoFrameDuration } from "./Video";

type sentence = { id: number; content: string; duration: number };
function getStartTime(sentences: Array<sentence>, item: sentence) {
  const idx = sentences.indexOf(item);

  let time = 0;
  for (let i = 0; i < idx; i++) {
    //console.log(`${sentences[i].content}(${sentences[i].duration}초)`);
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
    provider: string;
    backgroundImage: string;
    sentences: Array<sentence>;
  },
  beforeDurationFrame: number
}> = ({ beforeDurationFrame, news }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const TIMEPADDING_FORFRAME = TIME_PADDING * videoConfig.fps;
  //console.log(news.sentences);

  useEffect(() => {
    //console.log(`frame: ${beforeDurationFrame + frame} / max: ${videoFrameDuration}\n${(beforeDurationFrame + frame) / videoFrameDuration}`)
    console.log(`start: ${beforeDurationFrame} / frame: ${frame} / cur: ${beforeDurationFrame + frame} / max: ${videoFrameDuration}\n${(beforeDurationFrame + frame) / videoFrameDuration}`)
  })

  return (
    <>
      <div style={{
        flex: 1,
        height: "100%",
        position: "relative",
        backgroundImage:
          `url("${news.backgroundImage}")`,
        backgroundSize: "cover",
      }}>
        <div
          style={{
            flex: 1,
            height: "100%",
            position: "relative",
            backgroundColor: "rgba(0,0,0,0.65)",
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
              height: "29%",
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
                      lessf!ow 뉴스 | {news.provider} 제공
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
              height: "1%",
              backgroundColor: "rgba(0, 0, 0, 0.25)",
              position: "relative",
            }}
          >
            <div style={{ 
              height: "100%",
              width: `${(beforeDurationFrame + frame) / videoFrameDuration * 100}%`,
              backgroundColor: "#3e5aec"
            }} />
          </div>
        </div>
      </div>
    </>
  );
};

export { sumSentenceTime, sentence, Article };
