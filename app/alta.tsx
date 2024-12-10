import {StyleSheet, Pressable,SafeAreaView,View ,Text,TextInput} from 'react-native';
import {Stack } from "expo-router";
import { Button } from '@react-navigation/elements';

import React from 'react';
import {
    createStaticNavigation,
    useNavigation,
    useRoute
  } from '@react-navigation/native';
  
export default function Home() {
    const navigation = useNavigation();
    const [nombre,onChangeTextNombre] = React.useState('');
    const [apellido,onChangeTextApellido] = React.useState('');
    const [email,onChangeTextEmail] = React.useState('');
    const [contra,onChangeTextContra] = React.useState('');
    const [monto,onChangeText] = React.useState('');
    const insert = async () => {
        try {
          const response = await fetch(
            'http://192.168.1.103:3000/menu', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "opcion":"1",
                "nombre":nombre,
                "apellido":apellido,
                "email":email,
                "saldo" :monto
            }),
          });
          const json = await response.json();
          navigation.navigate('Details', {
            email: email,
            saldo:monto
          });
          console.log(json)
          return json;
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>Registro de usuario</Text>
      <View style={{ gap: 20 }}>
      <Text style={styles.title}>Nombre</Text>
      <TextInput style={styles.buttonStyle} value={nombre}  onChangeText={onChangeTextNombre}/>
      <Text style={styles.title}>Apellido</Text>
      <TextInput style={styles.buttonStyle} value={apellido}  onChangeText={onChangeTextApellido}/>
      <Text style={styles.title}>Email</Text>
      <TextInput style={styles.buttonStyle} value={email}  onChangeText={onChangeTextEmail}/>
      <Text style={styles.title}>Contraseña</Text>
      <TextInput style={styles.buttonStyle} secureTextEntry={true} value={contra}  onChangeText={onChangeTextContra}/>
      <Text style={styles.title}>Monto</Text>
      <TextInput style={styles.buttonStyle} value={monto} keyboardType="numeric" onChangeText={onChangeText}/>
      
      <Button onPress={() => insert()}>
       Guardar
      </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    justifyContent: "space-around",
    paddingVertical:20,
  },
  title: {
    color: "white",
    fontSize: 30,
  },
  buttonStyle: {
    color: "#0E7AFE",
    backgroundColor: "white",
    fontSize: 15,
    textAlign: "center",
  },
});