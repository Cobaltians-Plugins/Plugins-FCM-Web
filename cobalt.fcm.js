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
      cobalt.fcm.callbacks.onGetTokenResult = callback;
      cobalt.plugins.send(this, "getToken", {});
    },
    subscribeToTopic: function(topic, callback) {
      cobalt.fcm.callbacks.onSubscribeToTopicResult = callback;
      cobalt.plugins.send(this, "subscribeToTopic", {'topic': topic});
    },

    unsubscribeFromTopic: function(topic, callback) {
      cobalt.fcm.callbacks.onUnsubscribeToTopicResult = callback;
      cobalt.plugins.send(this, "unsubscribeFromTopic", {'topic': topic});
    },
    handleEvent: function(json) {
      switch (json && json.action) {
        case 'getToken':
          if (typeof cobalt.fcm.callbacks.onGetTokenResult === 'function') {
            cobalt.fcm.callbacks.onGetTokenResult(json.data);
          }
          break;
        case 'subscribeToTopic':
          if (typeof cobalt.fcm.callbacks.onSubscribeToTopicResult === 'function') {
            cobalt.fcm.callbacks.onSubscribeToTopicResult(json.data);
          }
          break;
        case 'unsubscribeFromTopic':
          if (typeof cobalt.fcm.callbacks.onUnsubscribeToTopicResult === 'function') {
            cobalt.fcm.callbacks.onUnsubscribeToTopicResult(json.data);
          }
          break;
      }
    }
  };
  cobalt.plugins.register(plugin);
})(cobalt || {});
