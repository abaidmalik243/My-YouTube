import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

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
			// selectedFile: '',
			// showImage: "",
			imageUpload: null
		}
	}

	handleChange = (e) => {
		// const state = this.state;
		// state[e.target.name] = e.target.value;
		this.setState({
			// state
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = e => {

		let data = new FormData(); //formdata object
		e.preventDefault();
		// alert(this.BookName.value);
		const { title, description, imageUpload } = this.state;
		const frm = this.frm.reset();
		data.append("title", title);
		data.append("description", description);
		data.append("imageUpload", imageUpload);
		console.log("data insert time", data.get("imageUpload"));
		axios
		  .post("http://localhost:3000/video/add", data)
		  .then(res => {
			if (res) {
				console.log('Record Saved')
			//   toast.success("Record Save");
			//   this.props.history.push("/showBook");
			}
		  })
		  .catch(err => {
			// toast.error(err);
			console.log(err);
		  });

		// e.preventDefault();
		// console.log('abaid');

		// const data = new FormData() 
		// console.log('data is: ', data);
		// data.append('file', this.state.selectedFile)
		// console.log('data2 is: ', data);

		// axios.post('http://localhost:3000/video/add', data,
		// {     
		// 	headers: { 'content-type': 'multipart/form-data' }
		// }
		// )

		// const data = {
		// 	title: this.state.title,
		// 	description: this.state.description,
		// }
		// this.props.addVideo(data);
	}

	fileUpload = (e) => {
		// console.log('file name is: ', e.target.files[0]);	
		this.setState({
			imageUpload: e.target.files[0]
		})
	}

	render() {
		const { classes } = this.props;
		return (
			<div style={homeStyle}>
				<h1>Add video page</h1>
				{/* <h2>Try searching for videos and watching them!</h2> */}

				<form className={classes.container} onSubmit={this.handleSubmit} ref={el => (this.frm = el)} encType="multipart/form-data" >
					<TextField
						id="title"
						label="Title"
						name="title"
						className={classes.textField}
						margin="normal"
						onChange={this.handleChange}
					/>

					<TextField
						id="description"
						label="Description"
						name="description"
						className={classes.textField}
						margin="normal"
						onChange={this.handleChange}
					/>

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
							Upload
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