(function(cobalt) {
  var plugin = {
    name: 'CobaltFcmPlugin',
    classes: {
      android: 'io.kristal.fcmplugin.FcmPlugin',
      ios: 'FcmPlugin'
    },
    init: function() {
      cobalt.fcm = {
        init: this.init.bind(this),
        getToken: this.getToken.bind(this),
        subscribeToTopic: this.subscribeToTopic.bind(this),
        unsubscribeFromTopic: this.unsubscribeFromTopic.bind(this),
        callbacks:{
          onGetTokenResult: function(data){ cobalt.log('fcm plugin, getToken result', data)},
          onSubscribeToTopicResult: function(data){ cobalt.log('fcm plugin, subscribeToTopic result', data)},
          onUnsubscribeToTopicResult: function(data){ cobalt.log('fcm plugin, unsubscribeFromTopic result', data)},
        }
      };
    },
    getToken: function(callback) {
      cobalt.plugins.send(this, "getToken", {}, callback || this.callbacks.onGetTokenResult);
    },
    subscribeToTopic: function(topic, callback) {
      cobalt.plugins.send(this, "subscribeToTopic", {'topic': topic}, callback || this.callbacks.onSubscribeToTopicResult);
    },
    unsubscribeFromTopic: function(topic, callback) {
      cobalt.plugins.send(this, "unsubscribeFromTopic", {'topic': topic}, callback || this.callbacks.onUnsubscribeToTopicResult);
    }
  };
  cobalt.plugins.register(plugin);
})(cobalt || {});
