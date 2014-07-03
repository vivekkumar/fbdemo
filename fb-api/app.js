(function(){
	PP.FbPageSearch = function(parent, options) {
		var that = this;
		this.parent = parent;
		this.options = options;
		this.container = PP.Util.createEl(this.parent, "fb-app");
		this.searchContainer = PP.Util.createEl(this.container, "fb-app-search");
		
		this.paging = PP.Util.createEl(this.container, "search-paging");	
		this.prev = PP.Util.createEl(this.paging, "search-paging-prev", "button" );
		this.next = PP.Util.createEl(this.paging, "search-paging-prev", "button" );
		PP.Util.addClass(this.prev, PP.Util.CSS.pull_left);
		PP.Util.addClass(this.next, PP.Util.CSS.pull_right);
		this.prev.innerHTML = "<i class='fa fa-chevron-left'></i> Previous page";
		this.next.innerHTML = "Next page <i class='fa fa-chevron-right'></i>";
		
		this.searchResultContainer = PP.Util.createEl(this.container, "fb-app-search-result");
		
		this.prev.onclick = function(){
			PP.Util.fetch({
				url: that.prevLink,
				callback: function(r, rt) { that.loading.hide(); that.handleResults(r, rt);},
				onBefore: function() {that.loading.show();}
			});
		};
		
		this.next.onclick = function(){
			PP.Util.fetch({
				url: that.nextLink,
				callback: function(r, rt) { that.loading.hide(); that.handleResults(r, rt);},
				onBefore: function() {that.loading.show();}
			});
		};
		
		this.loading = PP.Util.createEl(this.searchResultContainer, "fb-app-loading");
		this.loading.innerHTML = "Please wait...";	
		
		this.pages = [];
		this.init();
	};
	
	/* App Id */
	PP.FbPageSearch.AccessToken = null;
	PP.FbPageSearch.AppId = "464188603684485";
	PP.FbPageSearch.AppSecret = "ffe24779d4e4549dc476b0cc5226bdd7";
	
	PP.FbPageSearch.prototype.init = function() {
		var that = this;
		
		/* We need access-token for calling any graph api */
		PP.FB.Init(PP.FbPageSearch.AppId, PP.FbPageSearch.AppSecret, function(success, token){
			if(!success) {
				//throw("Could not get valid access_token");
				that.loading.innerHTML = "Could not get valid <span style='color: red'>access_token</span>";	
				return;
			}
			else {
				PP.FbPageSearch.AccessToken = token;
				that.startApp();
			}
		});
	};
	
	PP.FbPageSearch.prototype.startApp = function() {
		var that = this;
		this.loading.hide();
		this.clearResults();
		/* Initialize Search */
		this.mySearch = new PP.Search(this.searchContainer, {
			auto: this.options.auto,  /* For type-in search */
			searchObj: { 
				url: "https://graph.facebook.com/search",
				params: {
					type: "page",
					access_token: PP.FbPageSearch.AccessToken,
					limit: this.options.limit || 5
				},
				callback: function(r, rt) { that.loading.hide(); that.handleResults(r, rt);},
				onBefore: function() {that.loading.show();}
			}
		});
	};
	
	PP.FbPageSearch.prototype.handleResults = function(r, rt) {
		this.clearResults();
		if(!r.data) return;
		for(var i = 0; i < r.data.length; i++) {
			this.pages.push(new PP.Page(this.searchResultContainer, r.data[i], PP.FbPageSearch.AccessToken));			
		}
		
		if(r.paging) {
			if(r.paging.next) {
				this.next.show();
				this.nextLink = r.paging.next;
			}
			
			if(r.paging.previous) {
				this.prev.show();
				this.prevLink = r.paging.previous;
			}
		}
	};
	
	PP.FbPageSearch.prototype.clearResults = function(r, rt) {
		this.next.hide();
		this.prev.hide();
		for(var i = 0; i < this.pages.length; i++) {
			this.pages[i].remove();
		}
		this.pages = [];
	};
	
})();