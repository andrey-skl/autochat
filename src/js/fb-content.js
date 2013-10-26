$(function(){

	var sels = {
		container : ".fbDockChatTabFlyout",
		input: ".uiTextareaAutogrow",
		lastMessage: ".fbChatConvItem div.fsm span",
	}

	var FbChatter = function(){
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
		$input.val(msg)
		$input.trigger(jQuery.Event('keydown', { which: $.ui.keyCode.ENTER }));
	}

	var chatter = new FbChatter();

	var answer = function(){
		var msg = chatter.getLastMessage();
		console.log("last message: ", msg);

		chrome.extension.sendRequest(
			{
				action:"tell", 
				message: msg, 
			}, 
			function(res) {
				console.log("response", res)
				chatter.sendMessage(res.message.message);
			}
		);
	}

	setTimeout(function check(){
		answer();
	}, 1000);

});

