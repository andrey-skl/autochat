(function(){
	var sels = {
		container : ".fbDockChatTabFlyout",
		input: ".uiTextareaAutogrow",
		lastMessage: ".fbChatConvItem div.fsm>span",
		titleBar : ".titlebar",
		userName: ".titlebarTextWrapper a.titlebarText"
	}

	window.VkChatter = function($container){
		this.container = $container || $(sels.container);
		this.input = $(sels.input, this.container);
		this.lastMessage = $(sels.lastMessage).last();
	};

	VkChatter.prototype.getLastMessage = function(){
		var $lastMessage = $(sels.lastMessage, this.container).last();
		return $lastMessage.text();
	}

	VkChatter.prototype.getUser = function(){
		var $link = $(sels.userName, this.container);

		var userName = $link.text().split(" ");
		var firstName = userName[0];
		var lastName = userName[1];

		var userId = $link.attr("href").replace("https://www.facebook.com/","");
		return { 
			id: userId, 
			firstName: firstName,
			lastName: lastName,
		}
	}

	VkChatter.prototype.sendMessage = function(msg){
		var $input = $(sels.input, this.container);
		$input.val(msg);
		
		var e = new Event('keydown');
		e.keyCode = 13;
		$input.get(0).dispatchEvent(e);
	}

	VkChatter.prototype.makeControlPanel = function(e){
		var self = this;

		$(sels.titleBar, self.container).append('<div class="iAutochatControl">\
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