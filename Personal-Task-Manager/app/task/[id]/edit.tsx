import React, { useMemo } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import TaskForm from '../../../src/components/TaskForm';
import { useTasks } from '../../../src/context/TasksContext';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, editTask } = useTasks();
  const router = useRouter();

  const task = useMemo(() => tasks.find(t => t.id === id), [id, tasks]);

  const handleSubmit = async ({ title, description }: { title: string; description: string }) => {
    if (!id) return;
    editTask(String(id), { title, description });
    router.replace({ pathname: '/task/[id]', params: { id } });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Edit Task' }} />
      <TaskForm
        initialValues={{ title: task?.title ?? '', description: task?.description ?? '' }}
        submitLabel="Save Changes"
        onSubmit={handleSubmit}
      />
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
