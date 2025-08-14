import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import TaskForm from '../../src/components/TaskForm';
import { useTasks } from '../../src/context/TasksContext';

export default function NewTaskScreen() {
  const { addTask } = useTasks();
  const router = useRouter();

  const handleSubmit = async ({ title, description }: { title: string; description: string }) => {
    const created = addTask({ title, description });
    router.replace({ pathname: '/task/[id]', params: { id: created.id } });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'New Task' }} />
      <TaskForm submitLabel="Create Task" onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});
