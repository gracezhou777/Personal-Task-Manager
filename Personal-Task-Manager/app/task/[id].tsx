import React, { useMemo } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Text, Chip, Divider } from 'react-native-paper';
import { useTasks } from '../../src/context/TasksContext';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks } = useTasks();

  const task = useMemo(() => tasks.find(t => t.id === id), [id, tasks]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Task Detail' }} />
      {task ? (
        <View style={styles.content}>
          <Text variant="headlineSmall">{task.title}</Text>
          <Chip style={task.status === 'completed' ? styles.badgeCompleted : styles.badgePending}>
            {task.status === 'completed' ? 'Completed' : 'Pending'}
          </Chip>
          <Divider />
          <Text variant="bodyLarge">{task.description}</Text>
        </View>
      ) : (
        <Text variant="bodyLarge" style={styles.empty}>Task not found (id: {String(id)})</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  content: {
    gap: 12,
  },
  badgeCompleted: {
    alignSelf: 'flex-start',
    backgroundColor: '#dcfce7',
  },
  badgePending: {
    alignSelf: 'flex-start',
    backgroundColor: '#fef9c3',
  },
  empty: {
    marginTop: 20,
    color: '#6b7280',
  },
});
