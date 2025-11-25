import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

export const selectAllTasks = (state: RootState) => state.tasks.tasks;
export const selectTaskLoading = (state: RootState) => state.tasks.loading;
export const selectTaskError = (state: RootState) => state.tasks.error;

export const selectTasksByFilter = createSelector(
    [selectAllTasks, (_state: RootState, filter: 'all' | 'assigned' | 'completed', currentUserId?: string) => ({ filter, currentUserId })],
    (tasks, { filter, currentUserId }) => {
        switch (filter) {
            case 'assigned':
                return currentUserId ? tasks.filter(task => task.assigneeId === currentUserId) : tasks;
            case 'completed':
                return tasks.filter(task => task.status === 'done');
            default:
                return tasks;
        }
    }
);
