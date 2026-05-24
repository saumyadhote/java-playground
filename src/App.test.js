import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

const getResultValue = () => document.querySelector('.result-value');

const runMethod = (method, paramOverrides = {}) => {
  const select = screen.getByRole('combobox');
  fireEvent.change(select, { target: { value: method } });
  Object.entries(paramOverrides).forEach(([placeholder, value]) => {
    const input = screen.getByPlaceholderText(new RegExp(placeholder, 'i'));
    fireEvent.change(input, { target: { value } });
  });
  fireEvent.click(screen.getByRole('button', { name: /run method/i }));
};

test('renders the JavaPlayground heading', () => {
  render(<App />);
  expect(screen.getByText('JavaPlayground')).toBeInTheDocument();
});

test('runs length method and displays correct result', () => {
  render(<App />);
  runMethod('length');
  expect(getResultValue()).toHaveTextContent('11');
});

test('runs toUpperCase and shows uppercase output', () => {
  render(<App />);
  runMethod('toUpperCase');
  expect(getResultValue()).toHaveTextContent('"HELLO WORLD"');
});

test('matches() anchors to full string — partial match returns false', () => {
  render(<App />);
  runMethod('matches', { regex: 'Hello' });
  expect(getResultValue()).toHaveTextContent('false');
});

test('matches() returns true when full string matches pattern', () => {
  render(<App />);
  runMethod('matches', { regex: 'Hello World' });
  expect(getResultValue()).toHaveTextContent('true');
});

test('compareTo() returns 0 for equal strings', () => {
  render(<App />);
  runMethod('compareTo', { compare: 'Hello World' });
  expect(getResultValue()).toHaveTextContent('0');
});

test('compareTo() returns non-zero for different strings', () => {
  render(<App />);
  runMethod('compareTo', { compare: 'hello world' });
  // 'H' (72) vs 'h' (104) → -32
  expect(getResultValue()).toHaveTextContent('-32');
});

test('shows invalid-regex output in the result box', () => {
  render(<App />);
  runMethod('replaceAll', { regex: '[invalid' });
  expect(document.querySelector('.result-output')).toHaveTextContent('Invalid regex pattern');
});

test('shows interpretation tip after running a method', () => {
  render(<App />);
  runMethod('length');
  expect(document.querySelector('.interpretation')).toBeInTheDocument();
});

test('char ruler appears for short strings', () => {
  render(<App />);
  runMethod('length');
  expect(document.querySelector('.char-ruler')).toBeInTheDocument();
});

test('history records an entry after running a method', () => {
  render(<App />);
  runMethod('length');
  expect(document.querySelector('.history-item')).toBeInTheDocument();
});

test('history item shows method name and io values', () => {
  render(<App />);
  runMethod('length');
  const item = document.querySelector('.history-item');
  expect(within(item).getByText('length()')).toBeInTheDocument();
});

test('clears history when Clear is clicked', () => {
  render(<App />);
  runMethod('length');
  fireEvent.click(screen.getByRole('button', { name: /clear/i }));
  expect(document.querySelector('.history-item')).not.toBeInTheDocument();
});
