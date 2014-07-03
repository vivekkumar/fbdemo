(function(){
	PP.FB = {};
	PP.FB.AccessToken = null;
	PP.FB.AppId = "464188603684485";
	PP.FB.AppSecret = "ffe24779d4e4549dc476b0cc5226bdd7";
	
	
	PP.FB.Init = function(appId, appSecret, initCallback) {
		PP.FB.AppId = appId;
		PP.FB.AppSecret = appSecret;
	
		/* Get Access Code and set it for further api calls */
		PP.Util.fetch({
			url: "https://graph.facebook.com/oauth/access_token",
			parser: function(response) { return response.split("=")[1]},
			params: {
				client_id: appId,
				client_secret: appSecret,
				grant_type: "client_credentials"
			},
			callback: function(data) {
				var success = true;
				if(!data.error) {
					PP.FB.AccessToken = data;					
				} else {
					//throw(data.error.message);
					success = false;
				}
				
				if(initCallback && typeof initCallback === "function")
					initCallback(success, PP.FB.AccessToken);
			}
		});
	};
})();