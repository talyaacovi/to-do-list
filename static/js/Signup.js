import React, { Component } from 'react';
import { Form } from './Form';

export class Signup extends Component {
	constructor(props) {
		super(props);
	}

	handleSubmit(email, password) {
		let payload = new FormData();

        payload.append('email', email);
        payload.append('password', password);

		fetch('/signup-user', {
			method: 'POST',
			body: payload,
			credentials: 'same-origin'
		})
		.then((response) => response.json())
		.then((data) => {
				console.log('success');
		});
	}

	render() {
		return (
				<Form onSubmit={this.handleSubmit.bind(this)} btn='Signup'/>
			)
	}
}