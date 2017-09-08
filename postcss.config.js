const autoprefixer = require('autoprefixer');

module.exports = {
  parser: false,
  plugins: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],
};
