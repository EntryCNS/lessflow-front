import { Composition } from "remotion";
import { Article, sumSentenceTime } from "./Article";
import data from "./newsData";

const frame = 30;

const newsTimeMap = new Map<string, number>();
const newsBeforeFrameMap = new Map<string, number>()
let allDurationTmp = 0
const timePadding = 1.5

data.forEach((news) => {
  newsTimeMap.set(news.title, sumSentenceTime(news.sentences));
  newsBeforeFrameMap.set(news.title, allDurationTmp)
  allDurationTmp += Math.floor((newsTimeMap.get(news.title)!! + timePadding) * 30)
});

const videoFrameDuration = allDurationTmp
export { videoFrameDuration }

export const RemotionVideo: React.FC = () => {
  return (
    <>
      {data.map((news) => {
        return (
          <Composition
            id={`article${data.indexOf(news) + 1}`}
            component={Article}
            durationInFrames={Math.floor(
              frame * (newsTimeMap.get(news.title)!! + timePadding)
            )}
            fps={frame}
            width={1920}
            height={1080}
            defaultProps={{
              beforeDurationFrame: newsBeforeFrameMap.get(news.title)!!, news
            }}
          />
        );
      })}
    </>
  );
};
