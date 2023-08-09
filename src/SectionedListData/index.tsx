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
  colorData,
  renderHeading,
  renderItem,
  colorListContainerStyle,
}: {
  colorData: { color: string; values: Array<any> };
  renderHeading: React.FC<any> | undefined;
  renderItem: ListRenderItem<any> | null | undefined;
  colorListContainerStyle?: ViewStyle;
}) => {
  return (
    <View style={colorListContainerStyle}>
      {!!renderHeading && renderHeading(colorData.color)}
      {!!renderItem &&
        colorData.values.map((item: any, index: number) =>
          renderItem({ item, index, separators: dummySeparators })
        )}
    </View>
  );
};
export default SectionedListData;
