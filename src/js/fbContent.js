$(function(){

	var chatter = new FbChatter();
	chatter.makeControlPanel();

	chatter.$controlPanel.on("start.autochat", function(){
		answer();
	})

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
/*
	setTimeout(function check(){
		answer();
	}, 1000);*/

});

