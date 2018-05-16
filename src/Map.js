import React, {Component} from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZWdhcnJldHQ5NCIsImEiOiJjamg4NGZub2IwZXhoMndtc3I5a2VmcWdnIn0.TJm2cwfYJ7Fl_zhZV5xmbQ"
});


class MapComponent extends Component {

	render() {
		return(
			<Map
			  style="mapbox://styles/egarrett94/cjh835wfb6bm32snz9n3qwvys"
			  containerStyle={{
			    height: "100vh",
			    width: "100vw"
			  }}
			  center={[-122.3378276824951, 47.60977973258193]}>
			    <Layer
			      type="symbol"
			      id="marker"
			      layout={{ "icon-image": "marker-15" }}>
			      <Feature coordinates={[-122.3378276824951, 47.60977973258193]}/>
			    </Layer>
			</Map>
			)
	}

}

export default MapComponent;