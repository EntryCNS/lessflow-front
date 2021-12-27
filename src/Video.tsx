import { Composition } from 'remotion';
import { Article, sumSentenceTime } from './Article'
import data from './newsData'

const frame = 30

const newsTimeMap = new Map<string, number>()
data.forEach((news) => {
	newsTimeMap.set(news.title, sumSentenceTime(news.sentences))
})

export const RemotionVideo: React.FC = () => {
	return (
		<>
			{
				data.map((news) => {
					return (
						<Composition
							id={`article${data.indexOf(news) + 1}`}
							component={Article}
							durationInFrames={Math.floor(frame * (newsTimeMap.get(news.title)!! + 1.5))}
							fps={frame}
							width={1920}
							height={1080}
							defaultProps={{
								news
							}}
						/>
					)
				})
			}
		</>
	);
};
