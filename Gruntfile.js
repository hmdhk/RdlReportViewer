module.exports = function (grunt) {

    grunt.initConfig({
        concurrent: {
            dev: {
                tasks: ['watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['scripts/**/*.ts'],
                tasks: ['ts:build'],
                options: {
                    spawn: false,
                },
            },
            views: {
                files: ['views/**/*.html'],
                tasks: ['copy'],
                options: {
                    spawn: false,
                },
            },
        },
        copy: {
            main: {
                files: [
                    {
                        src: ['views/RdlReportViewer.html'],
                        dest: 'dist/RdlReportViewer/RdlReportViewer.html',

                    },{
                        src: ['views/launcher.html'],
                        dest: 'dist/launcher.html',

                    }, {
                        src: ['**/*'],
                        dest: 'dist/RdlReportViewer/views',
                        expand: true,
                        cwd: 'views/RdlReportViewer',
                    }

                ]

            },
        },
        ts: {
            build: {
                src: ["scripts/**/*.ts"],
                //reference: "./references.ts",
                out: 'dist/RdlReportViewer/RdlReportViewer.js',
                options: {
                    target: 'es3',
                    module: 'commonjs',
                    removeComments: true
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['concurrent']);
}