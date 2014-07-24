var fs = require('fs');

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var srcScripts = [
		'src/templates/step.html.js',
		'src/templates/wizard.html.js',
		'src/wizard.js'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dist: 'dist',
        filename: 'angular-wiz',
        meta: {
            banner: [
                '/**',
                ' * <%= pkg.description %>',
                ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>' +
                ' * @link <%= pkg.homepage %>',
                ' * @author <%= pkg.author.name %> - <%= pkg.author.email %>',
                ' * @license MIT License, http://www.opensource.org/licenses/MIT',
                ' */\n'
			].join('\n')
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'src/*.js'],
                options: {
                    jshintrc: true,
                    globalstrict: true,
                    globals: {
                        require: false,
                        __dirname: false,
                        exports: false
                    }
                }
            }
        },
        concat: {
            dist: {
                options: {
                    banner: '<%= meta.banner %><%= meta.modules %>\n'
                },
                src: srcScripts,
                dest: '<%= dist %>/<%= filename %>.js'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        },
        html2js: {
            dist: {
                options: {
                    base: '.',
                    module: 'angular-wiz.templates'
                },
                files: [{
                    expand: true,
                    src: ['templates/*.html'],
                    dest: 'src',
                    ext: '.html.js'
                }]
            }
        },
        uglify: {
            options: {
                mangle: false,
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    '<%= dist %>/<%= filename %>.min.js': [
						'<%= dist %>/<%= filename %>.js',
                    ]
                }
            }
        },
        copy: {
            examples: {
                src: 'dist/<%= filename %>.js',
                dest: 'demo/lib/<%= filename %>.js'
            }
        },
        bowercopy: {
            examples: {
                options: {
                    destPrefix: 'demo/lib'
                },

                files: {
                    'angular.js': 'angular/angular.js'
                }
            }
        },
        connect: {
            example: {
                options: {
                    keepalive: true,
                    port: 8881,
                    hostname: '*',
                    open: 'http://localhost:8881',
                    base: 'demo'
                }
            }
        }
    });

    grunt.option('force', true);

    grunt.registerTask('default', ['jshint', 'html2js', 'concat', 'uglify']);

    grunt.registerTask('test', ['default', 'karma:unit']);

    grunt.registerTask('demo', ['default', 'copy:examples', 'bowercopy:examples', 'connect:example']);
};
