'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'AngularUI'};

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
            'Welcome to the ' + chalk.red('JHipster AngularUI') + ' generator! ' + chalk.yellow('v' + packagejs.version)
        ));

        var prompts = [
            {
                type: 'checkbox',
                name: 'modules',
                message: 'Which module do you like to install on your JHipster application?',
                choices: [
                    {name: 'Install all modules', value: 'all'},
                    {name: 'Font Awesome', value: 'fontAwesome'},
                    {name: 'Awesome Bootstrap Checkbox (+Font Awesome)', value: 'awesomeBootstrapCheckbox'},
                    {name: 'NGSwitchery', value: 'switchery'},
                    {name: 'Angular Bootstrap Slider', value: 'angularBootstrapSlider'}
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
            this.log(chalk.yellow('No module to install'));
            done();
            return;
        }

        // Before install
        var installAll = (this.modules.indexOf('all') !== -1);
        var installFontAwesome = (this.modules.indexOf('awesomeBootstrapCheckbox') !== -1);

        // Install
        this.buildFontAwesomeSample = false;
        if (installAll || installFontAwesome || this.modules.indexOf('fontAwesome') !== -1) {
            jhipsterFunc.addBowerDependency('font-awesome', '4.5.0');
            jhipsterFunc.addBowerOverride('font-awesome', ['css/font-awesome.css']);
            this.buildFontAwesomeSample = true;
        }

        this.buildAwesomeBootstrapCheckboxSample = false;
        if (installAll || this.modules.indexOf('awesomeBootstrapCheckbox') !== -1) {
            jhipsterFunc.addBowerDependency('awesome-bootstrap-checkbox', '0.3.5');
            this.buildAwesomeBootstrapCheckboxSample = true;
        }

        this.buildSwitcherySample = false;
        if (installAll || this.modules.indexOf('switchery') !== -1) {
            jhipsterFunc.addBowerDependency('ng-switchery', '1.0.0-alpha7');
            jhipsterFunc.addAngularJsModule('NgSwitchery');
            this.buildSwitcherySample = true;
        }

        this.buildAngularBootstrapSliderSample = false;
        if (installAll || this.modules.indexOf('angularBootstrapSlider') !== -1) {
            jhipsterFunc.addBowerDependency('angular-bootstrap-slider', '0.1.21');
            jhipsterFunc.addAngularJsModule('ui.bootstrap-slider');
            this.buildAngularBootstrapSliderSample = true;
        }

        // Sample page
        this.template('src/main/webapp/scripts/app/angular-ui/_angular-ui.controller.js', webappDir + 'scripts/app/angular-ui/angular-ui.controller.js');
        jhipsterFunc.addJavaScriptToIndex('app/angular-ui/angular-ui.controller.js');
        this.template('src/main/webapp/scripts/app/angular-ui/_angular-ui.html', webappDir + 'scripts/app/angular-ui/angular-ui.html');
        this.template('src/main/webapp/scripts/app/angular-ui/_angular-ui.js', webappDir + 'scripts/app/angular-ui/angular-ui.js');
        jhipsterFunc.addJavaScriptToIndex('app/angular-ui/angular-ui.js');
        jhipsterFunc.addElementToMenu('angular-ui', 'tint', false);

        done();
    },

    install: function () {
        if (this.modules.length === 0) return;

        this.frontendBuilder = jhipsterVar.frontendBuilder;
        var injectDependenciesAndConstants = function () {
            switch (this.frontendBuilder) {
                case 'gulp':
                    this.spawnCommand('gulp', ['ngconstant:dev', 'wiredep:test', 'wiredep:app']);
                    break;
                case 'grunt':
                default:
                    this.spawnCommand('grunt', ['ngconstant:dev', 'wiredep']);
            }
        };

        this.installDependencies({callback: injectDependenciesAndConstants.bind(this)});
    }
});
