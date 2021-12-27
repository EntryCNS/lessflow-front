import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';

type sentence = {id:number, content: string, duration: number}
function getStartTime(sentences: Array<sentence>, item: sentence) {
	const idx = sentences.indexOf(item)

	let time = 0
	for(let i = 0; i < idx; i++) {
		console.log(`${sentences[i].content}(${sentences[i].duration}초)`)
		time += sentences[i].duration
	}

	return time
}

function sumSentenceTime(sentences: Array<sentence>) {
	let time = 0
	sentences.forEach((it) => time += it.duration)
	return time
}

const TIME_PADDING = 0.7
const Article: React.FC<{
	news: {
		title: string,
		sentences: Array<sentence>
	}
}> = ({news}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig()
	const TIMEPADDING_FORFRAME = TIME_PADDING * videoConfig.fps
	console.log(news.sentences)

	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
				<Sequence from={TIMEPADDING_FORFRAME} durationInFrames={Math.floor(videoConfig.fps * (sumSentenceTime(news.sentences)))}>
					<h1 style={{ width:'100%', textAlign: 'center', fontSize: '64px' }}>{news.title}</h1>
				</Sequence>
				{
					news.sentences.map(it => {
						return (
						<Sequence from={TIMEPADDING_FORFRAME + Math.round(getStartTime(news.sentences, it) * videoConfig.fps)}
							durationInFrames={Math.round(videoConfig.fps * it.duration)}>
							<h3 style={{ width: '50%', fontSize: '48px', marginTop:'200px', height: '100%' }}>{it.content}</h3>
						</Sequence>
						)
					})
				}
		</div>
	);
};

export { sumSentenceTime, sentence, Article }