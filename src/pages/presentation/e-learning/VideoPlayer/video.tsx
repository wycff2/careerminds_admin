import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
	url: string;
	controls?: boolean;
	width?: string | number;
	height?: string | number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
	url,
	controls = true,
	width = '100%',
	height = '100%',
}) => {
	return (
		<div className='video-player-wrapper'>
			<ReactPlayer url={url} controls={controls} width={width} height={height} />
		</div>
	);
};

export default VideoPlayer;
