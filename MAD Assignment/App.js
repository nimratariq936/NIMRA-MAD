import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './frontend/navigation/AppNavigator';
import { CounterProvider } from './frontend/context/CounterContext';

// Main App component using Context Provider (from lecture)
export default function App() {
  return (
    <CounterProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CounterProvider>
  );
}