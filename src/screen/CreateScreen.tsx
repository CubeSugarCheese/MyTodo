import React from 'react';
import type NavigateProps from '../type';
import TaskControlScreen from './TaskControlScreen';
import {useAppDispatch} from '../hooks';
import {useToast} from 'react-native-toast-notifications';
import {taskAdded} from '../redux/slice/taskSlice';

export default function CreateScreen({
  navigation,
}: NavigateProps<'Create'>): React.JSX.Element {
  const [title, setTitle] = React.useState('');
  const [detail, setDetail] = React.useState('');
  const dispatch = useAppDispatch();
  const toast = useToast();

  function callback() {
    if (title === '') {
      toast.hideAll();
      toast.show('请先设置标题');
      return;
    }
    dispatch(taskAdded(title, detail));
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
