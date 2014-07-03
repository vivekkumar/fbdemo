(function(){
	PP.Search = function(parent, options) {
		if(!parent) return null;
		
		var that = this;
		this.parent = parent;
		this.options = options;
		
		/* Build DOM */
		this.container = PP.Util.createEl(this.parent, PP.Util.CSS.search_container);
		this.form = PP.Util.createEl(this.container, "", "form");
		var field = PP.Util.createEl(this.form, "search-fields", "div");
		this.input = PP.Util.createEl(field, "", "input");
		this.button = PP.Util.createEl(field, "", "button");
		this.form.action = "#"
		this.input.type = "text";
		this.input.setAttribute("placeholder", this.options.placeholder || "Type your query...");
		this.button.type = "submit";
		this.button.innerHTML = this.options.btnCaption || "<i class='fa fa-facebook'></i>";		
		
		/* Events */
		this.form.onsubmit = function(e) { return that.submit(e); };
		this.input.onkeyup = function(e) { return that.keyup(e);}
		this.input.focus();		
	};
	
	PP.Search.prototype.submit = function(e) {
		return this.doSearch(this.input.value, e);
	};
	
	PP.Search.prototype.keyup = function(e) {
		if(this.options.auto) return this.doSearch(this.input.value, e);
	};
	
	PP.Search.prototype.doSearch = function(q, e) {
		if(this.options && typeof this.options.searchObj === "object" && q) {
			this.options.searchObj.params.q = encodeURIComponent(q);
			PP.Util.fetch(this.options.searchObj);
			return false;
		}
	};
})();