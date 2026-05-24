import React, { useState } from 'react';
import './App.css';

// ── Constants ─────────────────────────────────────────────────────────────

const JAVA_METHODS = {
  length: { label: 'length()', params: [] },
  charAt: { label: 'charAt(int)', params: ['index'] },
  substring: { label: 'substring(int, int)', params: ['start', 'end'] },
  indexOf: { label: 'indexOf(String)', params: ['search'] },
  lastIndexOf: { label: 'lastIndexOf(String)', params: ['search'] },
  contains: { label: 'contains(String)', params: ['search'] },
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

const METHOD_EXPLANATIONS = {
  length: 'Returns the number of characters in the string.',
  charAt: 'Returns the character at the specified index (0-based).',
  substring: 'Returns a substring from start (inclusive) to end (exclusive).',
  indexOf: 'Returns the index of the first occurrence, or -1 if not found.',
  lastIndexOf: 'Returns the index of the last occurrence of the search string.',
  contains: 'Returns true if the string contains the specified substring.',
  startsWith: 'Returns true if the string starts with the specified prefix.',
  endsWith: 'Returns true if the string ends with the specified suffix.',
  equals: 'Returns true if the strings are equal (case-sensitive).',
  equalsIgnoreCase: 'Returns true if the strings are equal (case-insensitive).',
  toLowerCase: 'Converts all characters to lowercase.',
  toUpperCase: 'Converts all characters to uppercase.',
  trim: 'Removes leading and trailing ASCII whitespace.',
  strip: 'Removes leading and trailing whitespace (Unicode-aware, Java 11+).',
  replace: 'Replaces all occurrences of a character with another character.',
  replaceAll: 'Replaces all regex matches with a replacement string.',
  split: 'Splits the string by a delimiter regex into an array.',
  concat: 'Concatenates the specified string to the end of this string.',
  valueOf: 'Returns the string representation (identity when already a String).',
  compareTo: 'Compares strings lexicographically by Unicode char values.',
  matches: 'Returns true if the entire string matches the given regex.',
  repeat: 'Returns this string repeated n times (Java 11+).',
  isBlank: 'Returns true if the string is empty or only whitespace (Java 11+).',
};

const RETURN_TYPES = {
  length: 'int', charAt: 'char', substring: 'String',
  indexOf: 'int', lastIndexOf: 'int', contains: 'boolean',
  startsWith: 'boolean', endsWith: 'boolean', equals: 'boolean',
  equalsIgnoreCase: 'boolean', toLowerCase: 'String', toUpperCase: 'String',
  trim: 'String', strip: 'String', replace: 'String', replaceAll: 'String',
  split: 'String[]', concat: 'String', valueOf: 'String',
  compareTo: 'int', matches: 'boolean', repeat: 'String', isBlank: 'boolean',
};

const RETURN_TYPE_STYLE = {
  int:        { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  char:       { bg: '#fdf4ff', color: '#86198f', border: '#f5d0fe' },
  boolean:    { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
  String:     { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  'String[]': { bg: '#f5f3ff', color: '#6d28d9', border: '#ddd6fe' },
};

const JAVA_VERSION = { strip: 'Java 11+', isBlank: 'Java 11+', repeat: 'Java 11+' };

const METHOD_CATEGORY = {
  toLowerCase: 'transform', toUpperCase: 'transform', trim: 'transform',
  strip: 'transform', replace: 'transform', replaceAll: 'transform',
  split: 'transform', concat: 'transform', valueOf: 'transform',
  repeat: 'transform', substring: 'transform',
  length: 'query', charAt: 'query', indexOf: 'query', lastIndexOf: 'query',
  contains: 'query', startsWith: 'query', endsWith: 'query',
  equals: 'query', equalsIgnoreCase: 'query', compareTo: 'query',
  matches: 'query', isBlank: 'query',
};

const PARAM_HINTS = {
  charAt:          { index: 'int — 0-based (valid range: 0 to length−1)' },
  substring:       { start: 'int — start index (inclusive)', end: 'int — end index (exclusive)' },
  indexOf:         { search: 'String — substring to search for' },
  lastIndexOf:     { search: 'String — substring to search for' },
  contains:        { search: 'String — sequence to look for' },
  startsWith:      { prefix: 'String — prefix to test against' },
  endsWith:        { suffix: 'String — suffix to test against' },
  equals:          { compare: 'String — compared case-sensitively' },
  equalsIgnoreCase:{ compare: 'String — case is ignored' },
  replace:         { oldChar: 'char — character to replace', newChar: 'char — replacement character' },
  replaceAll:      { regex: 'regex pattern to match', replacement: 'String — replacement text' },
  split:           { delimiter: 'regex — used as delimiter' },
  concat:          { str: 'String — appended to the end' },
  compareTo:       { compare: 'String — compared lexicographically' },
  matches:         { regex: 'regex — must match the entire string' },
  repeat:          { count: 'int — number of repetitions (≥ 0)' },
};

// ── Utilities ─────────────────────────────────────────────────────────────

const escapeJavaString = (str) =>
  str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');

const executeMethod = (method, input, params) => {
  const s = escapeJavaString(input);

  switch (method) {
    case 'length':
      return { output: input.length, javaCode: `String str = "${s}";\nint result = str.length();` };
    case 'charAt': {
      const i = parseInt(params.index, 10);
      const idx = isNaN(i) ? 0 : i;
      return { output: input.charAt(idx), javaCode: `String str = "${s}";\nchar result = str.charAt(${idx});` };
    }
    case 'substring': {
      const s0 = isNaN(parseInt(params.start, 10)) ? 0 : parseInt(params.start, 10);
      const e0 = isNaN(parseInt(params.end, 10)) ? input.length : parseInt(params.end, 10);
      return { output: input.substring(s0, e0), javaCode: `String str = "${s}";\nString result = str.substring(${s0}, ${e0});` };
    }
    case 'indexOf': {
      const sub = params.search || '';
      return { output: input.indexOf(sub), javaCode: `String str = "${s}";\nint result = str.indexOf("${escapeJavaString(sub)}");` };
    }
    case 'lastIndexOf': {
      const sub = params.search || '';
      return { output: input.lastIndexOf(sub), javaCode: `String str = "${s}";\nint result = str.lastIndexOf("${escapeJavaString(sub)}");` };
    }
    case 'contains': {
      const sub = params.search || '';
      return { output: input.includes(sub), javaCode: `String str = "${s}";\nboolean result = str.contains("${escapeJavaString(sub)}");` };
    }
    case 'startsWith': {
      const prefix = params.prefix || '';
      return { output: input.startsWith(prefix), javaCode: `String str = "${s}";\nboolean result = str.startsWith("${escapeJavaString(prefix)}");` };
    }
    case 'endsWith': {
      const suffix = params.suffix || '';
      return { output: input.endsWith(suffix), javaCode: `String str = "${s}";\nboolean result = str.endsWith("${escapeJavaString(suffix)}");` };
    }
    case 'equals': {
      const compare = params.compare || '';
      return { output: input === compare, javaCode: `String str = "${s}";\nboolean result = str.equals("${escapeJavaString(compare)}");` };
    }
    case 'equalsIgnoreCase': {
      const compare = params.compare || '';
      return { output: input.toLowerCase() === compare.toLowerCase(), javaCode: `String str = "${s}";\nboolean result = str.equalsIgnoreCase("${escapeJavaString(compare)}");` };
    }
    case 'toLowerCase':
      return { output: input.toLowerCase(), javaCode: `String str = "${s}";\nString result = str.toLowerCase();` };
    case 'toUpperCase':
      return { output: input.toUpperCase(), javaCode: `String str = "${s}";\nString result = str.toUpperCase();` };
    case 'trim':
      return { output: input.trim(), javaCode: `String str = "${s}";\nString result = str.trim();` };
    case 'strip':
      return { output: input.trim(), javaCode: `String str = "${s}";\nString result = str.strip();` };
    case 'replace': {
      const oldChar = (params.oldChar || '')[0] || '';
      const newChar = (params.newChar || '')[0] || '';
      const output = oldChar ? input.split(oldChar).join(newChar) : input;
      return { output, javaCode: `String str = "${s}";\nString result = str.replace('${escapeJavaString(oldChar)}', '${escapeJavaString(newChar)}');` };
    }
    case 'replaceAll': {
      const regex = params.regex || '';
      const repl = params.replacement || '';
      let output;
      try { output = input.replace(new RegExp(regex, 'g'), repl); }
      catch { output = 'Invalid regex pattern'; }
      return { output, javaCode: `String str = "${s}";\nString result = str.replaceAll("${escapeJavaString(regex)}", "${escapeJavaString(repl)}");` };
    }
    case 'split': {
      const delim = params.delimiter !== undefined ? params.delimiter : ' ';
      return { output: input.split(delim), javaCode: `String str = "${s}";\nString[] result = str.split("${escapeJavaString(delim)}");` };
    }
    case 'concat': {
      const str = params.str || '';
      return { output: input + str, javaCode: `String str = "${s}";\nString result = str.concat("${escapeJavaString(str)}");` };
    }
    case 'valueOf':
      return { output: String(input), javaCode: `String str = "${s}";\nString result = String.valueOf(str);` };
    case 'compareTo': {
      const compare = params.compare || '';
      const minLen = Math.min(input.length, compare.length);
      let diff = 0;
      for (let i = 0; i < minLen; i++) {
        diff = input.charCodeAt(i) - compare.charCodeAt(i);
        if (diff !== 0) break;
      }
      const output = diff !== 0 ? diff : input.length - compare.length;
      return { output, javaCode: `String str = "${s}";\nint result = str.compareTo("${escapeJavaString(compare)}");` };
    }
    case 'matches': {
      const regex = params.regex || '.*';
      let output;
      try { output = new RegExp(`^(?:${regex})$`).test(input); }
      catch { output = 'Invalid regex pattern'; }
      return { output, javaCode: `String str = "${s}";\nboolean result = str.matches("${escapeJavaString(regex)}");` };
    }
    case 'repeat': {
      const n = parseInt(params.count, 10);
      const count = isNaN(n) || n < 0 ? 0 : n;
      return { output: input.repeat(count), javaCode: `String str = "${s}";\nString result = str.repeat(${count});` };
    }
    case 'isBlank':
      return { output: input.trim() === '', javaCode: `String str = "${s}";\nboolean result = str.isBlank();` };
    default:
      throw new Error(`Unknown method: ${method}`);
  }
};

const HIGHLIGHT_RE = /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(\bString\[\]|\bboolean\b|\bchar\b|\bint\b|\bvoid\b|\bString\b)|(\bnew\b|\breturn\b|\bnull\b|\btrue\b|\bfalse\b)|(\b\d+\b)|(\b[a-z][a-zA-Z0-9]*(?=\())/g;
const HIGHLIGHT_COLORS = ['#6b7280', '#86efac', '#fda4af', '#93c5fd', '#fcd34d', '#fb923c', '#c084fc'];

const renderCode = (code) => {
  const parts = [];
  let last = 0;
  let key = 0;
  HIGHLIGHT_RE.lastIndex = 0;
  let match;
  while ((match = HIGHLIGHT_RE.exec(code)) !== null) {
    if (match.index > last) parts.push(<span key={key++}>{code.slice(last, match.index)}</span>);
    const gi = match.slice(1).findIndex((g) => g !== undefined);
    parts.push(<span key={key++} style={{ color: HIGHLIGHT_COLORS[gi] }}>{match[0]}</span>);
    last = match.index + match[0].length;
  }
  if (last < code.length) parts.push(<span key={key++}>{code.slice(last)}</span>);
  return parts;
};

const getInterpretation = (method, input, params, output) => {
  if (typeof output === 'string' && output.startsWith('Invalid regex'))
    return 'The regex pattern is not valid. Try a simpler pattern like \\w+ or [a-z]+.';
  switch (method) {
    case 'length': return `"${input}" contains ${output} character${output !== 1 ? 's' : ''}.`;
    case 'charAt': {
      const i = parseInt(params.index, 10) || 0;
      if (output === '') return `Index ${i} is out of bounds (valid: 0–${input.length - 1}). Java throws StringIndexOutOfBoundsException here.`;
      return `'${output}' is at index ${i}. Tip: Java uses 0-based indexing — the first character is always at index 0.`;
    }
    case 'substring': {
      const s0 = params.start || 0; const e0 = params.end || input.length;
      return `Characters from index ${s0} (inclusive) to ${e0} (exclusive). The character at index ${e0} is NOT included.`;
    }
    case 'indexOf': return output === -1 ? `"${params.search || ''}" was not found — indexOf returns -1 when the substring doesn't exist.` : `"${params.search || ''}" first appears at index ${output}.`;
    case 'lastIndexOf': return output === -1 ? `"${params.search || ''}" was not found.` : `The last occurrence of "${params.search || ''}" is at index ${output}.`;
    case 'contains': return output ? `✓ The string contains "${params.search || ''}".` : `✗ "${params.search || ''}" is not in the string.`;
    case 'startsWith': return output ? `✓ Starts with "${params.prefix || ''}".` : `✗ Does not start with "${params.prefix || ''}".`;
    case 'endsWith': return output ? `✓ Ends with "${params.suffix || ''}".` : `✗ Does not end with "${params.suffix || ''}".`;
    case 'equals': return output ? `✓ The strings are identical (case-sensitive match).` : `✗ Not equal. Remember: "Hello" ≠ "hello" — equals() is case-sensitive.`;
    case 'equalsIgnoreCase': return output ? `✓ Equal when ignoring case.` : `✗ Different even when ignoring case.`;
    case 'toLowerCase': return `All uppercase letters converted to lowercase.`;
    case 'toUpperCase': return `All lowercase letters converted to uppercase.`;
    case 'trim': {
      const removed = input.length - (typeof output === 'string' ? output.length : input.length);
      return removed > 0 ? `${removed} whitespace character(s) removed from the edges. Note: trim() only removes ASCII whitespace (\\t, \\n, space).` : `No leading or trailing whitespace found.`;
    }
    case 'strip': {
      const removed = input.length - (typeof output === 'string' ? output.length : input.length);
      return removed > 0 ? `${removed} character(s) removed. strip() is Unicode-aware — use it instead of trim() in modern Java.` : `No leading or trailing whitespace found.`;
    }
    case 'replace': return `All '${params.oldChar || '?'}' → '${params.newChar || '?'}' replacements made. replace() replaces every occurrence, not just the first.`;
    case 'replaceAll': return `All occurrences matching /${params.regex || ''}/ replaced. replaceAll() takes a regex, not a plain string.`;
    case 'split': return Array.isArray(output) ? `Split into ${output.length} part${output.length !== 1 ? 's' : ''}. The delimiter "${params.delimiter || ' '}" is treated as a regex.` : '';
    case 'concat': return `"${params.str || ''}" appended. In practice, str + "..." is more common — concat() is functionally identical.`;
    case 'valueOf': return `String.valueOf(str) on a String returns itself. It's more useful for non-String types like int or boolean.`;
    case 'compareTo': {
      if (output === 0) return `Lexicographically equal — same characters in the same order.`;
      const sign = output < 0 ? 'before' : 'after';
      return `"${input}" comes ${sign} "${params.compare || ''}" alphabetically. The value (${output}) is the Unicode difference at the first differing character.`;
    }
    case 'matches': return output === true
      ? `✓ Full match! matches() anchors to the entire string (like ^...$). A partial pattern like "Hello" won't match "Hello World".`
      : `✗ No match. Remember: matches() requires the pattern to cover the entire string, not just a part of it.`;
    case 'repeat': {
      const n = parseInt(params.count, 10) || 0;
      return `The string is repeated ${n} time${n !== 1 ? 's' : ''} and concatenated. repeat(0) returns an empty string.`;
    }
    case 'isBlank': return output ? `Blank — empty or only whitespace. isBlank() is more readable than str.trim().isEmpty().` : `Not blank — contains at least one non-whitespace character.`;
    default: return '';
  }
};

const formatOutput = (output) => {
  if (Array.isArray(output)) return `[${output.map((x) => `"${x}"`).join(', ')}]`;
  if (typeof output === 'string') return `"${output}"`;
  return String(output);
};

// ── Component ─────────────────────────────────────────────────────────────

export default function JavaPlayground() {
  const [input, setInput] = useState('Hello World');
  const [selectedMethod, setSelectedMethod] = useState('length');
  const [params, setParams] = useState({});
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleRun = () => {
    try {
      const { output, javaCode } = executeMethod(selectedMethod, input, params);
      const entry = {
        id: `${Date.now()}-${Math.random()}`,
        method: selectedMethod,
        input,
        params,
        output,
        javaCode,
        timestamp: new Date().toLocaleTimeString(),
      };
      setResult(entry);
      setHistory((prev) => [entry, ...prev]);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const handleDownload = () => {
    if (!result || result.error) return;
    const content = ['JavaPlayground Output', '='.repeat(20),
      `Method:     ${result.method}`, `Input:      "${result.input}"`,
      `Parameters: ${JSON.stringify(result.params)}`, `Output:     ${formatOutput(result.output)}`,
      '', 'Java Code:', result.javaCode, '', `Timestamp:  ${result.timestamp}`].join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `playground_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const methodInfo = JAVA_METHODS[selectedMethod];
  const returnType = RETURN_TYPES[selectedMethod];
  const rtStyle = RETURN_TYPE_STYLE[returnType] || {};
  const javaVersion = JAVA_VERSION[selectedMethod];
  const paramHints = PARAM_HINTS[selectedMethod] || {};
  const interpretation = result && !result.error
    ? getInterpretation(result.method, result.input, result.params, result.output)
    : '';

  return (
    <div className="playground">
      <div className="playground-bg" aria-hidden="true">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <span className="bg-symbol" style={{ top: '8%',  left: '4%',  fontSize: '13px', animationDelay: '0s' }}>String str = "Hello";</span>
        <span className="bg-symbol" style={{ top: '18%', left: '78%', fontSize: '12px', animationDelay: '1.2s' }}>int len = str.length();</span>
        <span className="bg-symbol" style={{ top: '35%', left: '2%',  fontSize: '22px', animationDelay: '0.6s' }}>{ '{ }' }</span>
        <span className="bg-symbol" style={{ top: '55%', left: '88%', fontSize: '12px', animationDelay: '2s'  }}>str.toUpperCase()</span>
        <span className="bg-symbol" style={{ top: '70%', left: '5%',  fontSize: '12px', animationDelay: '1.5s' }}>boolean result = true;</span>
        <span className="bg-symbol" style={{ top: '80%', left: '82%', fontSize: '13px', animationDelay: '0.3s' }}>str.split(" ")</span>
        <span className="bg-symbol" style={{ top: '88%', left: '35%', fontSize: '12px', animationDelay: '1.8s' }}>str.indexOf("o")</span>
        <span className="bg-symbol" style={{ top: '45%', left: '93%', fontSize: '20px', animationDelay: '0.9s' }}>[ ]</span>
        <span className="bg-symbol" style={{ top: '25%', left: '48%', fontSize: '11px', animationDelay: '2.4s', opacity: 0.09 }}>// Java String Methods</span>
        <span className="bg-symbol" style={{ top: '62%', left: '60%', fontSize: '10px', animationDelay: '1.1s' }}>str.matches("[A-Z].*")</span>
        <span className="bg-symbol" style={{ top: '14%', left: '28%', fontSize: '10px', animationDelay: '3s'  }}>str.repeat(3)</span>
        <span className="bg-symbol" style={{ top: '75%', left: '42%', fontSize: '120px', animationDelay: '0s', opacity: 0.025, lineHeight: 1 }}>J</span>
      </div>

      <div className="playground-wrapper">
        <header className="playground-header">
          <h1 className="playground-title">JavaPlayground</h1>
          <p className="playground-subtitle">Experiment with Java String methods interactively</p>
        </header>

        <div className="playground-grid">
          {/* ── Block 1: Controls ── */}
          <div>
            {/* Input */}
            <div className="card">
              <span className="card-label">Input String</span>
              <input
                className="field-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a string..."
              />

              {/* Character index ruler */}
              {input.length > 0 && input.length <= 28 && (
                <div className="char-ruler" title="Character index reference (0-based)">
                  {input.split('').map((char, i) => (
                    <div key={i} className="char-ruler-cell">
                      <span className="char-ruler-char">{char === ' ' ? '·' : char}</span>
                      <span className="char-ruler-idx">{i}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* String info chips */}
              <div className="string-info">
                <span className="string-info-chip">{input.length} chars</span>
                {input.length === 0 && <span className="string-info-chip string-info-chip--warn">empty</span>}
                {input.length > 0 && input.trim() === '' && <span className="string-info-chip string-info-chip--warn">blank</span>}
                {input.length > 28 && <span className="string-info-chip string-info-chip--muted">ruler hidden (too long)</span>}
              </div>
            </div>

            {/* Method */}
            <div className="card">
              <div className="method-header">
                <span className="card-label" style={{ marginBottom: 0 }}>Method</span>
                <div className="method-badges">
                  {javaVersion && <span className="badge-version">{javaVersion}</span>}
                  <span
                    className="badge-return"
                    style={{ background: rtStyle.bg, color: rtStyle.color, borderColor: rtStyle.border }}
                  >
                    → {returnType}
                  </span>
                </div>
              </div>

              <select
                className="field-select"
                value={selectedMethod}
                onChange={(e) => { setSelectedMethod(e.target.value); setParams({}); }}
              >
                {Object.entries(JAVA_METHODS).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
              <p className="field-description">{METHOD_EXPLANATIONS[selectedMethod]}</p>

              {methodInfo.params.length > 0 && (
                <div className="params-section">
                  <span className="card-label" style={{ marginBottom: '10px' }}>Parameters</span>
                  {methodInfo.params.map((param) => (
                    <div key={param} className="param-field">
                      <label className="param-label">{param}</label>
                      <input
                        className="field-input"
                        type="text"
                        value={params[param] || ''}
                        onChange={(e) => setParams({ ...params, [param]: e.target.value })}
                        placeholder={`Enter ${param}...`}
                      />
                      {paramHints[param] && (
                        <span className="param-hint">{paramHints[param]}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="run-button" onClick={handleRun}>
              ▶ Run Method
            </button>
          </div>

          {/* ── Block 2: Result ── */}
          <div>
            <div className="card">
              <div className="output-header">
                <h2 className="section-title" style={{ marginBottom: 0 }}>Output</h2>
                <span
                  className="badge-return"
                  style={{ background: rtStyle.bg, color: rtStyle.color, borderColor: rtStyle.border }}
                >
                  → {returnType}
                </span>
              </div>

              {!result ? (
                <div className="result-empty">
                  <div className="result-empty-icon">▷</div>
                  <p>Select a method and click <strong>Run Method</strong></p>
                  <p className="result-empty-sub">The output and Java code will appear here</p>
                </div>
              ) : result.error ? (
                <div className="result-error">
                  <strong>Error:</strong> {result.error}
                </div>
              ) : (
                <>
                  <div className="result-output">
                    <div className="result-output-label">Result</div>
                    <div className="result-value">{formatOutput(result.output)}</div>
                  </div>

                  {interpretation && (
                    <div className="interpretation">
                      <span className="interpretation-icon">💡</span>
                      <span>{interpretation}</span>
                    </div>
                  )}

                  <div className="btn-group">
                    <button
                      className={`btn ${copiedKey === 'output' ? 'btn-copied' : 'btn-copy'}`}
                      onClick={() => handleCopy(
                        Array.isArray(result.output) ? JSON.stringify(result.output) : String(result.output),
                        'output'
                      )}
                    >
                      {copiedKey === 'output' ? '✓ Copied!' : '📋 Copy'}
                    </button>
                    <button className="btn btn-download" onClick={handleDownload}>⬇ Download</button>
                  </div>
                </>
              )}
            </div>

            {result && !result.error && (
              <div className="card">
                <h2 className="section-title">Equivalent Java Code</h2>
                <div className="code-block">{renderCode(result.javaCode)}</div>
                <button
                  className={`btn ${copiedKey === 'code' ? 'btn-copied' : 'btn-copy'}`}
                  onClick={() => handleCopy(result.javaCode, 'code')}
                  style={{ marginTop: '2px' }}
                >
                  {copiedKey === 'code' ? '✓ Copied!' : '📋 Copy Code'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Block 3: History ── */}
        {history.length > 0 && (
          <div className="card card-history">
            <div className="history-header">
              <div className="history-title-row">
                <h2 className="section-title" style={{ marginBottom: 0 }}>Session History</h2>
                <span className="history-count">{history.length}</span>
              </div>
              <button className="btn btn-clear" onClick={() => { setHistory([]); setResult(null); }}>
                🗑 Clear
              </button>
            </div>
            <div className="history-list">
              {history.map((item) => {
                const cat = METHOD_CATEGORY[item.method];
                return (
                  <div
                    key={item.id}
                    className="history-item"
                    onClick={() => { setInput(item.input); setSelectedMethod(item.method); setParams(item.params); setResult(item); }}
                    title="Click to reload this run"
                  >
                    <div className="history-item-top">
                      <span className={`history-badge history-badge--${cat}`}>{cat}</span>
                      <span className="history-method">{item.method}()</span>
                      <span className="history-time">{item.timestamp}</span>
                    </div>
                    <div className="history-io">
                      <span className="history-input">"{item.input}"</span>
                      <span className="history-arrow">→</span>
                      <span className="history-output">{formatOutput(item.output).substring(0, 40)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
