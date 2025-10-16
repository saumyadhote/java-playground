import React, { useState } from 'react';
import { Copy, Download, Trash2, Play } from 'lucide-react';

export default function JavaPlayground() {
  const [input, setInput] = useState('Hello World');
  const [selectedMethod, setSelectedMethod] = useState('length');
  const [params, setParams] = useState({});
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);

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
      let output, javaCode, explanation;
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
    const content = `JavaPlayground Output
====================
Method: ${result.method}
Input: "${result.input}"
Parameters: ${JSON.stringify(result.params)}
Output: ${JSON.stringify(result.output)}

Java Code:
${result.javaCode}

Timestamp: ${result.timestamp}`;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">JavaPlayground</h1>
          <p className="text-indigo-700">Experiment with Java String functions interactively</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* String Input */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Input String</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter a string to test..."
              />
            </div>

            {/* Method Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Method</label>
              <select
                value={selectedMethod}
                onChange={(e) => {
                  setSelectedMethod(e.target.value);
                  setParams({});
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Object.entries(methods).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-600 mt-3">{explanations[selectedMethod]}</p>
            </div>

            {/* Parameters */}
            {methodInfo.params.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Parameters</label>
                <div className="space-y-3">
                  {methodInfo.params.map((param) => (
                    <div key={param}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{param}</label>
                      <input
                        type="text"
                        value={params[param] || ''}
                        onChange={(e) => setParams({ ...params, [param]: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        placeholder={`Enter ${param}...`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Run Button */}
            <button
              onClick={runMethod}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <Play size={20} />
              Run Method
            </button>
          </div>

          {/* Result Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Result</h2>
              {result ? (
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded border border-indigo-200">
                    <p className="text-xs font-semibold text-gray-600 mb-1">OUTPUT:</p>
                    <p className="font-mono text-sm text-indigo-900 break-all">
                      {typeof result.output === 'string'
                        ? `"${result.output}"`
                        : Array.isArray(result.output)
                        ? `[${result.output.map((x) => `"${x}"`).join(', ')}]`
                        : String(result.output)}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        typeof result.output === 'object'
                          ? JSON.stringify(result.output)
                          : String(result.output)
                      )
                    }
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
                  >
                    <Copy size={16} />
                    Copy
                  </button>
                  <button
                    onClick={downloadResult}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm font-medium"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Run a method to see results</p>
              )}
            </div>
          </div>
        </div>

        {/* Java Code Panel */}
        {result && !result.error && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Equivalent Java Code</h2>
            <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
              <pre>{result.javaCode}</pre>
            </div>
            <button
              onClick={() => copyToClipboard(result.javaCode)}
              className="mt-3 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm font-medium flex items-center gap-2"
            >
              <Copy size={16} />
              Copy Code
            </button>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">History</h2>
              <button
                onClick={clearHistory}
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium flex items-center gap-2"
              >
                <Trash2 size={16} />
                Clear
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-3 rounded border border-gray-200 text-sm cursor-pointer hover:bg-indigo-50 transition"
                  onClick={() => {
                    setInput(item.input);
                    setSelectedMethod(item.method);
                    setParams(item.params);
                    setResult(item);
                  }}
                >
                  <p className="font-semibold text-gray-700">{item.method}</p>
                  <p className="text-gray-600 text-xs">Input: "{item.input}"</p>
                  <p className="text-indigo-600 text-xs">
                    {typeof item.output === 'object'
                      ? JSON.stringify(item.output)
                      : String(item.output).substring(0, 50)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}