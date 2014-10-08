'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');

var JpostGenerator = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        var prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'Your post name'
            },
            {
                type: 'input',
                name: 'categories',
                message: 'Categories'
            }
        ];

        this.prompt(prompts, function (props) {
            this.name = props.name;
            this.categories = props.categories;

            done();
        }.bind(this));
    },

    variables: function () {
        var date = new Date();
        var dateString = date.toISOString().split('T')[0];
        var nameLowercased = this.name.toLowerCase(); // to prevent incorrect dashed "U" -> "-U", "u" -> "u"
        var nameDasherized = _s.dasherize(nameLowercased);
        this.postFileName = dateString + '-' + nameDasherized + ".markdown";

        this.postName = _s.titleize(this.name);
        this.date = date.toISOString().split('T')[0];
        this.time = (date.toISOString().split('T')[1]).split('.')[0];
    },

    writing: {
        app: function () {
            this.dest.mkdir('_posts');
        },

        projectfiles: function () {
            this.template('_post.markdown', '_posts/' + this.postFileName);
        }
    }
});

module.exports = JpostGenerator;
