import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EditButton from './EditButton';
import {useAppDispatch} from '../hooks';
import {taskRemoved, taskUpdateFinishStatus} from '../redux/slice/taskSlice';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface Props {
  taskID: string;
  title: string;
  detail?: string;
  finish: boolean;
  editCallback?: () => void;
}

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'column',
    padding: 10,
    borderStyle: 'solid',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  checkBoxStyle: {width: 10, flex: 1, alignSelf: 'center'},
  taskNameStyle: {flex: 10, fontSize: 20, alignSelf: 'center'},
  taskDetailStyle: {},
});

export default function TaskCard({
  taskID,
  title,
  detail,
  finish,
  editCallback,
}: Props): React.JSX.Element {
  const [isFinished, setIsFinished] = useState(finish);
  const dispatch = useAppDispatch();

  function confirmAlert() {
    Alert.alert('删除任务', '您确定要删除这个任务吗？', [
      {text: '取消', style: 'cancel'},
      {
        text: '确认删除',
        style: 'destructive',
        onPress: () => {
          dispatch(
            taskRemoved({
              taskID,
            }),
          );
        },
      },
    ]);
  }

  useEffect(() => {
    dispatch(
      taskUpdateFinishStatus({
        taskID,
        finish: isFinished,
      }),
    );
  }, [isFinished]);

  return (
    <TouchableOpacity onLongPress={confirmAlert}>
      <View style={styles.cardStyle}>
        <View style={{flexDirection: 'row'}}>
          <BouncyCheckbox
            style={styles.checkBoxStyle}
            fillColor="#1eaeff"
            isChecked={isFinished}
            onPress={isChecked => {
              setIsFinished(isChecked);
            }}
          />
          <Text
            style={styles.taskNameStyle}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {title}
          </Text>
          <EditButton callback={editCallback} />
        </View>
        {detail !== '' ? (
          <Text style={styles.taskDetailStyle}>{detail}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
