import React, { Component } from 'react';
import { Form } from './Form';
import { Redirect } from 'react-router';

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
				if (data === 'success') {
					this.props.history.push('/tasks');
				}
		});
	}

	render() {
		return (
				<div>
					<Form onSubmit={this.handleSubmit.bind(this)} btn='Signup'/>
				</div>
			)
	}
}