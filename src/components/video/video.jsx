import {useParams} from 'react-router-dom';
import ReactPlayer from 'react-player';
import './video.css';
const Video = () => {
     let params = useParams();
     let key = params.ytId;
     return (
          <div className='react-player-container'>
               {(key != null) ?
                    <ReactPlayer
                         controls='true'
                         playing={true}
                         width='100%'
                         height='100%'
                         url={`https:/www.youtube.com/watch?v=${key}`}
                    />
                    : null
               }
          </div>
     );
};
export default Video;