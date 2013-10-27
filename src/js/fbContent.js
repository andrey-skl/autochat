$(function(){

	var initChatWindow = function($root){
    	if (!$root.data("autochat")){
        	$root.data("autochat", true);

        	var chatter = new FbChatter($root);

        	chatter.makeControlPanel();
            chatter.$controlPanel.off("start.autochat").on("start.autochat", function(){
				answer(chatter);
			});

			//subscribe to adding new messages
		    var msgObserver = new MutationSummary({
		        callback: function (summaries) {
		        	console.log("message received", chatter.getLastMessage());
		            if (summaries[0].added.length)
		            	answer(chatter);
		        },
		        rootNode: $root.get(0),
		        queries: [{ element: 'div.fbNubFlyoutBody' }]
		    });
    	}
	}

	//injecting in already opened chats
	$('div.fbDockChatTabFlyout').each(function(i,el){
		initChatWindow($(this));
	});

	//and subscribe to new opening chat window
    var chatObserver = new MutationSummary({
        callback: function (summaries) {
            summaries[0].added.forEach(function (newEl) {
            	var $newEl = $(newEl);
            	initChatWindow($newEl);
            });
        },
        rootNode: $("#pagelet_dock").get(0),
        queries: [{ element: 'div.fbDockChatTabFlyout'}]
    });



	var answer = function(chatter){
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

});

