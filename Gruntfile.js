module.exports = function(grunt) {

grunt.initConfig({
  concat: {
    options: {
      separator: '',
    },
    dist: {
      src: ['src/front/js/utils/iife-intro.js','src/front/js/src/*','src/front/js/utils/iife-outtro.js'],
      dest: 'public/js/website.js',
    },
  },
  copyto : {
      html : {
        files : [
          {
            expand : true,
            dest   : 'public',
            cwd    : 'src/front',
            src    : [
              '**/*.html'
            ]
          }
        ]
      },
      css : {
        files : [
          {
            expand : true,
            dest   : 'public',
            cwd    : 'src/front',
            src    : [
              '**/*.css'
            ]
          }
        ]
      },
      img : {
        files : [
          {
            expand : true,
            dest   : 'public',
            cwd    : 'src/front',
            src    : [
              'img/*'
            ]
          }
        ]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/front/css',
          src: ['*.css', '!*.min.css'],
          dest: 'public/css',
          ext: '.min.css'
        },
        {
          'public/css/release.min.css': ['src/front/css/*.css']
        }]
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/js/website.min.js': ['public/js/website.js']
        }
      }
    }
});

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-copy-to');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['concat', 'copyto', 'cssmin', 'uglify']);

};