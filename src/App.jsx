import { useState, useRef } from 'react';
import FileViewer from './components/FileViewer';

/**
 * Main App - Code Editor with File Browser
 * Demonstrates the AudioPlayer, ImageViewer, and TextViewer components
 */
export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Demo files for testing
  const demoFiles = [
    {
      name: '836911__josefpres__piano-loops-197-octave-down-short-loop-120-bpm.wav',
      url: '/836911__josefpres__piano-loops-197-octave-down-short-loop-120-bpm.wav',
      type: 'audio',
    },
    {
      name: '2x1_SuperMarioHub_image1600w.jpg',
      url: '/2x1_SuperMarioHub_image1600w.jpg',
      type: 'image',
    },
    {
      name: 'index.js',
      url: '/index.js',
      type: 'text',
      content: `#!/usr/bin/env node

/**
 * Hello World - The Way of the Ninja
 * A simple demonstration of displaying greetings in the terminal
 */

console.log('Hello World!');`,
    },
  ];

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const newFile = {
      name: file.name,
      url: url,
      type: getFileCategory(file.name),
    };

    // For text files, also read the content
    if (newFile.type === 'text') {
      const reader = new FileReader();
      reader.onload = (e) => {
        newFile.content = e.target.result;
        setSelectedFile(newFile);
      };
      reader.readAsText(file);
    } else {
      setSelectedFile(newFile);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>📂 Code Editor - File Viewer</h1>
        <p style={styles.subtitle}>Click on a file to preview it. Audio files get a music player!</p>
      </header>

      <div style={styles.content}>
        {/* Sidebar - File Browser */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <span style={styles.sidebarTitle}>Files</span>
            <button onClick={openFilePicker} style={styles.uploadButton} title="Upload file">
              +
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              accept="audio/*,image/*,.txt,.md,.js,.jsx,.ts,.tsx,.json,.css,.html"
            />
          </div>

          <div style={styles.fileList}>
            {demoFiles.map((file, index) => (
              <button
                key={index}
                onClick={() => handleFileSelect(file)}
                style={{
                  ...styles.fileItem,
                  backgroundColor: selectedFile?.name === file.name ? '#37373d' : 'transparent',
                }}
              >
                <span style={styles.fileIcon}>{getFileIcon(file.type)}</span>
                <span style={styles.fileItemName}>{file.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main area - File Viewer */}
        <main style={styles.main}>
          <FileViewer file={selectedFile} />
        </main>
      </div>
    </div>
  );
}

function getFileCategory(fileName) {
  const ext = fileName.toLowerCase().split('.').pop();
  const audioExtensions = ['wav', 'mp3', 'ogg', 'flac', 'aac', 'm4a', 'wma', 'aiff', 'opus', 'webm'];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'tiff', 'tif'];

  if (audioExtensions.includes(ext)) return 'audio';
  if (imageExtensions.includes(ext)) return 'image';
  return 'text';
}

function getFileIcon(type) {
  switch (type) {
    case 'audio':
      return '🎵';
    case 'image':
      return '🖼️';
    case 'text':
      return '📝';
    default:
      return '📄';
  }
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#1e1e1e',
    color: '#cccccc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    padding: '20px 24px',
    borderBottom: '1px solid #333',
    backgroundColor: '#252526',
  },
  title: {
    margin: '0 0 4px 0',
    fontSize: '20px',
    fontWeight: '600',
    color: '#ffffff',
  },
  subtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#888',
  },
  content: {
    display: 'flex',
    minHeight: 'calc(100vh - 85px)',
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#252526',
    borderRight: '1px solid #333',
    flexShrink: 0,
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #333',
  },
  sidebarTitle: {
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#888',
    flex: 1,
  },
  uploadButton: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0e639c',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileList: {
    padding: '8px 0',
  },
  fileItem: {
    width: '100%',
    padding: '8px 16px',
    border: 'none',
    background: 'transparent',
    color: '#cccccc',
    fontSize: '13px',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.1s',
  },
  fileIcon: {
    fontSize: '14px',
    flexShrink: 0,
  },
  fileItemName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  main: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#1e1e1e',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
};
