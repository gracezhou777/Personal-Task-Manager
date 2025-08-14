import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useTasks } from '../../src/context/TasksContext';

export default function NewTaskScreen() {
  const { addTask } = useTasks();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const hasTitleError = title.trim().length === 0;

  const handleSubmit = async () => {
    if (hasTitleError || submitting) return;
    try {
      setSubmitting(true);
      const created = addTask({ title, description });
      router.replace({ pathname: '/task/[id]', params: { id: created.id } });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'New Task' }} />
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />
      <HelperText type="error" visible={hasTitleError}>
        Title is required
      </HelperText>
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={5}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit} loading={submitting} disabled={hasTitleError || submitting}>
        Create Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    gap: 8,
  },
  input: {
    marginBottom: 4,
  },
});
