import React, {Component} from 'react';
import ReactMapboxGl, { Layer, Feature, ZoomControl, Popup } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZWdhcnJldHQ5NCIsImEiOiJjamg4NGZub2IwZXhoMndtc3I5a2VmcWdnIn0.TJm2cwfYJ7Fl_zhZV5xmbQ"
});


class MapComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			latitude: 47.60977973258193,
			longitude: -122.3378276824951,
			bathroomResult: null,
			bathroomMarkers: null,
			currentPopup: null,
			bathroomList: []
		}
		this.onClickMap = this.onClickMap.bind(this);
		this.onMarkerClick = this.onMarkerClick.bind(this);
	}

	fetchTheRestrooms() {
		fetch(`https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json?lat=${this.state.latitude}&lng=${this.state.longitude}`)
		.then(results => {
			return results.json();
		}).then(data => {
			var restroomList = data;
			var restroomInfo = data.map((restroom,index) => {
				return(
					<div key={index} className='indiv-restroom' id={restroom.name} latitude={restroom.latitude} longitude={restroom.longitude}>
						<p> <span className='info-subheader'>Location:</span> {restroom.name} </p>
						<p> <span className='info-subheader'>Address:</span> {restroom.street}, {restroom.city}, {restroom.state} </p>
						<p> <span className='info-subheader'>Accessible:</span> {restroom.accessible ? "Yes" : "No"} </p>
						<p> <span className='info-subheader'>Changing Table:</span> {restroom.changing_table ? "Yes" : "No"} </p>
						<p> <span className='info-subheader'>Other Info:</span> {restroom.directions==="" ? "N/A" : restroom.directions} </p>
					</div>
				)
			})
			var restroomMarkers = data.map((restroom, index) => {
				let long = restroom.longitude
				let lati = restroom.latitude
				return(
		            <Feature key={index} coordinates={[long, lati]} featureName={restroom.name} onClick={(e) => this.onMarkerClick(e, restroom)} />
				)
			})
			this.setState({bathroomResult: restroomInfo, bathroomMarkers: restroomMarkers, bathroomList: restroomList})
		})
	}

	onMarkerClick(e, restroom){
		var featureLong = e.lngLat.lng
		var featureLat = e.lngLat.lat
		var currentRestroomName = restroom.name;
		var popupInfo = <Popup
						  coordinates={[featureLong, featureLat]}
						  offset={{
						    'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
						  }}>
						  <h1>{currentRestroomName}</h1>
						</Popup>
		this.setState({ currentPopup: popupInfo })
	}


	componentDidMount() {
		var userLat
		var userLong
		navigator.geolocation.getCurrentPosition((user) => {
			console.log(user.coords.latitude)
			userLat = user.coords.latitude
			userLong = user.coords.longitude
			this.setState({
				longitude: userLong,
				latitude: userLat
			})
			this.fetchTheRestrooms()
		})
	}

	onClickMap(map, e) {
		let long = e.lngLat.lng
		let lati = e.lngLat.lat 
		this.setState({
			longitude: long,
			latitude: lati 
		});
		this.fetchTheRestrooms()
	}

	render() {
		return(
			<div>
				<div className='bathroom-results'>
					<div className='bathroom-results-overflow'>
						<h3>Nearby Gender-Neutral Restrooms: </h3>
						{this.state.bathroomResult}
						<p className='signature'>Made with <span>&hearts;</span> by <a href='http://www.github.com/egarrett94/gnrestrooms'>Emily Garrett</a></p>
						<div className='socials'>
							<a href='http://www.github.com/egarrett94'><i className="fab fa-github"></i></a>
							<a href='http://www.linkedin.com/in/emariegarrett94'><i className='fab fa-linkedin-in'></i></a>
							<a href='mailto:e.marie.garrett@gmail.com'><i className='fas fa-envelope-square'></i></a>
						</div>
					</div>
				</div>
				<div className='map-container'>
					<Map
						id = 'map'
					 	style={"mapbox://styles/egarrett94/cjh835wfb6bm32snz9n3qwvys"}
					  	containerStyle={{
					    	height: "100vh",
					    	width: "100vw"
					 	}}
					  	zoom={[14]}
					  	center={[this.state.longitude, this.state.latitude]}
					  	onClick = {this.onClickMap}
					>
					  	<ZoomControl position="top-left" />
					    <Layer type="symbol" id="marker" layout={{"icon-image": "heart-15"}} >
							{this.state.bathroomMarkers}
					    </Layer>
						{this.state.currentPopup}
					</Map>
				</div>
			</div>
		)
	}
}

export default MapComponent;