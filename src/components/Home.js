import React from 'react';
// import { Link } from 'react-router-dom';
import video from './islam.mp4';
import noImage from '../assets/noImage.jpeg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { BASE_URL } from '../constants/Application';
// import Axios from 'axios';

const homeStyle = {
	textAlign: "center"
}

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: 15
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
});

// const Home = (props) => {
class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			NoImage: noImage
		}
	}

	componentWillMount() {

		axios
			.get("http://localhost:3000/video/getVideos")
			.then(res => {
				if (res) {
					this.setState({
						data: res.data
					})
				}
			})
			.catch(err => { console.log(err); })
	}

	render() {
		const { classes } = this.props;
		const { data } = this.state;
		return (
			<div style={homeStyle}>
				<h1>Home Page</h1>

				<div className={classes.root}>
					<Grid container spacing={8}>
						<Grid item xs={3}>
							<video type="video/mp4" src={video} autoPlay={true} width="100%" controls />
							<h4>Molana Tariq Jameel 2019</h4>
						</Grid>
						{data.map((item, index) => {
							console.log(item)
							return (
								<Grid item xs={3} key={index}>
									<img src={(item.url != null) ? `${BASE_URL}video/getFile/${item.url}` : this.state.NoImage} width="100%" height="250px" />
									<h4>{item.title}</h4>
									<p>{item.description}</p>
								</Grid>
							)
						})}
					</Grid>
				</div>

			</div>
		);
	}
}


Home.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);