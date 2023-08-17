import React from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';
import type { ListRenderItem } from '@react-native/virtualized-lists';

const dummySeparators = {
  highlight: () => {},
  unhighlight: () => {},
  updateProps: (_select: 'leading' | 'trailing', _newProps: any) => {},
};

const SectionedListData = ({
  listData,
  renderHeading,
  renderItem,
  listContainerStyle,
}: {
  listData: { keyName: string; values: Array<any> };
  renderHeading: React.FC<any> | undefined;
  renderItem: ListRenderItem<any> | null | undefined;
  listContainerStyle?: ViewStyle;
}) => {
  return (
    <View style={listContainerStyle}>
      {!!renderHeading && renderHeading(listData.keyName)}
      {!!renderItem &&
        listData.values.map((item: any, index: number) =>
          renderItem({ item, index, separators: dummySeparators })
        )}
    </View>
  );
};
export default SectionedListData;
