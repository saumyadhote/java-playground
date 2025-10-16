import React, { useState } from 'react';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '30px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  wrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '40px',
    textAlign: 'center',
    color: 'white',
  },
  title: {
    fontSize: '42px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '16px',
    opacity: 0.9,
    margin: 0,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '30px',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    marginBottom: '15px',
    fontFamily: 'Arial, sans-serif',
  },
  inputFocus: {
    outline: 'none',
    borderColor: '#667eea',
    boxShadow: '0 0 5px rgba(102, 126, 234, 0.3)',
  },
  select: {
    width: '100%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    marginBottom: '15px',
    fontFamily: 'Arial, sans-serif',
    background: 'white',
  },
  description: {
    fontSize: '13px',
    color: '#666',
    marginTop: '10px',
    lineHeight: '1.5',
  },
  button: {
    width: '100%',
    padding: '14px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  buttonHover: {
    background: '#5568d3',
  },
  resultBox: {
    background: '#f0f4ff',
    padding: '15px',
    borderRadius: '6px',
    border: '2px solid #667eea',
    marginTop: '15px',
    fontFamily: 'monospace',
    wordBreak: 'break-all',
  },
  codeBox: {
    background: '#1e1e1e',
    color: '#d4d4d4',
    padding: '20px',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '13px',
    overflowX: 'auto',
    marginTop: '20px',
    whiteSpace: 'pre-wrap',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
  },
  smallButton: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    transition: 'opacity 0.2s',
  },
  copyButton: {
    background: '#4CAF50',
    color: 'white',
  },
  downloadButton: {
    background: '#2196F3',
    color: 'white',
  },
  clearButton: {
    background: '#f44336',
    color: 'white',
  },
  historyItem: {
    background: '#f9f9f9',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'background 0.2s',
  },
  historyItemHover: {
    background: '#f0f4ff',
  },
  historyTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  },
  historySmall: {
    fontSize: '12px',
    color: '#666',
  },
  paramBox: {
    marginBottom: '15px',
  },
  paramLabel: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '5px',
    display: 'block',
  },
  paramInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '13px',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  },
};

export default function JavaPlayground() {
  const [input, setInput] = useState('Hello World');
  const [selectedMethod, setSelectedMethod] = useState('length');
  const [params, setParams] = useState({});
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const methods = {
    length: { label: 'length()', params: [] },
    charAt: { label: 'charAt(int)', params: ['index'] },
    substring: { label: 'substring(int, int)', params: ['start', 'end'] },
    indexOf: { label: 'indexOf(String)', params: ['substring'] },
    lastIndexOf: { label: 'lastIndexOf(String)', params: ['substring'] },
    contains: { label: 'contains(String)', params: ['substring'] },
    startsWith: { label: 'startsWith(String)', params: ['prefix'] },
    endsWith: { label: 'endsWith(String)', params: ['suffix'] },
    equals: { label: 'equals(String)', params: ['compare'] },
    equalsIgnoreCase: { label: 'equalsIgnoreCase(String)', params: ['compare'] },
    toLowerCase: { label: 'toLowerCase()', params: [] },
    toUpperCase: { label: 'toUpperCase()', params: [] },
    trim: { label: 'trim()', params: [] },
    strip: { label: 'strip()', params: [] },
    replace: { label: 'replace(char, char)', params: ['oldChar', 'newChar'] },
    replaceAll: { label: 'replaceAll(String, String)', params: ['regex', 'replacement'] },
    split: { label: 'split(String)', params: ['delimiter'] },
    concat: { label: 'concat(String)', params: ['str'] },
    valueOf: { label: 'valueOf()', params: [] },
    compareTo: { label: 'compareTo(String)', params: ['compare'] },
    matches: { label: 'matches(String)', params: ['regex'] },
    repeat: { label: 'repeat(int)', params: ['count'] },
    isBlank: { label: 'isBlank()', params: [] },
  };

  const explanations = {
    length: 'Returns the number of characters in the string.',
    charAt: 'Returns the character at the specified index.',
    substring: 'Returns a substring from start index (inclusive) to end index (exclusive).',
    indexOf: 'Returns the index of the first occurrence of the substring, or -1 if not found.',
    lastIndexOf: 'Returns the index of the last occurrence of the substring.',
    contains: 'Returns true if the string contains the specified substring.',
    startsWith: 'Returns true if the string starts with the specified prefix.',
    endsWith: 'Returns true if the string ends with the specified suffix.',
    equals: 'Returns true if the strings are equal (case-sensitive).',
    equalsIgnoreCase: 'Returns true if the strings are equal (case-insensitive).',
    toLowerCase: 'Converts all characters to lowercase.',
    toUpperCase: 'Converts all characters to uppercase.',
    trim: 'Removes leading and trailing whitespace.',
    strip: 'Removes leading and trailing whitespace (Java 11+).',
    replace: 'Replaces all occurrences of a character with another.',
    replaceAll: 'Replaces all matches of a regex pattern with a string.',
    split: 'Splits the string by a delimiter into an array.',
    concat: 'Concatenates the specified string to the end.',
    valueOf: 'Returns the string value (identity operation).',
    compareTo: 'Compares strings lexicographically.',
    matches: 'Tests if the string matches a regex pattern.',
    repeat: 'Returns a string consisting of this string repeated n times.',
    isBlank: 'Returns true if the string is empty or contains only whitespace.',
  };

  const runMethod = () => {
    try {
      let output, javaCode;
      const method = selectedMethod;

      switch (method) {
        case 'length':
          output = input.length;
          javaCode = `String str = "${input}";\nint result = str.length();`;
          break;
        case 'charAt': {
          const idx = parseInt(params.index) || 0;
          output = input.charAt(idx);
          javaCode = `String str = "${input}";\nchar result = str.charAt(${idx});`;
          break;
        }
        case 'substring': {
          const start = parseInt(params.start) || 0;
          const end = parseInt(params.end) || input.length;
          output = input.substring(start, end);
          javaCode = `String str = "${input}";\nString result = str.substring(${start}, ${end});`;
          break;
        }
        case 'indexOf': {
          const sub = params.substring || '';
          output = input.indexOf(sub);
          javaCode = `String str = "${input}";\nint result = str.indexOf("${sub}");`;
          break;
        }
        case 'lastIndexOf': {
          const sub = params.substring || '';
          output = input.lastIndexOf(sub);
          javaCode = `String str = "${input}";\nint result = str.lastIndexOf("${sub}");`;
          break;
        }
        case 'contains': {
          const sub = params.substring || '';
          output = input.includes(sub);
          javaCode = `String str = "${input}";\nboolean result = str.contains("${sub}");`;
          break;
        }
        case 'startsWith': {
          const prefix = params.prefix || '';
          output = input.startsWith(prefix);
          javaCode = `String str = "${input}";\nboolean result = str.startsWith("${prefix}");`;
          break;
        }
        case 'endsWith': {
          const suffix = params.suffix || '';
          output = input.endsWith(suffix);
          javaCode = `String str = "${input}";\nboolean result = str.endsWith("${suffix}");`;
          break;
        }
        case 'equals': {
          const compare = params.compare || '';
          output = input === compare;
          javaCode = `String str = "${input}";\nboolean result = str.equals("${compare}");`;
          break;
        }
        case 'equalsIgnoreCase': {
          const compare = params.compare || '';
          output = input.toLowerCase() === compare.toLowerCase();
          javaCode = `String str = "${input}";\nboolean result = str.equalsIgnoreCase("${compare}");`;
          break;
        }
        case 'toLowerCase':
          output = input.toLowerCase();
          javaCode = `String str = "${input}";\nString result = str.toLowerCase();`;
          break;
        case 'toUpperCase':
          output = input.toUpperCase();
          javaCode = `String str = "${input}";\nString result = str.toUpperCase();`;
          break;
        case 'trim':
          output = input.trim();
          javaCode = `String str = "${input}";\nString result = str.trim();`;
          break;
        case 'strip':
          output = input.trim();
          javaCode = `String str = "${input}";\nString result = str.strip();`;
          break;
        case 'replace': {
          const oldChar = (params.oldChar || '')[0] || ' ';
          const newChar = (params.newChar || '')[0] || ' ';
          output = input.split(oldChar).join(newChar);
          javaCode = `String str = "${input}";\nString result = str.replace('${oldChar}', '${newChar}');`;
          break;
        }
        case 'replaceAll': {
          const regex = params.regex || 'o';
          const repl = params.replacement || '';
          try {
            output = input.replace(new RegExp(regex, 'g'), repl);
          } catch {
            output = 'Invalid regex pattern';
          }
          javaCode = `String str = "${input}";\nString result = str.replaceAll("${regex}", "${repl}");`;
          break;
        }
        case 'split': {
          const delim = params.delimiter || ' ';
          output = input.split(delim);
          javaCode = `String str = "${input}";\nString[] result = str.split("${delim}");`;
          break;
        }
        case 'concat': {
          const str = params.str || '';
          output = input + str;
          javaCode = `String str = "${input}";\nString result = str.concat("${str}");`;
          break;
        }
        case 'valueOf':
          output = String(input);
          javaCode = `String str = "${input}";\nString result = String.valueOf(str);`;
          break;
        case 'compareTo': {
          const compare = params.compare || '';
          output = input.localeCompare(compare);
          javaCode = `String str = "${input}";\nint result = str.compareTo("${compare}");`;
          break;
        }
        case 'matches': {
          const regex = params.regex || '.*';
          try {
            output = new RegExp(regex).test(input);
          } catch {
            output = 'Invalid regex pattern';
          }
          javaCode = `String str = "${input}";\nboolean result = str.matches("${regex}");`;
          break;
        }
        case 'repeat': {
          const count = parseInt(params.count) || 1;
          output = input.repeat(count);
          javaCode = `String str = "${input}";\nString result = str.repeat(${count});`;
          break;
        }
        case 'isBlank':
          output = input.trim() === '';
          javaCode = `String str = "${input}";\nboolean result = str.isBlank();`;
          break;
        default:
          output = 'Unknown method';
      }

      const newResult = {
        method: selectedMethod,
        input,
        params,
        output,
        javaCode,
        timestamp: new Date().toLocaleTimeString(),
      };

      setResult(newResult);
      setHistory([newResult, ...history]);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadResult = () => {
    if (!result) return;
    const content = `JavaPlayground Output\n====================\nMethod: ${result.method}\nInput: "${result.input}"\nParameters: ${JSON.stringify(result.params)}\nOutput: ${JSON.stringify(result.output)}\n\nJava Code:\n${result.javaCode}\n\nTimestamp: ${result.timestamp}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `playground_${Date.now()}.txt`;
    a.click();
  };

  const clearHistory = () => {
    setHistory([]);
    setResult(null);
  };

  const methodInfo = methods[selectedMethod];

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>JavaPlayground</h1>
          <p style={styles.subtitle}>Experiment with Java String functions interactively</p>
        </div>

        <div style={styles.gridContainer}>
          {/* Left Column - Controls */}
          <div style={{ gridColumn: 'span 2' }}>
            {/* String Input */}
            <div style={styles.card}>
              <label style={styles.label}>Input String</label>
              <input
                style={styles.input}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                placeholder="Enter a string to test..."
              />
            </div>

            {/* Method Selection */}
            <div style={styles.card}>
              <label style={styles.label}>Select Method</label>
              <select
                style={styles.select}
                value={selectedMethod}
                onChange={(e) => {
                  setSelectedMethod(e.target.value);
                  setParams({});
                }}
              >
                {Object.entries(methods).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
              <p style={styles.description}>{explanations[selectedMethod]}</p>
            </div>

            {/* Parameters */}
            {methodInfo.params.length > 0 && (
              <div style={styles.card}>
                <label style={styles.label}>Parameters</label>
                {methodInfo.params.map((param) => (
                  <div key={param} style={styles.paramBox}>
                    <label style={styles.paramLabel}>{param}</label>
                    <input
                      style={styles.paramInput}
                      type="text"
                      value={params[param] || ''}
                      onChange={(e) => setParams({ ...params, [param]: e.target.value })}
                      placeholder={`Enter ${param}...`}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Run Button */}
            <button
              style={{
                ...styles.button,
                ...(hoveredButton === 'run' ? styles.buttonHover : {}),
              }}
              onClick={runMethod}
              onMouseEnter={() => setHoveredButton('run')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              ▶ Run Method
            </button>
          </div>

          {/* Right Column - Results */}
          <div>
            <div style={styles.card}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: 0 }}>Result</h2>
              {result ? (
                <div>
                  <div style={styles.resultBox}>
                    <strong>OUTPUT:</strong>
                    <div style={{ marginTop: '10px' }}>
                      {typeof result.output === 'string'
                        ? `"${result.output}"`
                        : Array.isArray(result.output)
                        ? `[${result.output.map((x) => `"${x}"`).join(', ')}]`
                        : String(result.output)}
                    </div>
                  </div>
                  <div style={styles.buttonGroup}>
                    <button
                      style={{ ...styles.smallButton, ...styles.copyButton }}
                      onClick={() =>
                        copyToClipboard(
                          typeof result.output === 'object'
                            ? JSON.stringify(result.output)
                            : String(result.output)
                        )
                      }
                    >
                      📋 Copy
                    </button>
                    <button
                      style={{ ...styles.smallButton, ...styles.downloadButton }}
                      onClick={downloadResult}
                    >
                      ⬇ Download
                    </button>
                  </div>
                </div>
              ) : (
                <p style={{ color: '#999' }}>Run a method to see results</p>
              )}
            </div>
          </div>
        </div>

        {/* Java Code */}
        {result && !result.error && (
          <div style={styles.card}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: 0 }}>Equivalent Java Code</h2>
            <div style={styles.codeBox}>{result.javaCode}</div>
            <button
              style={{
                ...styles.smallButton,
                ...styles.copyButton,
                marginTop: '10px',
              }}
              onClick={() => copyToClipboard(result.javaCode)}
            >
              📋 Copy Code
            </button>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>History</h2>
              <button
                style={{ ...styles.smallButton, ...styles.clearButton, width: 'auto', padding: '8px 15px' }}
                onClick={clearHistory}
              >
                🗑 Clear
              </button>
            </div>
            <div style={{ marginTop: '15px', maxHeight: '300px', overflowY: 'auto' }}>
              {history.map((item, idx) => (
                <div
                  key={idx}
                  style={styles.historyItem}
                  onClick={() => {
                    setInput(item.input);
                    setSelectedMethod(item.method);
                    setParams(item.params);
                    setResult(item);
                  }}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.historyItemHover)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: '#f9f9f9' })}
                >
                  <div style={styles.historyTitle}>{item.method}</div>
                  <div style={styles.historySmall}>Input: "{item.input}"</div>
                  <div style={styles.historySmall}>
                    {typeof item.output === 'object'
                      ? JSON.stringify(item.output)
                      : String(item.output).substring(0, 50)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}