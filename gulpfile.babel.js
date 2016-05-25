// generated on 2016-05-25 using generator-webapp 2.1.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

var httpProxy = require('http-proxy'),
    connect = require('gulp-connect-php'),
    cache = require('gulp-cache');

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

//
// handlesbars
//

gulp.task('templates', () => {
  return gulp.src('app/templates/**/*.hbs')
    .pipe($.handlebars())
    .pipe($.defineModule('plain'))
    .pipe($.declare({
      namespace: 'MyApp.templates' // change this to whatever you want
    }))
    .pipe(gulp.dest('.tmp/templates'));
});

gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles','templates'], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
    return gulp.src('app/img/**/*')
    .pipe($.cache($.imagemin({
        verbose: true,
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
        svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    'app/**/*.php',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('php-serve', ['styles', 'fonts'], function () {
    connect.server({
        port: 9001,
        base: 'app',
        open: false,
        directives: {
            'error_log': require('path').resolve('logs/error.log')
        }
    });

    var proxy = httpProxy.createProxyServer({});

    browserSync({
        notify: false,
        port  : 9000,
        server: {
            baseDir   : ['.tmp', 'app'],
            routes    : {
                '/bower_components': 'bower_components'
            },
            middleware: function (req, res, next) {
                var url = req.url;

                if (!url.match(/^\/(styles|fonts|bower_components)\//)) {
                    proxy.web(req, res, { target: 'http://127.0.0.1:9001' });
                } else {
                    next();
                }
            }
        }
    });

    // watch for changes
    gulp.watch([
        'app/*.html',
        'app/**/*.php',
        'app/scripts/**/*.js',
        'app/img/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);

    
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/templates/**/*.hbs', ['templates', reload]);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);

});

gulp.task('php-serve:dist', () => {
}); 


gulp.task('serve', ['styles', 'templates', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/img/**/*',
    '.tmp/templates/**/*.js',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/templates/**/*.hbs', ['templates', reload]);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);

});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {

  gulp.src('app/styles/*.scss')
  .pipe(wiredep({
    ignorePath: /^(\.\.\/)+/
  }))
  .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
  .pipe(wiredep({
    ignorePath: /^(\.\.\/)*\.\./
  }))
  .pipe(gulp.dest('app'));

  gulp.src('app/**/*.php')
  .pipe(wiredep({
    ignorePath: /^(\.\.\/)*\.\./
  }))
  .pipe(gulp.dest('app'));

});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
