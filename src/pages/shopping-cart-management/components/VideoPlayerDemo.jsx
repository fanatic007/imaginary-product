import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/AppIcon";


const HeavyVideoPlayer = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = React.useRef(null);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video?.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video?.duration);
    };

    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('loadedmetadata', handleLoadedMetadata);

  }, []);

  const handlePlayPause = () => {
    if (videoRef?.current) {
      if (isPlaying) {
        videoRef?.current?.pause();
      } else {
        videoRef?.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="relative bg-black aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full"
          src={videoUrl}
          poster="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
        >
          Your browser does not support the video tag.
        </video>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlayPause}
              className="text-white hover:bg-white/20"
            >
              <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
            </Button>

            <div className="flex-1">
              <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <span className="text-xs text-white font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoPlayerDemo = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadVideo = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setShowVideo(true);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-start gap-3 mb-4">
        <Icon name="Video" size={24} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
            Video
          </h3>

          {!showVideo ? (
            <Button
              variant="primary"
              size="md"
              iconName="Play"
              iconPosition="left"
              onClick={handleLoadVideo}
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? 'Loading Video...' : 'Load Product Demo Video'}
            </Button>
          ) : (
            <div className="space-y-3">
              <HeavyVideoPlayer videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerDemo;