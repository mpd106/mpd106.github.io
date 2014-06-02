/* global App, Ember */

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
    return [
  	{
  		id: "1",
  		title: "Third post",
  		author: { name: "Matt" },
  		date: new Date("06-02-2014"),
  		excerpt: "This article is about...",
  		body: "### Welcome\n This article is about awesome Matt's awesome hair."
  	},
  	{
  		id: "2",
  		title: "Second post",
  		author: { name: "Matt" },
  		date: new Date("06-01-2014"),
  		excerpt: "This article is about...",
  		body: "### Welcome\n This article is about awesome Matt's awesome beard."
  	}
  ];
  }
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		return posts.findBy('id', params.post_id);
	}
});

var posts = [
  	{
  		id: "1",
  		title: "Third post",
  		author: { name: "Matt" },
  		date: new Date("06-02-2014"),
  		excerpt: "This article is about...",
  		body: "### Welcome\n This article is about awesome Matt's awesome hair."
  	},
  	{
  		id: "2",
  		title: "Second post",
  		author: { name: "Matt" },
  		date: new Date("06-01-2014"),
  		excerpt: "This article is about...",
  		body: "### Welcome\n This article is about awesome Matt's awesome beard."
  	}
  ];