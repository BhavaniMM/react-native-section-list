import * as React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import SectionList from 'react-native-section-list';
import { DATA } from './DATA';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        jsonKey={'list'}
        isDate={true}
        containerStyle={styles.container}
        childContainerStyle={undefined}
        data={DATA}
        renderHeading={(title) => (
          <Text style={styles.headerText}>{title}</Text>
        )}
        renderItem={({ item, index }: { item: any; index?: number }) => (
          <Text key={index}>{JSON.stringify(item)}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    padding: 10,
    fontSize: 32,
  },
});
