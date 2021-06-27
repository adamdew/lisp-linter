import React from 'react';
import './App.css';


class App extends React.Component {
	constructor(props) {

		super(props);
		this.state = {
			input: '(((test)',
			message: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	render() {

		return (
			<div className="App">
				<h3>LISP Paren Linter</h3>
				<form onSubmit={this.handleSubmit}>
					<label>
						Enter your LISP code below: <br/><br/>
					</label>
					<textarea value={this.state.input} onChange={this.handleChange}/> <br/>
					<input type="submit" value="Submit"/>
					<h4>{this.state.message}</h4>
				</form>
			</div>
		)

	};

	handleChange(event) {

		this.setState({
			input: event.target.value
		})

	}

	handleSubmit(event) {


		event.preventDefault();



		if (!this.iterateString(this.state.input)) {
			this.setState({
				message: 'Invalid :('
			})
		} else {
			this.setState({
				message: 'Valid :)'
			})
		}


	}

	iterateString(input) {

		let foundIndex = input.indexOf('(');

		let remainingCloseParens = input.split(')').length-1;

		if (foundIndex < 0) {

			return (remainingCloseParens === 0);

		} else {

			let foundMatching = this.findAndMatchClosingBracket(input, foundIndex);

			if (foundMatching < 0) {
				return false;
			}

			input = input.replace("(", "").replace(")", "");

			return this.iterateString(input);

		}


	}

	findAndMatchClosingBracket(str, pos) {


		if (str[pos] !== '(') {
			throw new Error("No '(' at index " + pos);
		}
		let depth = 1;

		//lets kick it old school and avoid Array.map/filter here, in this case it makes the code more self documenting.
		for (let i = pos + 1; i < str.length; i++) {
			switch (str[i]) {
				case '(':
					depth++;
					break;
				case ')':
					if (--depth === 0) {
						return i;
					}
					break;
				default:
					break;
			}
		}
		return -1;    // No matching closing parenthesis
	}
}

export default App;
