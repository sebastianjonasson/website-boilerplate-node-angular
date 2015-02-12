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
    }
});

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-copy-to');

  grunt.registerTask('build', ['concat', 'copyto']);

};