const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@Presentational': path.resolve(__dirname, './src/components/presentational/'),
      '@Store': path.resolve(__dirname, './src/store/'),
      '@Service': path.resolve(__dirname, './src/services/'),
      '@Functional': path.resolve(__dirname, './src/components/functional/'),
      '@App': path.resolve(__dirname, './src/'),
    },
  },
};
