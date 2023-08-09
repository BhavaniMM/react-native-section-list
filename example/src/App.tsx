import * as React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import SectionList from 'react-native-section-list';
import { COLORSDATA } from './COLORSDATA';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        JSON_KEY={'color'}
        isDate={true}
        containerStyle={styles.container}
        childContainerStyle={undefined}
        data={COLORSDATA}
        renderHeading={(title) => (
          <Text style={styles.colorHeader}>{title}</Text>
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
  },
  colorHeader: {
    padding: 10,
    fontSize: 32,
  },
});
