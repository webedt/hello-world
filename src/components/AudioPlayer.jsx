import { useState, useRef, useEffect } from 'react';

/**
 * AudioPlayer component - A compact music player with play/pause button and progress bar
 * Supports WAV, MP3, OGG, FLAC, and other audio formats
 */
export default function AudioPlayer({ src, fileName }) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset state when src changes
    setIsLoading(true);
    setError(null);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setError('Failed to load audio file');
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [src]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => {
        console.error('Playback failed:', err);
        setError('Playback failed');
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar || !duration) return;

    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressDrag = (e) => {
    if (e.buttons !== 1) return; // Only respond to left mouse button
    handleProgressClick(e);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <span style={styles.errorIcon}>⚠️</span>
          <span style={styles.errorText}>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* File name */}
      <div style={styles.fileName}>
        <span style={styles.musicIcon}>🎵</span>
        <span style={styles.fileNameText}>{fileName}</span>
      </div>

      {/* Player controls */}
      <div style={styles.playerControls}>
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          style={styles.playPauseButton}
          disabled={isLoading}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isLoading ? (
            <span style={styles.loadingSpinner}>⏳</span>
          ) : isPlaying ? (
            <PauseIcon />
          ) : (
            <PlayIcon />
          )}
        </button>

        {/* Time display - current */}
        <span style={styles.timeDisplay}>{formatTime(currentTime)}</span>

        {/* Progress bar */}
        <div
          ref={progressRef}
          style={styles.progressContainer}
          onClick={handleProgressClick}
          onMouseMove={handleProgressDrag}
          role="slider"
          aria-label="Audio progress"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
        >
          <div style={styles.progressBackground}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progressPercent}%`
              }}
            />
            <div
              style={{
                ...styles.progressHandle,
                left: `${progressPercent}%`
              }}
            />
          </div>
        </div>

        {/* Time display - duration */}
        <span style={styles.timeDisplay}>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

// Play icon SVG component
function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  );
}

// Pause icon SVG component
function PauseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
  );
}

const styles = {
  container: {
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    padding: '16px 20px',
    maxWidth: '500px',
    margin: '20px auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  fileName: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    color: '#e0e0e0',
  },
  musicIcon: {
    marginRight: '8px',
    fontSize: '18px',
  },
  fileNameText: {
    fontSize: '14px',
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  playerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  playPauseButton: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#4a9eff',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s, transform 0.1s',
    flexShrink: 0,
  },
  loadingSpinner: {
    animation: 'spin 1s linear infinite',
  },
  timeDisplay: {
    color: '#a0a0a0',
    fontSize: '12px',
    fontVariantNumeric: 'tabular-nums',
    minWidth: '40px',
    textAlign: 'center',
  },
  progressContainer: {
    flex: 1,
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  progressBackground: {
    width: '100%',
    height: '4px',
    backgroundColor: '#3a3a3a',
    borderRadius: '2px',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4a9eff',
    borderRadius: '2px',
    transition: 'width 0.1s linear',
  },
  progressHandle: {
    position: 'absolute',
    top: '50%',
    width: '12px',
    height: '12px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
    transition: 'left 0.1s linear',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    color: '#ff6b6b',
  },
  errorIcon: {
    marginRight: '8px',
  },
  errorText: {
    fontSize: '14px',
  },
};
