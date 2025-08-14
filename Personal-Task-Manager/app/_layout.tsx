import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { TasksProvider } from '../src/context/TasksContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <TasksProvider>
          <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{ title: 'Tasks' }} />
          </Stack>
        </TasksProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 