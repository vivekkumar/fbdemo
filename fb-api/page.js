(function(){	
	PP.Page = function(parent, jObject, aToken) {
		var that = this;
		this.id = jObject.id;
		this.name = jObject.name;
		this.category = jObject.category;
		this.pageDetail = null;
		this.parentEl = parent;
		this.detail = null;
		this.isExpanded = false;
		this.aToken = aToken;
		
		this.fObj = {
			url: "https://graph.facebook.com/",
			params: {
				id: this.id,
				access_token: aToken
			}, 
			callback: function(r, rt) {that.handleDetail(r, rt);},
			onBefore: function() {}
		};
		
		
		// Create Page DOM
		this.containerEl = PP.Util.createEl(this.parentEl, PP.Util.CSS.page_container);
		this.headingEl = PP.Util.createEl(this.containerEl, PP.Util.CSS.page_basic, "h4");
		this.anchor = PP.Util.createEl(this.headingEl, PP.Util.CSS.page_anchor, "a");
		
		this.detailEl = PP.Util.createEl(this.containerEl, PP.Util.CSS.page_extented, "p");	
		this.detailEl.innerHTML = this.category || "No info";
		
		this.cover =  PP.Util.createEl(this.detailEl, PP.Util.CSS.page_cover);
		var div = PP.Util.createEl(this.cover, "page-cover-inner");
		this.coverImg =  PP.Util.createEl(div, PP.Util.CSS.page_cover_img, "img");
		this.pImg =  PP.Util.createEl(div, "page-cover-photo", "img");
		var desContainer = PP.Util.createEl(div, PP.Util.CSS.page_cover_des);
		this.des = PP.Util.createEl(desContainer, PP.Util.CSS.pull_left, "a");
		this.likes = PP.Util.createEl(desContainer, PP.Util.CSS.pull_left);
		
		this.pImg.src = "https://graph.facebook.com/" + this.id + "/picture?height=200&type=normal&width=200&access_token=" + aToken;
		
		/* Set values */
		this.anchor.href = "#"+this.id;
		this.anchor.innerHTML = this.name;
				
		this.anchor.onclick = function() {
			if(PP.Util.hasClass(that.containerEl, PP.Util.CSS.expand)) 
				that.collapse();
			else 
				that.expand();
			
			that.isExpanded != that.isExpanded;
			
			return false;
		};
	};	
	
	PP.Page.prototype.fetchDetail = function() {
		var that = this;
		PP.Util.fetch(this.fObj);
	};
	
	PP.Page.prototype.handleDetail = function(r, rt) {
		if(r && r.cover && r.cover.source) {
			this.coverImg.src = r.cover.source;
		}
		this.des.innerHTML = r.name || r.description || "Visit our page" ;
		this.des.href = r.link;
		this.des.target = "_black";
		this.likes.innerHTML = "<span class='page-likes'><i class='fa fa-thumbs-o-up'></i> " + r.likes + "</span>";
	};
	
	
	PP.Page.prototype.show = function() {
		PP.Util.addClass(this.containerEl, PP.Util.CSS.show);
	};
	
	PP.Page.prototype.hide = function() {
		PP.Util.addClass(this.containerEl, PP.Util.CSS.hide);
	};
	
	PP.Page.prototype.expand = function() {
		PP.Util.addClass(this.containerEl, PP.Util.CSS.expand);
		if(!this.detail) {
			this.fetchDetail();
		}
	};
		
	PP.Page.prototype.collapse = function() {
		PP.Util.removeClass(this.containerEl, PP.Util.CSS.expand);
	};
	
	
	PP.Page.prototype.remove = function() {
		this.parentEl.removeChild(this.containerEl);
		
		delete this.containerEl;
		delete this.headingEl;
		delete this.anchor;
		delete this.detailEl;		
	};
})();