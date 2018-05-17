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
			currentPopup: null
		}
		this.onClickMap = this.onClickMap.bind(this);
		this.onMarkerClick = this.onMarkerClick.bind(this);
	}

	onMarkerClick(e, map, feature){
		//display the name of the restroom
		console.log('we doin it');
		var featureLong = e.lngLat.lng
		var featureLat = e.lngLat.lat
		var popupInfo = <Popup
						  coordinates={[featureLong, featureLat]}
						  offset={{
						    'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
						  }}>
						  <h1>Popup</h1>
						</Popup>
		this.setState({ currentPopup: popupInfo })
	}

	fetchTheRestrooms() {
		fetch(`https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json?lat=${this.state.latitude}&lng=${this.state.longitude}`)
		.then(results => {
			return results.json();
		}).then(data => {
			// console.log(data)
			let restroomInfo = data.map((restroom) => {
				return(
					<div key={restroom.id} className='indiv-restroom'>
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
		            <Feature key={index} coordinates={[long, lati]} onClick={this.onMarkerClick} />
				)
			})
			this.setState({bathroomResult: restroomInfo, bathroomMarkers: restroomMarkers})
		})
	}

	componentDidMount() {
		this.fetchTheRestrooms()
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
					<h3>Nearby Gender-Neutral Restrooms: </h3>
					{this.state.bathroomResult}
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
					  	<ZoomControl />
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