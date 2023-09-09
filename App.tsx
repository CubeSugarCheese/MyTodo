import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './src/screen/MainScreen';
import EditScreen from './src/screen/EditScreen';
import CreateScreen from './src/screen/CreateScreen';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {RootStackParamList} from './src/type';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootComponent(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{title: 'MyTodo'}}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{title: '编辑任务'}}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{title: '新建任务'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <RootComponent />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}
