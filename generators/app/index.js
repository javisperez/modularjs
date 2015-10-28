'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var context = null

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the gnarly ' + chalk.red('Modularjs') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is the name of this app?',
      default: "test"
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
        appname: props.appName
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
      // this.fs.copy(this.templatePath('bowerrc'), this.destinationPath('.bowerrc'));
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
      this.directory(this.templatePath('src/styles'), this.destinationPath('src/styles'));
    },

    fonts: function () {
      this.directory(this.templatePath('src/fonts'), this.destinationPath('src/fonts'));
    },

    images: function () {
      this.directory(this.templatePath('src/images'), this.destinationPath('src/images'));
    }
  },

  install: function () {
    this.installDependencies();
  }
});
