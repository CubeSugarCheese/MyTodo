import React from 'react';
import type NavigateProps from '../type';
import TaskControlScreen from './TaskControlScreen';
import {useToast} from 'react-native-toast-notifications';
import {selectTaskByID, taskEdited} from '../redux/slice/taskSlice';
import {useAppDispatch, useAppSelector} from '../hooks';

export default function EditScreen({
  route,
  navigation,
}: NavigateProps<'Edit'>): React.JSX.Element {
  const taskID = route.params.taskID;
  const task = useAppSelector(state => selectTaskByID(state, taskID)!);
  const [title, setTitle] = React.useState(task.title);
  const [detail, setDetail] = React.useState(task.detail);
  const dispatch = useAppDispatch();
  const toast = useToast();
  function callback() {
    if (title === '') {
      toast.hideAll();
      toast.show('请先设置标题');
      return;
    }
    dispatch(
      taskEdited({
        id: taskID,
        title,
        detail,
        finish: task.finish,
      }),
    );
    //toast.show(`Edit: ${JSON.stringify(param)}`);
    navigation.navigate('Main');
  }

  return (
    <TaskControlScreen
      title={title}
      setTitle={setTitle}
      detail={detail}
      setDetail={setDetail}
      callback={callback}
    />
  );
}
