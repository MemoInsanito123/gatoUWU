import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  const [catImage, setCatImage] = useState(null);
  const [catAttributes, setCatAttributes] = useState(null);

  useEffect(() => {
    const fetchCatData = async () => {

      const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "DEMO-API-KEY"
      });

      const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      };

      try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions);
        const data = await response.json();
        setCatImage(data[0].url);
        setCatAttributes(data[0].breeds[0]); // Asumiendo que hay una raza

        console.log(data);
      } catch (error) {
        console.log('Error fetching cat data:', error);
      }
    };

    fetchCatData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>¡Mira este gato!</Text>
      {catImage && (
        <Image
          source={{ uri: catImage }}
          style={styles.catImage}
          resizeMode="cover"
        />
      )}
      {catAttributes && (
        <View style={styles.attributes}>
          <Text>Nombre: {catAttributes.name}</Text>
          <Text>Raza: {catAttributes.breed}</Text>
          <Text>Descripción: {catAttributes.description}</Text>
        </View>
      )}

      
      <StatusBar style="auto" />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  catImage: {
    width: 300,
    height: 300,
    marginVertical: 16,
  },
  attributes: {
    alignItems: 'center',
    marginTop: 16,
  },
});
