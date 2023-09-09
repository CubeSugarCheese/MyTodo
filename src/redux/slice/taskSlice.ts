import {
  createEntityAdapter,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import {TaskWithID} from '../../type';
import {RootState} from '../store';

export const tasksAdapter = createEntityAdapter<TaskWithID>();

const initialState = tasksAdapter.getInitialState();

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: {
      reducer(state, action: PayloadAction<TaskWithID>) {
        tasksAdapter.upsertOne(state, action.payload);
      },
      prepare(title: string, detail: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            detail,
            finish: false,
          },
        };
      },
    },
    taskEdited(state, action: PayloadAction<TaskWithID>) {
      tasksAdapter.upsertOne(state, action.payload);
    },
    taskRemoved(state, action: PayloadAction<{taskID: string}>) {
      tasksAdapter.removeOne(state, action.payload.taskID);
    },
    taskUpdateFinishStatus(
      state,
      action: PayloadAction<{taskID: string; finish: boolean}>,
    ) {
      const existingTask = state.entities[action.payload.taskID];
      if (existingTask !== undefined) {
        existingTask.finish = action.payload.finish;
      }
    },
  },
});
export const {taskAdded, taskEdited, taskRemoved, taskUpdateFinishStatus} =
  tasksSlice.actions;

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskByID,
  selectIds: _,
} = tasksAdapter.getSelectors<RootState>(state => state.root.saved.tasks);
