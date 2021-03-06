import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from './Form';

export class Login extends Component {
	constructor(props) {
		super(props);
	}

	handleSubmit(email, password) {
		let payload = new FormData();
		payload.append('email', email)
		payload.append('password', password);

		fetch('/login', {
			method: 'POST',
			body: payload,
			credentials: 'same-origin'
		})
		.then((response) => response.json())
		.then((data) => {
				if (data.redirect) {
					window.location.href = data.redirect;
				}
		});
	}

	render() {
		return (
				<div>
					<h1>Manage Your Daily Tasks</h1>
					<Form onSubmit={this.handleSubmit.bind(this)} btn='Login'/>
					<p>Don't have an account? Create one <Link to='/signup'>here</Link></p>
				</div>
			)
	}
}