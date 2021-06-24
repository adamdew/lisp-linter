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
				<p>Hi reader, I decided to not make this first assignment LISP specific, meaning I did not think it was
					necessary to do any parsing
					or interpreting to make sure that the parens are closed up inside the string.

					It is just a string after all, and from the very little I know about LISP,
					open parens need to have close parens. So that's all I'm considering here.</p>
				<form onSubmit={this.handleSubmit}>
					<label>
						Enter your LISP code below: <br/>
					</label>
					<textarea value={this.state.input} onChange={this.handleChange}/> <br/>
					<input type="submit" value="Submit"/>
					<p>{this.state.message}</p>
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
				message: 'Code is not valid, open paren(s) exist'
			})
		} else {
			this.setState({
				message: 'Code is valid, parens all closed up'
			})
		}


	}

	iterateString(input) {

		let foundIndex = input.indexOf('(');

		if (foundIndex < 0) {
			return true;
		} else {

			let foundMatching = this.findAndMatchClosingBracket(input, foundIndex);

			if (foundMatching < 0) {
				return false;
			}

			input = input.slice(0, foundIndex) + input.slice(foundIndex + 1);

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
