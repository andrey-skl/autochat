var InfApi = function(){
	this.url = "http://www.inf.ru/api/chat/";
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
	/*
	$.get(this.url, data, function(res){
		var result = JSON.parse(res.match(/{.*$/i)[0]);

		dfd.resolve(result);
	})*/

	dfd.resolve({
		message:"hello test world",
	});

	return dfd.promise();
}