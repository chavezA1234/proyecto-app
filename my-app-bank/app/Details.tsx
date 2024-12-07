import {StyleSheet, Platform ,Alert,TextInput,Text} from 'react-native';
import {Stack } from 'expo-router';
import { Button } from '@react-navigation/elements';
import React, {useEffect,useState} from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import movimientos from './movimientos'
import tranferencia from './tranferencia'


import {
  createStaticNavigation,
  useNavigation,
  useRoute
} from '@react-navigation/native';



export default function NotFoundScreen( ) {
  console.log("Movimientos")
  const route = useRoute();

  

  const [labelText ] = useState(String(route.params.email));
  const [labelSaldo] = useState(String(route.params.saldo));
  
 
  const navigation = useNavigation();
  const getMovimientos = async () => {
    
    try {
      console.log("Movimientos")
      const response = await fetch(
        'http://192.168.1.99:3000/menu', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opcion: '4',
          email: 'maria@gmail.com',
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Stack.Screen options={{ title: 'Salir!' }} />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Menu!</ThemedText>
        
        
        
        <HelloWave />
        <ThemedText type="title">Hola! </ThemedText>
        
      </ThemedView>
      <Text style={styles.titleContainer}>Hola :{labelText}</Text>
      <Text style={styles.titleContainer}>Saldo :{labelSaldo}</Text>
      
      <ThemedView style={styles.stepContainer}>

      <Button onPress={() =>  navigation.navigate('tranferencia')}>
       Tranferencia
       
      </Button>
      <Button onPress={() => getMovimientos()}>
       Retiro
      </Button>

      <Button onPress={() => navigation.navigate('movimientos')}>
       Movimientos
      </Button>

      

      
        
   
       
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
