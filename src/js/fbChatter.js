(function(){
	var sels = {
		container : ".fbDockChatTabFlyout",
		input: ".uiTextareaAutogrow",
		lastMessage: ".fbChatConvItem div.fsm span",
		titleBar : ".titlebar",
	}

	window.FbChatter = function(){
		this.container = $(sels.container);
		this.input = $(sels.input, this.container);
		this.lastMessage = $(sels.lastMessage).last();
	};

	FbChatter.prototype.getLastMessage = function(){
		var $lastMessage = $(sels.lastMessage).last();
		return $lastMessage.text();
	}

	FbChatter.prototype.sendMessage = function(msg){
		var $input = $(sels.input, this.container);
		$input.val(msg);
		
		var e = new Event('keydown');
		e.keyCode = 13;
		$input.get(0).dispatchEvent(e);
	}

	FbChatter.prototype.makeControlPanel = function(e){
		var self = this;

		$(sels.titleBar).append('<div class="iAutochatControl">\
			<a class="autoAnswer" style="color:white;">Auto answer</a>\
		</div>');

		window.dispatchEvent(new Event('resize'));

		self.$controlPanel = $(".iAutochatControl", this.container);

		$(".iAutochatControl a.autoAnswer", this.container).on("click", function(e){
			self.$controlPanel.trigger("start.autochat");
			return false;
		});
	}
})();