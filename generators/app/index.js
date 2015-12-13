'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var jhipster = require('generator-jhipster');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'angular-ui'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.generators.Base.extend({

    templates: function () {
        this.composeWith('jhipster:modules', {
            options: {
                jhipsterVar: jhipsterVar, jhipsterFunc: jhipsterFunc
            }
        });
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.red('JHipster AngularUI') + ' generator!'
        ));

        var prompts = [
            {
                type: 'checkbox',
                name: 'modules',
                message: 'Which module do you like to install on your JHipster application?',
                choices: [
                    {name: 'Font Awesome', value: 'fontAwesome'},
                    {name: 'Awesome Checkbox (+Font Awesome)', value: 'awesomeCheckbox'},
                    {name: 'Switchery', value: 'switchery'},
                    {name: 'slider', value: 'slider'}
                ],
                default: 'none'
            }
        ];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: function () {
        var done = this.async();

        this.baseName = jhipsterVar.baseName;
        this.packageName = jhipsterVar.packageName;
        this.angularAppName = jhipsterVar.angularAppName;
        var webappDir = jhipsterVar.webappDir;

        this.modules = this.props.modules;

        if (this.modules.length === 0) {
            console.log('No module to install.');
            return;
        }

        if (this.modules.indexOf('fontAwesome') != -1) {
            jhipsterFunc.addBowerDependency('font-awesome', '4.5.0');
            jhipsterFunc.addBowerOverride('font-awesome', ['css/font-awesome.css']);
        }

        if (this.modules.indexOf('awesomeCheckbox') != -1) {
            jhipsterFunc.addBowerDependency('awesome-bootstrap-checkbox', '0.3.5');
        }

        if (this.modules.indexOf('switchery') != -1) {
            jhipsterFunc.addBowerDependency('ng-switchery', '1.0.0-alpha7');
            jhipsterFunc.addAngularJsModule('NgSwitchery');
        }

        this.template('src/main/webapp/scripts/app/angular-ui/_angular-ui.controller.js', webappDir + 'scripts/app/angular-ui/angular-ui.controller.js');
        jhipsterFunc.addJavaScriptToIndex('app/angular-ui/angular-ui.controller.js');
        this.template('src/main/webapp/scripts/app/angular-ui/_angular-ui.html', webappDir + 'scripts/app/angular-ui/angular-ui.html');
        this.template('src/main/webapp/scripts/app/angular-ui/_angular-ui.js', webappDir + 'scripts/app/angular-ui/angular-ui.js');
        jhipsterFunc.addJavaScriptToIndex('app/angular-ui/angular-ui.js');
        jhipsterFunc.addElementToMenu('angular-ui', 'tint', false);

        done();
    },

    install: function () {
        this.frontendBuilder = jhipsterVar.frontendBuilder;
        var _injectDependenciesAndConstants = function () {
            switch (this.frontendBuilder) {
                case 'gulp':
                    this.spawnCommand('gulp', ['ngconstant:dev', 'wiredep:test', 'wiredep:app']);
                    break;
                case 'grunt':
                default:
                    this.spawnCommand('grunt', ['ngconstant:dev', 'wiredep']);
            }
        };

        this.installDependencies( { callback: _injectDependenciesAndConstants.bind(this) });
    }
});

