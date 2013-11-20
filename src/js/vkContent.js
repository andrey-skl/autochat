$(function(){

	injectAgentScript();

	window.addEventListener("message", function(event) {
	  if (event.data.type && (event.data.type == "msgReceived")) {
	    console.log("Content script received: " + event.data.text);
	  }
	}, false);
		

	var initChatWindow = function($root){

	}


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
		var user = chatter.getUser();
		console.log("last message: ", msg, user);

		chrome.extension.sendRequest(
			{
				action:"tellInf", 
				message: msg, 
				user: user,
			}, 
			function(res) {
				console.log("response", res)
				chatter.sendMessage(res.message.message);
			}
		);
	}

	var injectAgentScript = function)(){
		//исполнить скрипт vk_inner в контексте vk.com
		var script=document.createElement('script');
		script.type='text/javascript';
		script.src=chrome.extension.getURL("js/vkInner.js");
		document.body.appendChild(script);
	}

});

