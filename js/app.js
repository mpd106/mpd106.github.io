/* global App, Ember, Showdown, Handlebars, moment, $ */

App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true
});

App.Router.map(function() {
  this.route('about');
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

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('posts');
  }
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('http://localhost:4730/posts');
  },
  redirect: function() {
    var posts = this.modelFor('posts');
    if (posts.get('length') >= 1) {
      this.transitionTo('post', posts[0].id);
    }
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    var result = $.getJSON('http://localhost:4730/posts/' + params.post_id);
    
    return result;
  }
});