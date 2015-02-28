module.exports = function(config){
  config.set({
    //  root path location that will be used to resolve all relative paths in files and exclude sections, should be the root of your project
    basePath : '../',
 
    // files to include, ordered by dependencies
    files : [
      // include relevant Angular files and libs
      'app/libs/angular/angular.js',
      'app/libs/angular-ui-router/release/angular-ui-router.min.js',
      'app/libs/angular-mocks/angular-mocks.js',
      'app/libs/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/libs/oauth-js/dist/oauth.js',
 
      // include js files
      'app/modules/**/script.js',
      'app/modules/**/**/*.js',

      // include unit test specs
      'tests/unit/**/**/*.js'
    ],
    // files to exclude
    exclude : [
      //'app/libs/angular/angular-loader.js',
      //'app/libs/angular/*.min.js',
      //'app/libs/angular/angular-scenario.js'
    ],
 
    // karma has its own autoWatch feature but Grunt watch can also do this
    autoWatch : false,
 
    // testing framework, be sure to install the karma plugin
    frameworks: ['jasmine'],
 
    // browsers to test against, be sure to install the correct karma browser launcher plugin
    browsers : [/*'PhantomJS',*/ 'Chrome'/*, 'Firefox', 'IE'*/],
 
    // progress is the default reporter
    reporters: ['progress', 'coverage'],
 
    // map of preprocessors that is used mostly for plugins
    preprocessors: {
      "app/modules/**/module.js": ['jshint', 'coverage'],
      "app/modules/**/**/*.js": ['jshint', 'coverage'],
      "app/modules/**/**/*.html": "html2js"
    },
 
    coverageReporter: {
      // type of file to output, use text to output to console
      type : 'text',
      // directory where coverage results are saved
      dir: 'tests/test-results/coverage/'
      // if type is text or text-summary, you can set the file name
      // file: 'coverage.txt'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    },

    // list of karma plugins
    plugins : [
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-jshint',
      'karma-ng-html2js-preprocessor'
    ],
    singleRun: true
  });
};