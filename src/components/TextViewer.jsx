/**
 * TextViewer component - Displays text/code files with syntax highlighting
 */
export default function TextViewer({ content, fileName }) {
  const lines = content ? content.split('\n') : [];
  const lineCount = lines.length;

  return (
    <div style={styles.container}>
      {/* File name */}
      <div style={styles.header}>
        <span style={styles.codeIcon}>📝</span>
        <span style={styles.fileNameText}>{fileName}</span>
        <span style={styles.lineCount}>{lineCount} lines</span>
      </div>

      {/* Code display with line numbers */}
      <div style={styles.codeContainer}>
        <table style={styles.codeTable}>
          <tbody>
            {lines.length > 0 ? (
              lines.map((line, index) => (
                <tr key={index}>
                  <td style={styles.lineNumber}>{index + 1}</td>
                  <td style={styles.lineContent}>
                    <pre style={styles.code}><code>{line}</code></pre>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.lineNumber}>1</td>
                <td style={styles.lineContent}>
                  <pre style={styles.code}><code>(empty file)</code></pre>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
  codeTable: {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
  },
  lineNumber: {
    width: '1%',
    minWidth: '40px',
    padding: '0 12px',
    textAlign: 'right',
    verticalAlign: 'top',
    fontFamily: '"Fira Code", "Monaco", "Menlo", monospace',
    fontSize: '13px',
    lineHeight: '1.5',
    color: '#6e7681',
    backgroundColor: '#1a1a1a',
    userSelect: 'none',
    borderRight: '1px solid #333',
  },
  lineContent: {
    padding: '0 0 0 12px',
    verticalAlign: 'top',
  },
  code: {
    margin: 0,
    padding: 0,
    fontFamily: '"Fira Code", "Monaco", "Menlo", monospace',
    fontSize: '13px',
    lineHeight: '1.5',
    color: '#d4d4d4',
    whiteSpace: 'pre',
    wordBreak: 'break-word',
  },
};
