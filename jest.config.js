export default {
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest', // Transform JS/TS files using babel-jest
    },
    moduleFileExtensions: ['js', 'jsx', 'mjs'],
    testMatch: ['**/__tests__/**/*.?(m)[jt]s?(x)', '**/?(*.)+(spec|test).?(m)[jt]s?(x)'],
  };
  