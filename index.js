/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true); // Ignora todos los warnings

AppRegistry.registerComponent(appName, () => App);
