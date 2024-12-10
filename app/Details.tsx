import {StyleSheet ,Alert,TextInput,Text} from 'react-native';
import { Link, Stack } from "expo-router";

import { Button } from '@react-navigation/elements';
import React, {useEffect,useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
      console.log("extra")
      const response = await fetch(
        'http://192.168.1.103:3000/menu', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opcion: '4',
          email: labelText,
        }),
      });
      const json = await response.json();
      console.log("saldo"+json)
      return json;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovimientos()

  }, []);
  return (
    <>
      <Stack.Screen options={{ title: 'Salir!' }} />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" >Menu de Operaciones <HelloWave />  </ThemedText>
        
      </ThemedView>
      <Text style={styles.titleContainer}>Tu Saldo :{labelSaldo}</Text>
      
      <ThemedView style={styles.stepContainer}>
      <Link href={{ pathname: '/cobro', params: { userId: labelText, userName: 'John Doe' } }} asChild>
          
            <Text
              style={
                styles.buttonStyle
                
              }
            >
              Tranferencia
            </Text>
        </Link>


      <Button onPress={() => navigation.navigate('pago',{email:labelText})}>
       Retiro
      </Button>

      <Button onPress={() => navigation.navigate('movimientos',{email:labelText})}>
       Movimientos
      </Button>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    justifyContent: "space-around",
    paddingVertical: 80,
  },
  buttonStyle: {
    color: "#0E7AFE",
    fontSize: 20,
    textAlign: "center",
  },
  titleContainer: {
    alignItems: "center",
    color: "white",
    fontSize: 20,
    backgroundColor: "black",
    justifyContent: "space-around",
    paddingVertical: 0,
  },
  title: {
    color: "white",
    fontSize: 40,
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
