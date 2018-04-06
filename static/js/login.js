$('#login').submit((evt) => {
	evt.preventDefault();
	console.log(evt.target);
});

$('#signup').submit((evt) => {
	evt.preventDefault();
	// AJAX to see if email already exists in DB
	let email = evt.target.email.value
	let password = evt.target.password.value

	$.post('/signup-user', {'email': email, 'password': password}, successMsg)
});

$('#signup-link').click((evt) => {
	evt.preventDefault();
	$('#login').hide();
	$('#signup').show();
})

$('#login-link').click((evt) => {
	evt.preventDefault();
	$('#signup').hide();
	$('#login').show();
})