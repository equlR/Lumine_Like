import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {store, persistor} from './src/redux';
import StackNavigator from './src/navigations/StackNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigator />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
