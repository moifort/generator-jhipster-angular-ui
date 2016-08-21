'use strict';
var util = require('util');
var path = require('path');
var fse = require('fs-extra');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var deps = [
    [helpers.createDummyGenerator(), 'jhipster:modules']
];

describe('generator-jhipster-angular-ui:app', function () {
    before(function (done) {
        helpers
        .run(path.join(__dirname, '../generators/app'))
        .inTmpDir(function (dir) {
            fse.copySync(path.join(__dirname, '../test/templates'), dir)
        })
        .withOptions({
            skipInstall: true,
            testmode: true
        })
        .withPrompts({
            modules: 'all'
        })
        .withGenerators(deps)
        .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'src/main/webapp/app/angular-ui/angular-ui.js',
            'src/main/webapp/app/angular-ui/angular-ui.html',
            'src/main/webapp/app/angular-ui/angular-ui.controller.js'
        ]);
    });
});
