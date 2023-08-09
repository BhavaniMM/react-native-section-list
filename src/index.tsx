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

interface Props extends FlatListProps<any> {
  JSON_KEY: string | undefined;
  isDate?: boolean;
  childContainerStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  renderHeading?: React.FC<any>;
  renderItem: ListRenderItem<any> | null | undefined;
  data: Array<any>;
}

function SectionList(props: Props) {
  const {
    JSON_KEY,
    isDate = false,
    renderHeading,
    containerStyle,
    childContainerStyle,
    renderItem,
    data,
  } = props;
  const sectionListData = modifySectionList(data, JSON_KEY, isDate);

  return (
    <SafeAreaView style={containerStyle}>
      <FlatList
        {...props}
        data={sectionListData}
        renderItem={({ item }) => (
          <SectionedListData
            colorData={item}
            renderItem={renderItem}
            renderHeading={renderHeading}
            colorListContainerStyle={childContainerStyle}
          />
        )}
        keyExtractor={
          props.keyExtractor || ((_item, index) => index.toString())
        }
      />
    </SafeAreaView>
  );
}

export default SectionList;
