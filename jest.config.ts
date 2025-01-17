import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    }, 
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/src/tests/**/*.(test|spec).ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'ts-jest-mock-import-meta',
              options: { metaObjectReplacement: { url: 'https://www.url.com' } },
            },
          ],
        },
      },
    ],
    '^.+\\.[tj]sx?$': 'babel-jest',  // Use babel-jest for JavaScript/TypeScript files
  },
  transformIgnorePatterns: [
    'node_modules/(?!(ldrs/lib)/)',  // Ensure this correctly targets the module to be transformed
  ],
};

export default config;
