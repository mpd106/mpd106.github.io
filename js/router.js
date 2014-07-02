/* globals App, Ember, $, document */

var baseTitle = "mpd106 blog";

var AppRoute = Ember.Route.extend({
    renderTemplate: function(controller, model) {
        this.render();

        var pageTitle = this.title ? this.title(controller, model) : baseTitle;
        document.title = pageTitle;
    }
});

App.Router.map(function() {
  this.route('about');
  this.resource('posts');
  this.resource('post', { path: 'post/:post_id' });
});

App.IndexRoute = AppRoute.extend({
  redirect: function() {
    this.transitionTo('posts');
  }
});

App.AboutRoute = AppRoute.extend({
  title: function(controller, model) {
    return baseTitle + ' - About';
  }
});

App.PostsRoute = AppRoute.extend({
  model: function() {
    return $.getJSON('http://api.mpd106.com/posts');
  }
});

App.PostRoute = AppRoute.extend({
  model: function(params) {
    var result = $.getJSON('http://api.mpd106.com/posts/' + params.post_id);
    
    return result;
  },
  title: function(controller, model) {
    return baseTitle + ' - ' + model.title;
  }
});