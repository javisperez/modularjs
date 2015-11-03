'use strict';

var yeoman  = require('yeoman-generator');
var chalk   = require('chalk');
var yosay   = require('yosay');
var _       = require('lodash');
var path    = require('path');
var wiring  = require("html-wiring");
var appPath = null;
var context = null;

module.exports = yeoman.generators.Base.extend({

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Ok, great, we\'re gonna generate a new ' + chalk.red('module')
        ));

        var prompts = [{
                name: 'moduleName',
                message: 'Whats the name for this module?',
                default: 'Unnamed'
            },
            {
                type: 'number',
                name: 'services',
                message: 'How many AngularJS services will this module have?',
                default: 0
                },{
                    when: function (response) {
                        return response.services;
                    },
                    type: 'input',
                    name: 'servicesNames',
                    message: 'What are the name of the services? (comma separated)',
                },
            {
                type: 'number',
                name: 'resources',
                message: 'How many AngularJS resources will this module have?',
                default: 0
                },{
                    when: function (response) {
                        return response.resources;
                    },
                    type: 'input',
                    name: 'resourcesNames',
                    message: 'What are the name of the resources? (comma separated)',
                },
            {
                type: 'number',
                name: 'directives',
                message: 'How many AngularJS directives will this module have?',
                default: 0
                },{
                    when: function (response) {
                        return response.directives;
                    },
                    type: 'input',
                    name: 'directivesNames',
                    message: 'What are the name of the directives? (comma separated)'
            }];

        this.prompt(prompts, function (props) {

        this.props = props;

        context = {
            moduleName:      props.moduleName,
            camelCaseName:   _.camelCase(props.moduleName),
            studlyName:      _.startCase(props.moduleName).replace(/\s/g, ''),
            slugName:        _.kebabCase(props.moduleName),
            folderName:      _.camelCase(props.moduleName).toLowerCase(),
            capitalizedName: _.capitalize(this.props.moduleName),
            lowercaseName:   props.moduleName.toLowerCase(),

            services:        props.services,
            directive:       props.directives,
            resources:       props.resources,

            names:           {
                services:   (props.servicesNames)   ? props.servicesNames.split(',')   : [],
                resources:  (props.resourcesNames)  ? props.resourcesNames.split(',')  : [],
                directives: (props.directivesNames) ? props.directivesNames.split(',') : [],
            }
        };

        done();

        }.bind(this));
    },

    generate: function () {

        var top = this;

        appPath = this.destinationPath();

        if (appPath.indexOf('/src') > -1) {
            appPath = appPath.substr(0, appPath.indexOf('/src'));
        }

        // The main module file
        this.fs.copyTpl(this.templatePath('module/_module.js'), path.join(appPath, 'src/app/'+context.folderName+'/'+context.studlyName+'.js'), context);

        // View
        this.fs.copy(this.templatePath('module/Views/_view.html'), path.join(appPath, 'src/app/'+context.folderName+'/Views/'+context.studlyName+'.html'));

        // The Controller for this module
        this.fs.copyTpl(this.templatePath('module/Controllers/_controller.js'), path.join(appPath, 'src/app/'+context.folderName+'/Controllers/'+context.studlyName+'.js'), context);

        // Services
        if (this.props.services) {
            context.names.services.forEach(function (service) {
                var ctx = {
                    moduleName: context.camelCaseName,
                    serviceName: _.camelCase(service),
                    studly: _.startCase(service).replace(/\s/g, '')
                };

                top.fs.copyTpl(top.templatePath('module/Services/_service.js'), path.join(appPath, 'src/app/'+context.folderName+'/Services/'+ctx.studly+'.js'), ctx);
            });
        }

        // Resources
        if (this.props.resources) {
            context.names.resources.forEach(function (resource) {
                var ctx = {
                    moduleName: context.camelCaseName,
                    resourceName: _.camelCase(resource),
                    studly: _.startCase(resource).replace(/\s/g, '')
                };

                top.fs.copyTpl(top.templatePath('module/Resources/_resource.js'), path.join(appPath, 'src/app/'+context.folderName+'/Resources/'+ctx.studly+'.js'), ctx);
            });
        }

        // Directives
        if (this.props.directives) {
            context.names.directives.forEach(function (directive) {
                var ctx = {
                    moduleName: context.camelCaseName,
                    directiveName: _.camelCase(directive),
                    studly: _.startCase(directive).replace(/\s/g, ''),
                    folderName: context.folderName
                };

                top.fs.copyTpl(top.templatePath('module/Directives/_directive.js'), path.join(appPath, 'src/app/'+context.folderName+'/Directives/'+ctx.studly+'.js'), ctx);
            });
        }
    },

    end: function () {

        var regex      = /(angular\.module\()(.*\[)((.|[\r\n])*?)\]\)(.*)/g;

        var input      = wiring.readFileAsString(path.join(appPath, 'src/app/App.js'));

        var matches    = regex.exec(input);

        var replaced   = matches[0].replace('\n\n])', ',\n    \''+context.camelCaseName+'\'\n\n])');

        var newContent = input.replace(matches[0], replaced);

        var done       = this.async();

        this.prompt({
            type:    'confirm',
            name:    'addToApp',
            message: 'Do you want me to add the new module to the App.js as dependency?',
            default: true
        }, function (answer) {

            this.log('\nYour module '+chalk.bold.yellow(context.moduleName)+' has been generated.\n');

            if (answer.addToApp) {
                // force the overwrite
                this.conflicter.force = true;

                // Write the new module to App.js
                this.write(path.join(appPath, 'src/app/App.js'), newContent);

                this.log('I\'ve added the new module as dependency in your App.js file for you. Enjoy now!');
            } else {
                this.log('You should add:'+'\n\t\''+context.camelCaseName+'\'\n'+'In the file: '+chalk.yellow('src/app/App.js')+', as a dependency');
            }

            done();

        }.bind(this));
    }

});
