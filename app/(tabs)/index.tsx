import { Image, StyleSheet, Platform ,Alert,TextInput} from 'react-native';
import { Button } from '@react-navigation/elements';
import React, {useEffect} from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';


export default function HomeScreen() {
  const [text, onChangeText] = React.useState('email');
  const [contraseña,onChangeText2] = React.useState('contraseña');
  const navigation = useNavigation();
  const getMoviesFromApiAsync = async () => {
    try {
     
     console.log('Input Value:', text);
     console.log('Input  :', contraseña);
     console.log("entrod")
      const response = await fetch(
        'http://192.168.1.103:3000/menu', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opcion: '4',
          email: text,
        }),
      });
      const json = await response.json();
      navigation.navigate('Details', {
        email: text,
        saldo:json.message
      });
      console.log(json)
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <ParallaxScrollView
    
      headerBackgroundColor={{ light: '#A1CEDC', dark: 'white' }}
      headerImage={
        <Image
          source={require('@/assets/images/logouabcs1.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">BanUABCS!</ThemedText>
        
        
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
      <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="correo"
          id="email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText2}
          value={contraseña}
          secureTextEntry={true}
          placeholder="correo"
          id="pass"
        />
      <Button onPress={() => getMoviesFromApiAsync()}>
       ingresar
      </Button>
      <Button onPress={() => navigation.navigate('alta')}>
       Crear usuario
      </Button>
      </ThemedView>
    </ParallaxScrollView>
    
  );
}





const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#0E7AFE",
    fontSize: 20,

  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '45%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: '30%',
  },
});
