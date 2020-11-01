export default ({ config }) => ({
  ...config,
  extra: {
    API_URL: process.env.REACT_NATIVE_API_URL,
  },
});
