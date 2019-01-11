module.exports = {
  'roots': [
    '<rootDir>/',
  ],
  'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  'setupFiles': [
    './tests/setup.js',
  ],
};
