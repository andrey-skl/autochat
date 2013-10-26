var api = new ChatBotApi("Andrey", "Skladchikov");

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	tab = sender.tab;
    if (request.action == "tell")
	{
		console.log("telling", request);	
		
		api.tell(request.message).done(function(result){
			sendResponse(result);
		})
	}

});