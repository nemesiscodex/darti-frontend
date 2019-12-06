import React from "react";
import {Map, TileLayer, withLeaflet, MapControl, Marker} from "react-leaflet";
import { OpenStreetMapProvider,GeoSearchControl } from "leaflet-geosearch";
import 'leaflet-geosearch/assets/css/leaflet.css'
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";


class GeoSearch extends MapControl {
    constructor(props, context) {
        super(props);
    }

    createLeafletElement(opts) {
        const provider = new OpenStreetMapProvider();
        return new GeoSearchControl({
            provider: provider,
            position: "topleft",
            autoClose: true,

        });
    }

    componentDidMount() {
        const { map } = this.props.leaflet;
        map.addControl(this.leafletElement);
    }
}

const LeafletGeoSearch = withLeaflet(GeoSearch);

export default function MapPicker({latitude, longitude, onChange = () => {}, className}) {

    const [marker, setMarker] = React.useState([latitude, longitude]);

    latitude = latitude || "-25.3087376";
    longitude = longitude || "-57.6197428";


    function drawMarker() {
        if (marker && marker[0] && marker[1]) {
            return (<Marker position={[marker[0], marker[1]]} />)
        }
        return null;
    }

    function clickHandler(event) {
        let position = event.latlng;
        setMarker([position.lat, position.lng])
    }

    function handleChange() {
        if (marker) {
            onChange(marker)
        } else {
            onChange(["", ""])
        }
    }



    if (Map && TileLayer) {
        return (<>
            <Typography variant={"h5"}>
                Pick a location
            </Typography>
            <Map
                center={[latitude, longitude]}
                zoom={6}
                className={className}
                onClick={clickHandler}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
                    subdomains="abcd"
                />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
                    subdomains="abcd"
                />
                {drawMarker()}
                <LeafletGeoSearch />
            </Map>
            <Button
                variant={"outlined"}
                style={{margin: 1}}
                onClick={handleChange}
                >
                OK
            </Button>

            </>)
    } else return (<></>)
}