import {
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


import MapComponent from "./Map";
import { usePosition } from "./usePosition";

import "./App.css";
import CSS from 'csstype';


const h1Styles: CSS.Properties = {
  width: '500px',
  height: '500px'
};

const App = (props: any, { watch, settings }: any) => {
  const { latitude, longitude, timestamp, accuracy, error }: any = usePosition(
    watch,
    settings
  );

  const homePosition = {
    lat: latitude,
    lng: longitude
  };

  const allMarks = [homePosition,
    {lat: 12.936871, lng: 77.689056},
    {lat: 12.957198, lng: 77.701535},
    {lat: 12.927365, lng:  77.681063}];

    const displayMarkers = () => {
      return allMarks.map((chosenMarker, index) => {
        return (<Marker key={index} position={chosenMarker}
       onClick={() => console.log("You clicked me!")} />)
      })
    }

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Publicis Sapient</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              
              {/* <div style={h1Styles}>
                {latitude ? (
                  <Map
                    google={props.google}
                    zoom={18}
                    initialCenter={homePosition}
                  > */}
                    {/* <Marker position={position} /> */}
                    {displayMarkers()}
                  {/* </Map>
                ) : null}
              </div> */}
              <MapComponent />  
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          <p>{accuracy}</p>  
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonApp>
  );
};

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyAdeclnX5jO2x7oFJYv7UgQ-ddanZ85BNQ'
// })(App);

export default App;

