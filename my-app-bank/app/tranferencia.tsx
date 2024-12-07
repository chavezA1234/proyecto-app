import {Stack } from 'expo-router';
import {StyleSheet,FlatList ,View,Text,ScrollView,Button, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
let mov: any
import QRCode from 'react-native-qrcode-svg';

export default function tranferencia() {
  const qrValue = "https://reactnative.dev/";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const getMovimientosUser = async () => {
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
          opcion: '3',
          email: 'maria@gmail.com',
        }),
      });
      const json = await response.json();
      setData(json.movimientos)
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovimientosUser()

  }, []);
  return (
    
    <>
      <Stack.Screen options={{ title: 'Regresar Menu!' }} />
      <Button 
      title="Mostrar Alerta"
      onPress={() =>  Alert.alert("a")}/>
       
      <QRCode
        value={qrValue} // El valor que se codifica en el QR
        size={200} // Tamaño del QR
        color="black" // Color del código QR
        backgroundColor="white" // Fondo del código QR
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f2f2f2',
  },
  cell: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
