import React, { Component } from 'react';


export class Form extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '' }
	}

	handleChange(evt) {
		this.setState({ email: this.email.value, password: this.password.value });
	}

	handleSubmit(evt) {
		evt.preventDefault();
		let email = this.state.email;
		let password = this.state.password;

		this.props.onSubmit(email, password);
	}

	render() {
		return (
				<div>
					<h1>THIS IS MY NEW FORM</h1>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<label>Email: 
							<input ref={input => this.email = input}
								   type='email'
								   required
								   value={this.state.email}
								   onChange={this.handleChange.bind(this)}/>
						</label>
						<label>Password: 
							<input ref={input => this.password = input}
								   type='password'
								   required
								   value={this.state.password}
								   onChange={this.handleChange.bind(this)}/>
						</label>
						<input type='submit' value={this.props.btn}/>
					</form>
				</div>
			)
	}
}