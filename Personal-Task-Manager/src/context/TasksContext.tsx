import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { Task, TaskStatus } from '../types/Task';
import { mockTasks } from '../mock/tasks';

export interface CreateTaskInput {
  title: string;
  description: string;
  status?: TaskStatus;
}

export interface TasksContextValue {
  tasks: Task[];
  addTask: (input: CreateTaskInput) => Task;
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

  const value = useMemo<TasksContextValue>(() => ({ tasks, addTask }), [tasks, addTask]);

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
