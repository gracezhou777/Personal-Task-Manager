import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { Task, TaskStatus } from '../types/Task';
import { mockTasks } from '../mock/tasks';

export interface CreateTaskInput {
  title: string;
  description: string;
  status?: TaskStatus;
}

export interface EditTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface TasksContextValue {
  tasks: Task[];
  addTask: (input: CreateTaskInput) => Task;
  editTask: (id: string, changes: EditTaskInput) => Task | undefined;
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

function generateTaskId(): string {
  const now = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `t_${now}_${rand}`;
}

export function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>(() => [...mockTasks]);

  const addTask = useCallback((input: CreateTaskInput): Task => {
    const newTask: Task = {
      id: generateTaskId(),
      title: input.title.trim(),
      description: input.description.trim(),
      status: input.status ?? 'pending',
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }, []);

  const editTask = useCallback((id: string, changes: EditTaskInput): Task | undefined => {
    let updated: Task | undefined;
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      updated = {
        ...t,
        title: changes.title !== undefined ? changes.title.trim() : t.title,
        description: changes.description !== undefined ? changes.description.trim() : t.description,
        status: changes.status ?? t.status,
      };
      return updated;
    }));
    return updated;
  }, []);

  const value = useMemo<TasksContextValue>(() => ({ tasks, addTask, editTask }), [tasks, addTask, editTask]);

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error('useTasks must be used within TasksProvider');
  }
  return ctx;
}
