var ChatBotApi = function(userName, userSurname){
	this.userName = userName;
	this.userSurname = userSurname;

	this.url = "http://www.personalityforge.com/api/chat/";
}

ChatBotApi.prototype.tell = function(message){
	var dfd = new jQuery.Deferred();

	var data = {
		apiKey: "nnZIDKk3hSCUp7vA",		
		chatBotID: 6,
		externalID: 1,
		gender: "m",
		message: message,
		firstName: this.userName,
		lastName: this.userSurname,		
	}

	$.get(this.url, data, function(res){
		var result = JSON.parse(res.match(/{.*$/i)[0]);

		dfd.resolve(result);
	})

	return dfd.promise();
}