$(document).ready(function() {
	$(document).on('click', '#sendEmail', function() {
		var name = $('#name').val().trim();
		var email = $('#email').val().trim();
		var message = $('#message').val().trim();

		var emailInfo = {
			_name: name,
			_message: message,
			_email: email
		};
		$.post(window.location.origin + '/api/sendEmail', emailInfo, function(data) {
			console.log("Your email has been sent!");
		});
		
		$('#name').val("");
		$('#email').val("");
		$('#message').val("");
	});
});