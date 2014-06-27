/* globals App, Ember, $ */

App.Router.map(function() {
  this.route('about');
  this.resource('posts');
  this.resource('post', { path: 'post/:post_id' });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('posts');
  }
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('http://api.mpd106.com/posts');
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    var result = $.getJSON('http://api.mpd106.com/posts/' + params.post_id);
    
    return result;
  }
});