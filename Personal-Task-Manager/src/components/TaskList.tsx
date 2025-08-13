import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import type { Task } from '../types/Task';
import TaskItem from './TaskItem';

export interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <TaskItem task={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    paddingVertical: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginLeft: 16,
  },
});
