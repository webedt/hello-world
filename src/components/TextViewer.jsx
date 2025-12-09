/**
 * TextViewer component - Displays text/code files with syntax highlighting
 */
export default function TextViewer({ content, fileName }) {
  const lineCount = content ? content.split('\n').length : 0;

  return (
    <div style={styles.container}>
      {/* File name */}
      <div style={styles.header}>
        <span style={styles.codeIcon}>📝</span>
        <span style={styles.fileNameText}>{fileName}</span>
        <span style={styles.lineCount}>{lineCount} lines</span>
      </div>

      {/* Code display */}
      <div style={styles.codeContainer}>
        <pre style={styles.code}>
          <code>{content || '(empty file)'}</code>
        </pre>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #333',
    color: '#e0e0e0',
  },
  codeIcon: {
    marginRight: '8px',
    fontSize: '16px',
  },
  fileNameText: {
    fontSize: '14px',
    fontWeight: '500',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  lineCount: {
    fontSize: '12px',
    color: '#666',
    marginLeft: '12px',
  },
  codeContainer: {
    maxHeight: '500px',
    overflow: 'auto',
    backgroundColor: '#1a1a1a',
  },
  code: {
    margin: 0,
    padding: '16px',
    fontFamily: '"Fira Code", "Monaco", "Menlo", monospace',
    fontSize: '13px',
    lineHeight: '1.5',
    color: '#d4d4d4',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
};
