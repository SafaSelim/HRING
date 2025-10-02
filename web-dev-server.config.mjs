export default {
  rootDir: './src',
  nodeResolve: true,
  open: '/employees',
  watch: true,
  appIndex: 'src/index.html',
  historyApiFallback: true,
  plugins: [
    {
      transform(context) {
        if (context.response.is('js')) {
          return context.body.replace(
            /process\.env\.NODE_ENV/g,
            JSON.stringify(process.env.NODE_ENV || 'development')
          );
        }
      }
    }
  ]
};