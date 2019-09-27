import React, {useEffect, useState} from 'react';
import { withGoogleMap, withScriptjs, GoogleMap,Marker,Polyline } from 'react-google-maps'

const Map=(props:any)=> {
    const [progress, setProgress] = useState([]);

    let path = [
        { lat: 18.558908, lng: -68.389916 },
        { lat: 18.558853, lng: -68.389922 },
        { lat: 18.558375, lng: -68.389729 },
        { lat: 18.558032, lng: -68.389182 },
        { lat: 18.55805, lng: -68.388613 },
        { lat: 18.558256, lng: -68.388213 },
        { lat: 18.558744, lng: -68.387929 }
      ];
    
    let  velocity = 5
    let  initialDate = new Date()
    
    const  getDistance = () => {
        // seconds between when the component loaded and now
        var currDate= new Date()
        const differentInTime = Math.abs(currDate.getTime() - initialDate.getTime()) / 1000 // pass to seconds
        return differentInTime * velocity // d = v*t -- thanks Newton!
      }
    
      useEffect(() => {
        let interval= window.setInterval(moveObject, 1000)
      
        // returned function will be called on component unmount 
        return () => {
            window.clearInterval(interval)
        }
      }, []) 

      const moveObject = () => {
        const distance = getDistance()
        if (! distance) {
          return
        }
        console.log(path);
        let progress = path.filter(coordinates => coordinates.distance < distance)
        const nextLine = path.find(coordinates => coordinates.distance > distance)
    if (! nextLine) {
        setProgress({progress})
      return // it's the end!
    }
    const lastLine = progress[progress.length - 1]

    const lastLineLatLng = new window.google.maps.LatLng(
      lastLine.lat,
      lastLine.lng
    )

    const nextLineLatLng = new window.google.maps.LatLng(
      nextLine.lat,
      nextLine.lng
    )

    // distance of this line 
    const totalDistance = nextLine.distance - lastLine.distance
    const percentage = (distance - lastLine.distance) / totalDistance

    const position = window.google.maps.geometry.spherical.interpolate(
      lastLineLatLng,
      nextLineLatLng,
      percentage
    )

    progress = progress.concat(position)
        setProgress({ progress })
      }
    
    //   let consoleDistance = () => {
    //     console.log(getDistance())
    //   }

    path = path.map((coordinates, i, array) => {
    if (i === 0) {
        return { ...coordinates, distance: 0 } // it begins here! 
    }
    const { lat: lat1, lng: lng1 } = coordinates
    const latLong1 = new window.google.maps.LatLng(lat1, lng1)

    const { lat: lat2, lng: lng2 } = array[0]
    const latLong2 = new window.google.maps.LatLng(lat2, lng2)

    // in meters:
    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
        latLong1,
        latLong2
    )

    return { ...coordinates, distance }
    })
  
      console.log(path)
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 18.559008, lng: -68.388881 }}
        >
        {progress && (
            <>
        <Polyline path={path} options={{ strokeColor: "#FF0000 " }} />
        {props.isMarkerShown && <Marker position={path[path.length - 1]} />}
        </>
        )}
      </GoogleMap>
    )
}

const MapComponent = withScriptjs(withGoogleMap(Map))

export default () => (
  <MapComponent
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAdeclnX5jO2x7oFJYv7UgQ-ddanZ85BNQ"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px`, width: '500px' }} />}
  mapElement={<div style={{ height: `100%` }} />}
  isMarkerShown
  />
)