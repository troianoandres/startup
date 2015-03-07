require([
	"routers/router",
	"common"
], function(Workspace, Common) {
	
	Backbone.View.prototype.close = function(){
		this.$contentBody.empty();
		this.$contentHeader.empty();
  	this.unbind();
	}

	Common.workspace = new Workspace();
	Backbone.history.start();

});
