import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { QueryClientProvider } from 'react-query';
import { client } from './src/state';
import { PhotosList, Photo } from './src';

console.disableYellowBox = true;

const Stack = createNativeStackNavigator();
const RootRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Collections" component={PhotosList} />
      <Stack.Screen
        name="Photo"
        component={Photo}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: route?.params?.selectedPhoto?.avg_color,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export function App() {
  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <RootRoute />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
