'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var context = null;

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the gnarly ' + chalk.yellow('ModularJS') + ' generator!' +
      '\nPlease notice that this generator '+chalk.red('won\'t create a container folder,')+' so, files will be created on the cwd.'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is the name of this app?'
    }, {
      type: 'list',
      name: 'bootstrap',
      message: 'Which UI framework do you want?',
      choices: ['Bootstrap', 'Material', 'None'],
      default: 'Bootstrap'
    }, {
      type: 'confirm',
      name: 'e2e',
      message: 'Would you like to use E2E tests?',
      default: true
    }, {
      type: 'confirm',
      name: 'unitTest',
      message: 'Would you like to use Unit Testing?',
      default: true
    }];

    this.prompt(prompts, function (props) {

      this.props = props;

      context = {
        appname: props.appName,
        uiFramework: props.bootstrap
      };

      done();

    }.bind(this));
  },

  writing: {

    basics: function () {

      this.fs.copyTpl(this.templatePath('gitignore'), this.destinationPath('.gitignore'), context);
      this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), context);
      this.fs.copyTpl(this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js'), context);
      this.fs.copyTpl(this.templatePath('_bower.json'), this.destinationPath('bower.json'), context);

      this.fs.copy(this.templatePath('jshintrc'), this.destinationPath('.jshintrc'));
      this.fs.copy(this.templatePath('jscsrc'), this.destinationPath('.jscsrc'));
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
      this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
      this.fs.copy(this.templatePath('protractor.conf.js'), this.destinationPath('protractor.conf.js'));

    },

    tests: function () {

      if (this.props.e2e) {
        this.directory(this.templatePath('e2e'), this.destinationPath('e2e'));
      }

    },

    gulp: function () {

      this.fs.copyTpl(this.templatePath('gulp/build.js'), this.destinationPath('gulp/build.js'), context);

      this.fs.copy(this.templatePath('gulp/inject.js'), this.destinationPath('gulp/inject.js'));
      this.fs.copy(this.templatePath('gulp/jscs.js'), this.destinationPath('gulp/jscs.js'));
      this.fs.copy(this.templatePath('gulp/jshint.js'), this.destinationPath('gulp/jshint.js'));
      this.fs.copy(this.templatePath('gulp/server.js'), this.destinationPath('gulp/server.js'));
      this.fs.copy(this.templatePath('gulp/styles.js'), this.destinationPath('gulp/styles.js'));
      this.fs.copy(this.templatePath('gulp/watch.js'), this.destinationPath('gulp/watch.js'));

      if (this.props.unitTest) {
        this.fs.copy(this.templatePath('gulp/unit-tests.js'), this.destinationPath('gulp/unit-tests.js'));
      }

      if (this.props.e2e) {
        this.fs.copy(this.templatePath('gulp/e2e-tests.js'), this.destinationPath('gulp/e2e-tests.js'));
      }

    },

    src: function () {

      this.fs.copyTpl(this.templatePath('src/_index.html'), this.destinationPath('src/index.html'), context);
      this.fs.copyTpl(this.templatePath('src/app/App.js'), this.destinationPath('src/app/App.js'), context);

      this.fs.copy(this.templatePath('src/app/Config.js'), this.destinationPath('src/app/Config.js'));

      this.directory(this.templatePath('src/app/header'), this.destinationPath('src/app/header'));
      this.directory(this.templatePath('src/app/footer'), this.destinationPath('src/app/footer'));
      this.directory(this.templatePath('src/app/home'), this.destinationPath('src/app/home'));

    },

    styles: function () {

      if (context.uiFramework !== 'None')
      {

        this.fs.copy(this.templatePath('src/styles/_base.scss'), this.destinationPath('src/styles/_base.scss'));
        this.fs.copy(this.templatePath('src/styles/_config.scss'), this.destinationPath('src/styles/_config.scss'));
        this.fs.copy(this.templatePath('src/styles/_footer.scss'), this.destinationPath('src/styles/_footer.scss'));
        this.fs.copy(this.templatePath('src/styles/_header.scss'), this.destinationPath('src/styles/_header.scss'));
        this.fs.copy(this.templatePath('src/styles/_reset.scss'), this.destinationPath('src/styles/_reset.scss'));

        if (context.uiFramework == 'Material') {
            this.fs.copy(this.templatePath('src/styles/_icons.scss'), this.destinationPath('src/styles/_icons.scss'));
        }

        this.fs.copyTpl(this.templatePath('src/styles/main.scss'), this.destinationPath('src/styles/main.scss'), context);

      }


    },

    fonts: function () {

      if (context.uiFramework !== 'None')
      {

        if (context.uiFramework == 'Bootstrap') {
          this.fs.copy(this.templatePath('src/fonts/readme'), this.destinationPath('src/fonts/readme'));
        } else {
          this.fs.copy(this.templatePath('src/fonts/MaterialIcons-Regular.eot'), this.destinationPath('src/fonts/MaterialIcons-Regular.eot'));
          this.fs.copy(this.templatePath('src/fonts/MaterialIcons-Regular.ijmap'), this.destinationPath('src/fonts/MaterialIcons-Regular.ijmap'));
          this.fs.copy(this.templatePath('src/fonts/MaterialIcons-Regular.ttf'), this.destinationPath('src/fonts/MaterialIcons-Regular.ttf'));
          this.fs.copy(this.templatePath('src/fonts/MaterialIcons-Regular.woff'), this.destinationPath('src/fonts/MaterialIcons-Regular.woff'));
          this.fs.copy(this.templatePath('src/fonts/MaterialIcons-Regular.woff2'), this.destinationPath('src/fonts/MaterialIcons-Regular.woff2'));
        }

      }

    },

    images: function () {

      this.directory(this.templatePath('src/images'), this.destinationPath('src/images'));

    }
  },

  install: function () {
    var done = this.async();

    this.prompt({
        type: 'confirm',
        default: true,
        message: 'Do you want me to install the dependencies for you? (if failed, please try again with SUDO)',
        name: 'installDependencies'
    }, function (props) {
        if (props.installDependencies) {
            this.installDependencies();
        } else {
            this.log(
                chalk.bold.red('IMPORTANT: ')+'You choosed to install your dependencies manually, so run '+chalk.yellow('`npm install && bower install`')+' to do so.'
            );
        }

        done();
    }.bind(this));
  },

  end: function () {

    var top = this;

    this.on('end', function () {
        top.log(
            '\n'+
            chalk.bold.green('We\'re done!') + ' everything was great!\n' +
            'Now, to run a development server with this app run '+chalk.yellow('`gulp serve`')+'.\n'+
            '\n'+
            'To generate a new empty module run the subgenerator '+chalk.yellow('yo modularjs:module')+ '\n'+
            'it will ask you what you want to use and generate the new folder structure for a blank module.'
        );
    });
  }
});
