var ChatBotApi = function(){

	this.url = "http://www.personalityforge.com/api/chat/";
}

ChatBotApi.prototype.tell = function(message, user){
	var dfd = new jQuery.Deferred();

	var data = {
		apiKey: "nnZIDKk3hSCUp7vA",		
		chatBotID: 6,
		externalID: user.id,
		gender: "m",
		message: message,
		firstName: user.firstName,
		lastName: user.lastName,		
	}

	$.get(this.url, data, function(res){
		var result = JSON.parse(res.match(/{.*$/i)[0]);

		dfd.resolve(result);
	})

	return dfd.promise();
}