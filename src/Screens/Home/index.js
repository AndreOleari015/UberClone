import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';

import api from "../../api";
import { styles } from './styles';

export function Home({ navigation }) {

  const MapEl = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);
  const [adress, setAdress] = useState(null);

  useEffect(() => {
    (async function () {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      } else {
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.000922,
          longitudeDelta: 0.000421,
        })
      }
    })();
  }, [])
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={origin}
        showsUserLocation={true}
        zoomEnabled={false}
        loadingEnabled={true}
        ref={MapEl}
      >
        {destination &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={api.googleApi}
            strokeWidth={3}
            onReady={result => {
              console.log(result)
              MapEl.current.fitToCoordinates(
                result.coordinates, {
                edgePadding: {
                  top: 50,
                  bottom: 50,
                  left: 50,
                  right: 50
                }
              },
              ),
                setDistance(result.distance);
              setPrice(result.distance * 3);
            }}
          />
        }
      </MapView>
      <View style={styles.search}>
        <GooglePlacesAutocomplete
          placeholder='Para onde vamos ?'
          onPress={(data, details = null) => {
            setAdress(data.description);
            setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.000922,
              longitudeDelta: 0.000421,
            });
          }}
          query={{
            key: api.googleApi,
            language: 'pt-br',
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={
            {
              listView: { backgroundColor: "#FFF", zIndex: 10 },
              container: { position: "absolute", width: "100%" }
            }
          }
        />
        {distance &&
          <View style={styles.distance}>
            <Text style={styles.distanceText}>Distância: {distance.toFixed(2).replace(".", ",")}Km</Text>
            <TouchableOpacity
              style={styles.price}
              onPress={() => navigation.navigate("Checkout", { price: price.toFixed(2).replace(".", ","), adress })}
            >
              <Text style={styles.priceText}>
                <MaterialIcons name="payment" size={24} color="#FFF" />
                Pagar R${price.toFixed(2).replace(".", ",")}
              </Text>

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.price}
              onPress={() => (
                setDestination(null) &
                setDistance(null) &
                setPrice(null) &
                setAdress(null)
              )

              }
            >
              <Text style={styles.priceText}>
                Cancelar
              </Text>

            </TouchableOpacity>
          </View>
        }
      </View>
    </View >
  );
}
