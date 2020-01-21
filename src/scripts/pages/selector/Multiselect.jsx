import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	getInitialState () {
		return {
			value:[]
			};
	},
	componentDidMount() {
	},
	handleSelectChange (value) {
		if(value.length ===0){
			value = null
		}
		this.setState({ value });
		this.props.changed(value)
	},
	render () {
		const {options,placeholder} = this.props;
		const value = this.state.value;
		return (
			<div style={this.props.style}>
				<Select
					closeOnSelect={false}
					disabled={false}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder={placeholder}
					simpleValue
					value={value}
				/>
			</div>
		);
	}
});

module.exports = MultiSelectField;
