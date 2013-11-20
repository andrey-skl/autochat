var api = new ChatBotApi();

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	tab = sender.tab;
  if (request.action == "tell")
	{
		console.log("telling", request);	
		
		api.tell(request.message, request.user).done(function(result){
			sendResponse(result);
		})
	}
	if(request.action == "tellInf"){
		console.log("telling inf", request);	
		
		api.tell(request.message, request.user).done(function(result){
			sendResponse(result);
		})
	}

});