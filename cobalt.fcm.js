(function(cobalt){
    var plugin = {
        'name': 'Fcm',
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
            this.send("getToken", {}, function(data){
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
            this.send("subscribeToTopic", donnees, function(data){
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
            this.send("unsubscribeFromTopic", donnees, function(data){
                if (typeof callback == 'function'){
                    callback(data);
                }
                else{
                    cobalt.log('Received infos = ', data, typeof callback);
                }
            });
        },
        handleEvent:function(json){
            cobalt.log(this.name, ' plugin : unknown event received :', json)
        },
        send:function(action, data, callback){
            cobalt.send({ type : "plugin", name : this.name, action : action, data : data }, callback);
        }
    };
    cobalt.plugins.register(plugin);
})(cobalt || {});
