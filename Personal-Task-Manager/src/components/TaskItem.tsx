import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Chip } from 'react-native-paper';
import type { Task } from '../types/Task';

export interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const isCompleted = task.status === 'completed';

  return (
    <Link href={{ pathname: '/task/[id]', params: { id: task.id } }} asChild>
      <List.Item
        title={task.title}
        description={task.description}
        left={() => (
          <View style={[styles.statusDot, isCompleted ? styles.completed : styles.pending]} />
        )}
        right={() => (
          <Chip compact style={isCompleted ? styles.badgeCompleted : styles.badgePending}>
            {isCompleted ? 'Completed' : 'Pending'}
          </Chip>
        )}
        style={styles.item}
        accessibilityRole="button"
        accessibilityLabel={`Open task ${task.title}`}
      />
    </Link>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 12,
    marginRight: 12,
  },
  completed: {
    backgroundColor: '#22c55e',
  },
  pending: {
    backgroundColor: '#eab308',
  },
  badgeCompleted: {
    backgroundColor: '#dcfce7',
  },
  badgePending: {
    backgroundColor: '#fef9c3',
  },
});
