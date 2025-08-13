import React from 'react';
import { StyleSheet, View } from 'react-native';
import { mockTasks } from '../src/mock/tasks';
import TaskList from '../src/components/TaskList';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TaskList tasks={mockTasks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
}); 