/**
 * @format
 */

import {AppRegistry, AppState} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
console.log("appstate on index", AppState)
const AppWithProvider = () => (

    <Provider store={store}>
         <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithProvider);



