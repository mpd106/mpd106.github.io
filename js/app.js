/* global App, Ember, Showdown, Handlebars, moment, $ */

App = Ember.Application.create();

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(body) {
  return new Handlebars.SafeString(showdown.makeHtml(body));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('http://localhost:4730/posts?callback=?');
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    var result = $.getJSON('http://localhost:4730/posts/' + params.post_id + '?callback=?');
    
    return result;
  }
});