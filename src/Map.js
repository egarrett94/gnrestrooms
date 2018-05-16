import React, {Component} from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZWdhcnJldHQ5NCIsImEiOiJjamg4NGZub2IwZXhoMndtc3I5a2VmcWdnIn0.TJm2cwfYJ7Fl_zhZV5xmbQ"
});


class MapComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			latitude: 0,
			longitude: 0,
			bathroomResult: null
		}
	}

	componentDidMount() {
		fetch('https://www.refugerestrooms.org:443/api/v1/restrooms/by_location.json?lat=47.60977973258193&lng=-122.3378276824951')
		.then(results => {
			return results.json();
		}).then(data => {
			console.log(data)
			let restroomInfo = data.map((restroom) => {
				return(
					<div key={restroom.results}>
						<p> Location: {restroom.name} </p>
						<p> Address: {restroom.street} {restroom.city} {restroom.state} </p>
						<p> Accessible: {restroom.accessible} </p>
						<p> Other Info: {restroom.directions} </p>
					</div>
				)
			})
			this.setState({bathroomResult: restroomInfo})
		})
	}

	render() {
		return(
			<div>
				{this.state.bathroomResult}
				<Map
				  style="mapbox://styles/egarrett94/cjh835wfb6bm32snz9n3qwvys"
				  containerStyle={{
				    height: "100vh",
				    width: "90vw"
				  }}
				  center={[-122.3378276824951, 47.60977973258193]}>
				    <Layer
				      type="symbol"
				      id="marker"
				      layout={{ "icon-image": "marker-15" }}>
				      <Feature coordinates={[-122.3378276824951, 47.60977973258193]}/>
				    </Layer>
				</Map>
			</div>
			)
	}
}

export default MapComponent;