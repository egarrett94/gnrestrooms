import React, {Component} from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

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
			bathroomMarkers: null
		}
		this.onClickMap = this.onClickMap.bind(this);
	}

	// componentDidUpdate() {
 //    	this.setFill();
 //  	}

	fetchTheRestrooms() {
		fetch(`https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json?lat=${this.state.latitude}&lng=${this.state.longitude}`)
		.then(results => {
			return results.json();
		}).then(data => {
			console.log(data)
			let restroomInfo = data.map((restroom) => {
				return(
					<div key={restroom.id}>
						<p> <span className='info-subheader'>Location:</span> {restroom.name} </p>
						<p> <span className='info-subheader'>Address:</span> {restroom.street}, {restroom.city}, {restroom.state} </p>
						<p> <span className='info-subheader'>Accessible:</span> {restroom.accessible} </p>
						<p> <span className='info-subheader'>Other Info:</span> {restroom.directions} </p>
						<hr />
					</div>
				)
			})
			var restroomMarkers = data.map((restroom, index) => {
				let long = restroom.longitude
				let lati = restroom.latitude
				console.log(long)
				return(
					
					// <Layer type="symbol" id="marker" layout={{"icon-image": "marker-12"}} >
			          
			            <Feature key={index} coordinates={[long, lati]} />
			         
			        // </Layer>
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
		console.log('new longitude: ', long);
		console.log('new latitude: ', lati);
		console.log(e.lngLat)
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
					    width: "70vw"
					  }}
					  center={[-122.3378276824951, 47.60977973258193]}
					  onClick = {this.onClickMap}

					  >
					    <Layer type="circle" id="marker">
							{this.state.bathroomMarkers}
					    </Layer>

					</Map>
				</div>
			</div>
			)
	}
}

export default MapComponent;