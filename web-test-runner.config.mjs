import { defaultReporter } from '@web/test-runner';
import { fromRollup } from '@web/dev-server-rollup';
import rollupReplace from '@rollup/plugin-replace';

const replace = fromRollup(rollupReplace);

export default {
  files: 'src/**/*.test.js',
  nodeResolve: true,
  coverage: true,
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('test'),
      preventAssignment: true,
    }),
  ],
  reporters: [defaultReporter()],
};