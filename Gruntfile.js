module.exports = function (grunt) {
  var urlPath = grunt.cli.options.standalone ? './app/components/global/test-urls.js' : './app/components/global/real-urls.js';
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', {
              'presets': ['es2015']
            }],
            ['jstify']
          ]
        },
        files: {
          './public/app.js': ['./app/initialize.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, cwd: 'app/assets/', src: ['**'], dest: './public/', filter: 'isFile'}
        ]
      },
      urls: {
        files: [
          {src: [urlPath], dest: './app/components/global/urls.js'}
        ]
      }
    },
    browserSync: {
      bsFiles: {
        src : './public/**'
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "./public"
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: 'public'
        }
      }
    },
    watch: {
      scripts: {
        files: ["./app/**"],
        tasks: ["build"]
      }
    },
    less: {
      development: {
        options: {
          paths: ["/app/styles"],
          compress: true
        },
        files: {
          './public/main.css': ['./app/styles/base.less', './app/styles/ribbon.less', './app/styles/common.less', './node_modules/toastr/build/toastr.min.css']
        }
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: true,
        output: {
          comments: false
        }
      },
      development: {
        files: {
          './public/app.js': ['./public/app.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('start', ['build-dev', 'browserSync', 'watch']);
  grunt.registerTask('build-dev', ['copy:urls', 'browserify', 'copy:main', 'less']);
  grunt.registerTask('build', ['build-dev', 'uglify']);
};