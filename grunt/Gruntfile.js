module.exports = function ( grunt ) {

    var version = '1.0.0';

    grunt.initConfig( {

        pkg : grunt.file.readJSON( 'package.json' ),

        bower: {
            dist: {
                dest     : '../public/core',
                js_dest  : '../public/core/js/',
                css_dest : '../public/core/css',

                options : {
                    packageSpecific : {
                        bootstrap : {
                            dest                  : '../public/core/libs/bootstrap',
                            js_dest               : '../public/core/libs/bootstrap/js',
                            css_dest              : '../public/core/libs/bootstrap/css',
                            map_dest              : '../public/core/libs/bootstrap/css',
                            fonts_dest            : '../public/core/libs/bootstrap/fonts', //covers font types ['svg','eot', 'ttf', 'woff', 'woff2', 'otf']
                            keepExpandedHierarchy : false,
                            stripGlobBase         : false,
                            files                 : [
                                'dist/**/*'
                            ]
                        },
                        jquery : {
                            dest                  : '../public/core/libs/jquery/js',
                            js_dest               : '../public/core/libs/jquery/js',
                            keepExpandedHierarchy : false,
                            stripGlobBase         : true,
                            files                 : [
                                'dist/jquery.min.js',
                                'dist/jquery.min.map'
                            ]
                        }
                    }
                }
            }
        },

        clean : {
            css     : [ '../public/core/css/index.css' ],
            js      : [ '../public/core/js/scripts.js'  ]
        },

        sass : {
            options : {
                style 		: 'expanded',
                sourceMap	:  false
            },
            dist : {
                files : {
                    'tmp/index.css' : 'src/sass/style.scss'
                }
            }
        },

        autoprefixer : {
            options : {
                browsers : [ 'last 2 versions' , 'ie 9', 'ff >= 23' ],
                map      : false
            },
            multiple_files: {
        		expand	: true,
            	flatten	: true,
                src  	: 'tmp/*.css',
                dest 	: '../public/core/css/'		                	
            }
        },

        concat : {
            options : {
            	separator : ';\n'
            },
            dist : {
            	src  :[ 'src/js/index.js' ],
            	dest : '../public/core/js/scripts.js'
            }
        },

        watch : {
            options : {
                livereload : true
            },
            templates : {
                files   : [ '../*.html' ],
                options : {
                    nospawn : true
                }
            },
            styles: {
                files   : [ 'src/sass/*.scss', 'src/sass/**/*.scss'],
                tasks   : [ 'sass', 'autoprefixer' ],
                options : {
                    nospawn : true
                }
            },
            scripts: {
                files   : [ 'src/js/*.js', 'src/js/**/*.js' ],
                tasks   : [ 'concat' ],
                options : {
                    nospawn : true
                }
            }
        },

        shell : {
            deleteFile : {
                command : 'rm *.zip',
                options : {
                    failOnError : false
                }
            }
        }

    } );

    grunt.loadNpmTasks( 'grunt-autoprefixer' );
    grunt.loadNpmTasks( 'grunt-force' );
    grunt.loadNpmTasks( 'grunt-bower' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-sass' );
    grunt.loadNpmTasks( 'grunt-shell' );

    grunt.registerTask( 'init', [
        'force:on',
        'clean',
        'force:off',
        'bower',
        'sass',
        'autoprefixer',
        'concat'
    ] );

    grunt.registerTask( 'default', [ 'init', 'watch' ] );
};