import React from 'react';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';
//import './i18n';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import screens from './screens/_index';

// A very simple reducer
function count(state, action) {
  if (typeof state === 'undefined') return 0;
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function lang(state, action) {
  if (typeof state === 'undefined') return 0;
  switch (action.type) {
    case 'EN':
      return 'EN';
    case 'FI':
      return 'FI';
    default:
      return 'EN';
  }
}

// A very simple store {count, lang}
let store = createStore(
  combineReducers({
    count,
    lang,
  }),
);
const Stack = createNativeStackNavigator();

const App = () => {
  let stateContainers = screens.map(s => {
    let screen = {
      ...s,
      statecomponent: connect(state => ({
        count: state.count,
        lang: state.lang,
      }))(s.component),
    };
    return screen;
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={screens[0].key}>
          {/* screens.map(s => (
            <Stack.Screen name={s.key} key={s.key} component={s.component} />
          )) */}
          {stateContainers.map(s => (
            <Stack.Screen
              name={s.key}
              key={s.key}
              component={s.statecomponent}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
