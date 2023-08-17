import React from 'react';
import {
  FlatList,
  SafeAreaView,
  type ViewStyle,
  type FlatListProps,
} from 'react-native';
import type { ListRenderItem } from '@react-native/virtualized-lists';
import { modifySectionList } from './utils';
import SectionedListData from './SectionedListData';
import { Text } from 'react-native';

interface Props extends FlatListProps<any> {
  jsonKey: string | undefined;
  isDate?: boolean;
  childContainerStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  renderHeading?: React.FC<any>;
  renderItem: ListRenderItem<any> | null | undefined;
  data: Array<any>;
}

function SectionList(props: Props) {
  const {
    jsonKey,
    isDate = false,
    renderHeading,
    containerStyle,
    childContainerStyle,
    renderItem,
    data,
  } = props;
  const sectionListData: any = modifySectionList(data, jsonKey, isDate);

  return (
    <SafeAreaView style={containerStyle}>
      {sectionListData?.length > 0 ? (
        <FlatList
          {...props}
          data={sectionListData}
          renderItem={({ item }) => (
            <SectionedListData
              listData={item}
              renderItem={renderItem}
              renderHeading={renderHeading}
              listContainerStyle={childContainerStyle}
            />
          )}
          keyExtractor={
            props.keyExtractor || ((_item, index) => index.toString())
          }
        />
      ) : (
        <Text>No Data Found</Text>
      )}
    </SafeAreaView>
  );
}

export default SectionList;
