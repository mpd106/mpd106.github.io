/* global App, Ember, Showdown, Handlebars, moment, $, document */

$(document).ready(function() {
});

App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(body) {
  return new Handlebars.SafeString(showdown.makeHtml(body));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});

App.PostView = Ember.View.extend({
  didInsertElement: function() {
    var disqus_shortname = 'mpd106-blog'; // Required - Replace example with your forum shortname
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  }
});