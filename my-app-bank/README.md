# Nombre de los integrantes:
Paulo Cesar Chavez Victorio 
Ernesto Alonso Cortez Cabrera
Luis Antonio Zuñiga Cabrera

# Descripcion de la aplicacion

Se trata de una app bancaria que puede almacenar datos y saldo del usuario por medio de una api en una base de datos
cuenta con funciones como recibir transferencias por medio de qr, hacer retiros de saldo y consultar los movimientos creados recientemente.


se utilizo node.js 20.4 . En el packet jason se modifico para utilizar las siguientes librerias:

  "name": "my-app-bank",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start",
    "reset-project": "node ./scripts/reset-project.js",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest --watchAll",
    "lint": "expo lint"
  },
  "jest": {
    "preset": "jest-expo"
  },
  "dependencies": {
    "@expo/vector-icons": "^14.0.2",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "@react-navigation/native": "^7.0.0",
    "cors": "^2.8.5",
    "expo": "~52.0.15",
    "expo-blur": "~14.0.1",
    "expo-constants": "~17.0.3",
    "expo-font": "~13.0.1",
    "expo-haptics": "~14.0.0",
    "expo-linking": "~7.0.3",
    "expo-router": "~4.0.11",
    "expo-splash-screen": "~0.29.13",
    "expo-status-bar": "~2.0.0",
    "expo-symbols": "~0.2.0",
    "expo-system-ui": "~4.0.5",
    "expo-web-browser": "~14.0.1",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-native": "0.76.3",
    "react-native-gesture-handler": "~2.20.2",
    "react-native-paper": "^5.12.5",
    "react-native-qrcode-svg": "^6.3.12",
    "react-native-reanimated": "~3.16.1",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.1.0",
    "react-native-web": "~0.19.13",
    "react-native-webview": "13.12.5"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/jest": "^29.5.12",
    "@types/react": "~18.3.12",
    "@types/react-test-renderer": "^18.3.0",
    "jest": "^29.2.1",
    "jest-expo": "~52.0.2",
    "react-test-renderer": "18.3.1",
    "typescript": "^5.3.3"
  },
  "private": true
}

se utilizo el siguiente comando para ajecutar la aplicacion

   ```bash
   npm install
   ```

para levantar el servicio de la api el comando es:


    npx expo start
   ```
una vez ejecutado el comando se iniciazara el servicio

 # funcion de la app

![alt text](<Captura de pantalla 2024-12-06 202622-1.png>)
![alt text](<Captura de pantalla 2024-12-06 202555-1.png>)
![alt text](<Captura de pantalla 2024-12-06 202634.png>)