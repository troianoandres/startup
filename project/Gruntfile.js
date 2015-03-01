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
          "./app/libs/angular-ui-router/release/angular-ui-router.min.js",
          "./app/libs/jquery/dist/jquery.min.js",
          "./app/libs/oauth-js/dist/oauth.js",
          "./app/libs/bootstrap/dist/js/bootstrap.js",
          "./app/libs/angular-bootstrap/ui-bootstrap-tpls.js",
          "./app/modules/twitter/script.js",
          "./app/modules/twitter/services/TwitterService.js",
          "./app/modules/twitter/directives/TwitterTweet.js",
          "./app/modules/twitter/controllers/TwitterTweetController.js",
          "./app/modules/home/script.js",
          "./app/modules/home/controllers/HomeIndexController.js",
          "./app/modules/home/controllers/HomeTimelineController.js",
          "./app/modules/profile/script.js",
          "./app/modules/profile/controllers/ProfileIndexController.js",
          "./app/modules/profile/controllers/ProfileTimelineController.js",
          "./app/modules/trends/script.js",
          "./app/modules/trends/controllers/HomeController.js",        
          "./app/modules/main/script.js"
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
          "./app/css/*"
        ],
        tasks: ["developmentCSS"]
      },
      scripts: {
        files: [
          "./app/modules/**/*"
        ],
        tasks: ["developmentJS"]
      },
      test: {
        files: [
          "./test/unit/**/*"
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
 
  
  grunt.registerTask("developmentJS", [
    "concat:modules",
    "uglify"
  ]);

  grunt.registerTask("developmentCSS", [
    "concat:css",
    "cssmin"
  ]);

  grunt.registerTask('test:unit', [
    "karma:unit"
  ]);

};