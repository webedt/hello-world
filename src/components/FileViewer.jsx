import AudioPlayer from './AudioPlayer';
import ImageViewer from './ImageViewer';
import TextViewer from './TextViewer';

/**
 * FileViewer - Routes files to appropriate viewers based on file type
 */
export default function FileViewer({ file }) {
  if (!file) {
    return (
      <div style={styles.placeholder}>
        <span style={styles.placeholderIcon}>📁</span>
        <p style={styles.placeholderText}>Select a file to view</p>
      </div>
    );
  }

  const fileType = getFileType(file.name);

  switch (fileType) {
    case 'audio':
      return (
        <div style={styles.viewerContainer}>
          <AudioPlayer src={file.url} fileName={file.name} />
        </div>
      );

    case 'image':
      return (
        <div style={styles.viewerContainer}>
          <ImageViewer src={file.url} fileName={file.name} />
        </div>
      );

    case 'text':
      return (
        <div style={styles.viewerContainer}>
          <TextViewer content={file.content} fileName={file.name} />
        </div>
      );

    default:
      return (
        <div style={styles.viewerContainer}>
          <div style={styles.unsupported}>
            <span style={styles.unsupportedIcon}>📄</span>
            <p style={styles.unsupportedText}>
              Preview not available for <strong>{file.name}</strong>
            </p>
            <p style={styles.unsupportedSubtext}>
              File type: {getExtension(file.name) || 'unknown'}
            </p>
          </div>
        </div>
      );
  }
}

/**
 * Determine file type category from file name/extension
 */
function getFileType(fileName) {
  const ext = getExtension(fileName);

  const audioExtensions = ['wav', 'mp3', 'ogg', 'flac', 'aac', 'm4a', 'wma', 'aiff', 'opus', 'webm'];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'tiff', 'tif'];
  const textExtensions = ['txt', 'md', 'json', 'js', 'jsx', 'ts', 'tsx', 'css', 'html', 'xml', 'yaml', 'yml', 'py', 'rb', 'go', 'rs', 'java', 'c', 'cpp', 'h', 'hpp', 'sh', 'bash', 'zsh', 'fish'];

  if (audioExtensions.includes(ext)) return 'audio';
  if (imageExtensions.includes(ext)) return 'image';
  if (textExtensions.includes(ext)) return 'text';

  return 'unknown';
}

function getExtension(fileName) {
  const parts = fileName.toLowerCase().split('.');
  return parts.length > 1 ? parts.pop() : '';
}

const styles = {
  viewerContainer: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: '300px',
    color: '#666',
  },
  placeholderIcon: {
    fontSize: '64px',
    marginBottom: '16px',
    opacity: 0.5,
  },
  placeholderText: {
    fontSize: '16px',
    margin: 0,
  },
  unsupported: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    color: '#888',
  },
  unsupportedIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.6,
  },
  unsupportedText: {
    fontSize: '14px',
    margin: '0 0 8px 0',
    color: '#aaa',
  },
  unsupportedSubtext: {
    fontSize: '12px',
    margin: 0,
    color: '#666',
  },
};
