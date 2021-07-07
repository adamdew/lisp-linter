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
				<h3>LISP Paren Checker</h3>
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

		/*
		Checking for remaining close parens makes more sense when you look at it
		from the perspective of the 1st recursion.
		*/
		let remainingCloseParens = input.split(')').length - 1;

		//if we dont find any more open parens
		if (foundIndex < 0) {

			/*
			Return true if there are also no more close parens,
			a remaining close parens indicates invalid code
			*/
			return (remainingCloseParens === 0);

		} else {

			/*
			Return the index of the found closing paren. If you dont find one, code is invalid.
			*/
			let foundMatching = this.findAndMatchClosingBracket(input, foundIndex);

			if (foundMatching < 0) {
				return false;
			}

			//take away a set of parens since we found a match already
			input = input.replace("(", "").replace(")", "");

			//recurse back in with the new input
			return this.iterateString(input);

		}


	}

	findAndMatchClosingBracket(str, pos) {

		let scopeIndex = 1;

		for (let i = pos + 1; i < str.length; i++) {
			switch (str[i]) {
				//if we have an open paren then dive deeper into a new scope level
				case '(':
					scopeIndex++;
					break;
				//if we have a close paren then bring scope up and return it's index
				case ')':
					if (--scopeIndex === 0) {
						return i;
					}
					break;
				default:
					break;
			}
		}
		return -1;    // No matching closing paren
	}
}

export default App;
