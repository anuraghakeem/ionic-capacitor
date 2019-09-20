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

  const position = {
    lat: latitude,
    lng: longitude
  };

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
              <div style={h1Styles}>
                {latitude ? (
                  <Map
                    google={props.google}
                    zoom={18}
                    initialCenter={position}
                  >
                    <Marker position={position} />
                  </Map>
                ) : null}
              </div>  
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonApp>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAdeclnX5jO2x7oFJYv7UgQ-ddanZ85BNQ'
})(App);

