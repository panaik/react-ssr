module.exports = {
  // Tell webpack to run babel on every file it runs through
  // First rule is telling webpack to run babel on only js files
  // react preset will take all of jsx and convert it into normal js function calls
  // stage-0 preset will be needed for handling async code
  // env preset is kind of a master preset that webpack uses
  // env preset tells webpack to run all the transform rules needed to meet the requirements
  // of latest 2 versions of all popular browsers
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            ['env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      }
    ]
  }
};
