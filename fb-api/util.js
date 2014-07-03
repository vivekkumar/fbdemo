/*********************** Utils *************************/
var PP = {};
(function(){
	PP.Util = {
		fetch: function(o) {
			if(!o.url) return null;
			var url = o.url + "?";
			for(p in o.params) {
				url += p + "=" + o.params[p] + "&";
			}
			
			var http_request = new XMLHttpRequest();
			http_request.open("GET", url, true);
			http_request.onreadystatechange = function () {
				var done = 4, ok = 200;
				if (http_request.readyState == done) {					
					if ( http_request.status == ok) {
						var jObj = null;
						if(o.parser && typeof o.parser === "function") jObj = o.parser(http_request.responseText);
						else jObj = JSON.parse(http_request.responseText);
						o.callback(jObj, http_request.responseText);
					} else {
						jObj = JSON.parse(http_request.responseText);
						o.callback(jObj, http_request.responseText);
					}
				}
			};
			if(o.onBefore) o.onBefore();
			http_request.send(null);
		},
		
		hasClass: function(el, css) {
			return el.classList.contains(css);
		},
		
		addClass: function(el, css) {
			el.classList.add(css); 
		},
		
		removeClass: function(el, css) {
			el.classList.remove(css); 
		},
		
		createEl: function(parent, css, type) {
			var el = document.createElement(type || "div");
			if(css) PP.Util.addClass(el, css);
			if(parent) parent.appendChild(el);
			return el;
		}
	};
	
	PP.Util.CSS = {
		/* Util */
		hide: "hide",
		show: "show",
		pull_left: "pull-left",
		pull_right: "pull-right",
		animator: "animator",
		expand: "expand",
		
		/* Page */
		page_container: "page-container",
		page_basic: "page-basic",
		page_anchor: "page-anchor",
		page_extented: "page-extended",
		page_cover: "page-cover",
		page_cover_img: "page-cover-img",
		page_cover_des: "page-cover-des",
		
		/* Search */
		search_container: "search-container"
	};
	
	
	HTMLElement.prototype.hide = function() {
		PP.Util.addClass(this, PP.Util.CSS.hide)
	};
	
	HTMLElement.prototype.show = function() {
		PP.Util.removeClass(this, PP.Util.CSS.hide)
	};
})();