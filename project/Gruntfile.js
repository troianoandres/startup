'use strict';
 
module.exports = function(grunt) {
 
  // configure grunt
  grunt.initConfig({
 
    pkg: grunt.file.readJSON('package.json'),
  
    uglify: {
      modules: {
        files: {
          './app/dist/js/app.min.js': ['./app/dist/js/app.js']
        }
      },
      options: {
        sourceMap: true
      }
    },

    cssmin: {
      compress: {
        files: {
          "./app/dist/css/app.min.css": ["./app/dist/css/app.css"]
        }
      }
    },

    concat: {
      css: {
        src: [
          "./app/libs/bootstrap/dist/css/bootstrap.css",
          "./app/css/layout.css",
          "./app/css/style.css",
          "./app/css/modules.css"
        ],
        dest: "./app/dist/css/app.css"
      },
      modules: {
        src: [
          "./app/libs/angular/angular.js",
          "./app/libs/angular-ui-router/release/angular-ui-router.js",
          "./app/libs/angular-cookies/angular-cookies.js",
          "./app/libs/jquery/dist/jquery.js",
          "./app/js/jquery-transport-fix.js",
          "./app/libs/oauth-js/dist/oauth.js",
          "./app/libs/bootstrap/dist/js/bootstrap.js",
          "./app/libs/angular-bootstrap/ui-bootstrap-tpls.js",
          "./app/modules/home/script.js",
          "./app/modules/home/controllers/HomeIndexController.js",
          "./app/modules/home/controllers/HomeTimelineController.js",
          "./app/modules/profile/script.js",
          "./app/modules/profile/controllers/ProfileIndexController.js",
          "./app/modules/profile/controllers/ProfileTimelineController.js",
          "./app/modules/trends/script.js",
          "./app/modules/trends/controllers/HomeController.js",        
          "./app/modules/main/script.js",
          "./app/modules/main/services/TwitterService.js",
          "./app/modules/main/directives/TwitterTweet.js",
          "./app/modules/main/controllers/AppController.js",
          "./app/modules/main/controllers/AccessController.js",
          "./app/modules/main/controllers/AccessLoginController.js",
          "./app/modules/main/controllers/AccessLoginCallbackController.js",
          "./app/modules/main/controllers/TwitterTweetController.js"          
        ],
        dest: "./app/dist/js/app.js"
      }
    },    
    
    karma: {
      unit: {
        configFile: './test/karma-unit.conf.js',
        singleRun: true
      }
    },
    
    watch: {
      css: {
        files: [
          "./app/css/*.css"
        ],
        tasks: ["css"]
      },
      scripts: {
        files: [
          "./app/modules/**/*.js",
          "./app/modules/**/**/*.js"
        ],
        tasks: ["js"]
      },
      test: {
        files: [
          "./test/unit/**/*",
          "./app/modules/**/*.js",
          "./app/modules/**/**/*.js"
        ],
        tasks: ["test:unit"]
      }
    }

  });
 
  // Load plug-ins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
 
  
  grunt.registerTask("js", [
    "concat:modules",
    "uglify"
  ]);

  grunt.registerTask("css", [
    "concat:css",
    "cssmin"
  ]);

  grunt.registerTask('test:unit', [
    "karma:unit"
  ]);

};