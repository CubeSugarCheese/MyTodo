import React, {useLayoutEffect} from 'react';
import {WhiteSpace, WingBlank} from '@ant-design/react-native';
import {FlatList, SafeAreaView, useColorScheme} from 'react-native';
import TaskCard from '../component/TaskCard';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import type {EditScreenParam, NavigateProps, TaskWithID} from '../type';
import {useAppSelector} from '../hooks';
import {selectAllTasks} from '../redux/slice/taskSlice';
import CreateTaskButton from '../component/CreateTaskButton';

export default function MainScreen({
  navigation,
}: NavigateProps<'Main'>): React.JSX.Element {
  function headerRightButton() {
    return (
      <CreateTaskButton
        callback={() => {
          navigation.navigate('Create');
        }}
      />
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: headerRightButton,
    });
  }, [navigation]);
  function renderTask({item}: {item: TaskWithID}): React.JSX.Element {
    return (
      <TaskCard
        title={item.title}
        detail={item.detail}
        taskID={item.id}
        finish={item.finish}
        editCallback={() => {
          const param: EditScreenParam = {
            taskID: item.id,
          };
          navigation.navigate('Edit', param);
        }}
      />
    );
  }

  const tasks = useAppSelector(selectAllTasks);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <WingBlank size="lg">
        <WhiteSpace />
        <FlatList
          data={tasks}
          renderItem={renderTask}
          ItemSeparatorComponent={WhiteSpace}
        />
      </WingBlank>
    </SafeAreaView>
  );
}
