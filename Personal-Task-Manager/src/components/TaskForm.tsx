import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

export interface TaskFormValues {
  title: string;
  description: string;
}

export interface TaskFormProps {
  initialValues?: Partial<TaskFormValues>;
  submitLabel: string;
  onSubmit: (values: TaskFormValues) => Promise<void> | void;
}

export default function TaskForm({ initialValues, submitLabel, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [submitting, setSubmitting] = useState(false);

  const hasTitleError = useMemo(() => title.trim().length === 0, [title]);

  const handleSubmit = async () => {
    if (hasTitleError || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit({ title, description });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
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
        {submitLabel}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  input: {
    marginBottom: 4,
  },
});
