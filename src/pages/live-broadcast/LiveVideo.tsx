import { useCallback, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { class_esy } from 'esy-ui';

function LiveVideo({ id, src, licenseUrl, endTime, startTime, videoSize }: any) {
  const playerRef = useRef(null);

  console.warn({ endTime, startTime });

  const createTcp = useCallback(() => {
    const cb = () => {
      if (window.TCPlayer && src && id) {
        if (playerRef.current) {
          playerRef.current.src(src);
        } else {
          const player = window.TCPlayer('live-room-id-play', {
            sources: [
              {
                src,
              },
            ],
            poster: licenseUrl,
            licenseUrl: 'https://license.vod2.myqcloud.com/license/v2/1318736557_1/v_cube.license',
            controlBar: {
              timeDivider: false,
              playbackRateMenuButton: false,
              currentTimeDisplay: false,
              durationDisplay: false,
              progressControl: false,
              volumePanel: false,
              fullscreenToggle: videoSize !== 2,
            },
          });
          playerRef.current = player;
        }
      }
    };
    if (startTime && endTime && (dayjs().isSame(startTime) || dayjs().isSame(endTime) || (dayjs().isAfter(startTime) && dayjs().isBefore(endTime)))) {
      cb();
    } else {
      const t = new Date(startTime).getTime() - new Date().getTime();
      if (t > 0) {
        setTimeout(() => {
          cb();
        }, t);
      }
    }
  }, [endTime, id, licenseUrl, src, startTime, videoSize]);

  useEffect(() => {
    createTcp();
  }, [createTcp]);

  return <video className={class_esy(['w-full bg-black', videoSize === 2 ? 'h-full' : 'h-60'])} id='live-room-id-play' poster={licenseUrl} aria-orientation='horizontal' playsInline />;
}

export default LiveVideo;
