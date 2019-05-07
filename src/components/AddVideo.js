import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addVideo } from '../actions/videoActions';


const homeStyle = {
	textAlign: "center"
}

const styles = theme => ({
	container: {
		//   display: 'flex',
		//   flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 300,
	},
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

class AddVideo extends React.Component {

	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
			imageUpload: null
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = e => {
		e.preventDefault();

		let data = new FormData(); //formdata object
		const { title, description, imageUpload } = this.state;
		data.append("title", title);
		data.append("description", description);
		data.append("imageUpload", imageUpload);

		this.props.addVideo(data);
		this.frm.reset();
	}

	fileUpload = (e) => {
		this.setState({
			imageUpload: e.target.files[0]
		})
	}

	render() {
		const { classes } = this.props;
		return (
			<div style={homeStyle}>
				<h1>Add Video Page</h1>

				<form className={classes.container} onSubmit={this.handleSubmit} ref={el => (this.frm = el)} encType="multipart/form-data" >
					<TextField
						id="title"
						label="Title"
						name="title"
						className={classes.textField}
						margin="normal"
						onChange={this.handleChange}
					/><br />

					<TextField
						id="description"
						label="Description"
						name="description"
						className={classes.textField}
						margin="normal"
						onChange={this.handleChange}
					/><br /><br />

					<input
						accept="image/*"
						className={classes.input}
						id="contained-button-file"
						name="imageUpload"
						// multiple
						onChange={this.fileUpload}
						type="file"
					/>
					<label htmlFor="contained-button-file">
						<Button variant="contained" component="span" className={classes.button}>
							upload
        				</Button>
					</label>

					<Button variant="contained" color="primary" type="submit" className={classes.button}>
						Submit
      				</Button>
				</form>
			</div>
		);
	}

}

// export default AddVideo;

AddVideo.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addVideo: addVideo,
	}, dispatch);
}


export default connect(null, mapDispatchToProps)(withStyles(styles)(AddVideo));