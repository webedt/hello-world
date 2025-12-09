import { useState } from 'react';

/**
 * ImageViewer component - Displays images with zoom controls
 */
export default function ImageViewer({ src, fileName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(100);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError('Failed to load image');
    setIsLoading(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 300));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

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
      {/* File name */}
      <div style={styles.fileName}>
        <span style={styles.imageIcon}>🖼️</span>
        <span style={styles.fileNameText}>{fileName}</span>
      </div>

      {/* Zoom controls */}
      <div style={styles.controls}>
        <button onClick={handleZoomOut} style={styles.controlButton} title="Zoom out">
          −
        </button>
        <span style={styles.zoomLevel}>{zoom}%</span>
        <button onClick={handleZoomIn} style={styles.controlButton} title="Zoom in">
          +
        </button>
        <button onClick={handleResetZoom} style={styles.resetButton} title="Reset zoom">
          Reset
        </button>
      </div>

      {/* Image display */}
      <div style={styles.imageContainer}>
        {isLoading && (
          <div style={styles.loading}>
            <span>Loading...</span>
          </div>
        )}
        <img
          src={src}
          alt={fileName}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            ...styles.image,
            display: isLoading ? 'none' : 'block',
            transform: `scale(${zoom / 100})`,
          }}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  fileName: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    color: '#e0e0e0',
  },
  imageIcon: {
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
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  controlButton: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#3a3a3a',
    color: '#e0e0e0',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    height: '32px',
    padding: '0 12px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#3a3a3a',
    color: '#e0e0e0',
    fontSize: '12px',
    cursor: 'pointer',
    marginLeft: '8px',
  },
  zoomLevel: {
    color: '#a0a0a0',
    fontSize: '12px',
    minWidth: '45px',
    textAlign: 'center',
  },
  imageContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    transformOrigin: 'center center',
    transition: 'transform 0.2s ease',
  },
  loading: {
    color: '#666',
    padding: '40px',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    color: '#ff6b6b',
  },
  errorIcon: {
    marginRight: '8px',
  },
  errorText: {
    fontSize: '14px',
  },
};
