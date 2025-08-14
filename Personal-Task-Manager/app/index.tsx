import React from 'react';
import { StyleSheet, View } from 'react-native';
import TaskList from '../src/components/TaskList';
import { useTasks } from '../src/context/TasksContext';
import { FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { tasks } = useTasks();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TaskList tasks={tasks} />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/task/new')}
        accessibilityLabel="Add task"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
  },
}); 