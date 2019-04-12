(function(cobalt){
    var plugin = {
        classes: {
        	android: 'io.kristal.fcmplugin.FcmPlugin',
			ios: 'FcmPlugin'
        }
        init: function () {
            // Create shortcuts
            cobalt.fcm={
                init: this.init.bind(this),
                getToken : this.getToken.bind(this),
                subscribeToTopic : this.subscribeToTopic.bind(this),
                unsubscribeFromTopic : this.unsubscribeFromTopic.bind(this)
            };
        },
        //Récupère un objet de données à envoyer, et le transforme en chaine sous la forme champ=valeur&champ2=valeur2
        objectToString:function(params){
            var str = "";
            for (var key in params) {
                if (str != "") {
                    str += "&";
                }
                str += key + "=" + encodeURIComponent(params[key]);
            }
            return str;
        },


        getToken: function(callback){
            cobalt.log("Sending event getToken to the native side")
            cobalt.plugins.send(this, "getToken", {}, function(data){
                if (typeof callback =="function"){
                    callback(data);
                }
                else{
                    cobalt.log('Received infos = ', data, typeof callback);
                }
            });
        },

        subscribeToTopic: function(topic, callback){
            cobalt.log("Sending event subscribeToTopic to the native side")
            var donnees = {'topic': topic};
            cobalt.plugins.send(this, "subscribeToTopic", donnees, function(data){
                if (typeof callback == 'function'){
                    callback(data);
                }
                else{
                    cobalt.log('Received infos = ', data, typeof callback);
                }
            });
        },

        unsubscribeFromTopic: function(topic, callback){
            var donnees = {'topic': topic};
            cobalt.plugins.send(this, "unsubscribeFromTopic", donnees, function(data){
                if (typeof callback == 'function'){
                    callback(data);
                }
                else{
                    cobalt.log('Received infos = ', data, typeof callback);
                }
            });
        }
    };
    cobalt.plugins.register(plugin);
})(cobalt || {});
