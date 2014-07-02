/* global App, Ember, Showdown, Handlebars, moment, $, document, Prism, DISQUS */

Ember.Application.initializer({
  name: "initializeDisqus",
 
  initialize: function(container, application) {
    initializeDisqus();
  }
});

App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(body) {
  return new Handlebars.SafeString(showdown.makeHtml(body));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});

App.PostsView = Ember.View.extend({
  didInsertElement: function() {
    initializeTwitterWidget();
    postProcessPosts();
  }
});

App.PostView = Ember.View.extend({
  didInsertElement: function() {
    var postModel = this.get('controller.model');
    initializeDisqusThread(postModel.id, postModel.title);
    postProcessPosts();
  }
});

var initializeDisqus = function() {
  var disqus_shortname = 'mpd106-blog';
  
  (function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
};

var initializeDisqusThread = function(id, title) {
  var defaultOrigin = 'http://mpd106.com';
  var location = window.location;
  var url = defaultOrigin + location.pathname + location.hash;

  DISQUS.reset({
  reload: true,
  config: function () {  
      this.page.identifier = id;  
      this.page.url = url;
      this.page.title = title;
    }
  });
};

var initializeTwitterWidget = function() {
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
};

var postProcessPosts = function() {
  Prism.highlightAll();
};