import React, { Component } from 'react';


export class Task extends Component {
	constructor(props) {
		super(props);
		this.state = { task: '', tasks: [] };
		this.fetchTasks = this.fetchTasks.bind(this);
	}

	componentWillMount() {
		this.fetchTasks();
	}

	fetchTasks() {
		fetch('/get-tasks?userid=' + this.props.uid)
		.then((response) => response.json())
		.then((data) => {
			this.setState({ tasks: data.tasks });
		});
	}

	handleChange(evt) {
		let task = this.task.value;
		this.setState({ task: task });
	}

	handleSubmit(evt) {
		evt.preventDefault();

		let payload = new FormData();
		payload.append('task', this.state.task);
		payload.append('userid', this.props.uid);

		fetch('/add-task', {
			method: 'POST',
			body: payload,
			credentials: 'same-origin'
		})
		.then((response) => response.json())
		.then((data) => {
			this.setState({ tasks: data, task: '' });
		})
	}
	
	render() {

		let tasks;
		tasks = this.state.tasks.map((x,i) => <li key={i}>{x}</li>)

		return (
				<div>
					<h1>Logged in!</h1>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<label>Add Task: 
							<input ref={input => this.task = input}
								   type='text'
								   required
								   value={this.state.task}
								   onChange={this.handleChange.bind(this)}/>
						</label>
						<input type='submit' value='Add'/>
					</form>
					<ul>
						{tasks}
					</ul>
				</div>
			)
	}
}