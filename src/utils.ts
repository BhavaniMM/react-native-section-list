import moment from 'moment';
import { type colorDataType, type sortedColorDataType } from './interface';

export const modifySectionList = (
  Json_data: Array<any> | null | undefined,
  JSON_KEY: string | undefined,
  isDate?: boolean
) => {
  const dateFormat = 'MMM DD YYYY h:mm:ss A';

  if (!Json_data) return null;

  const isValue = !Json_data[0]?.hasOwnProperty(JSON_KEY);

  const filteredList = isValue
    ? Json_data?.filter(
        (item) => item.color === JSON_KEY || item.value === JSON_KEY
      )
    : Json_data;

  const groupedColors: sortedColorDataType[] = filteredList.reduce(
    (result: sortedColorDataType[], obj: any) => {
      const colorKeyValue: any =
        (isValue
          ? (Object.keys(obj) as (keyof colorDataType)[]).find(
              (key) => obj[key] === JSON_KEY
            )
          : JSON_KEY) || JSON_KEY;

      const existingColor: any = result?.find(
        (item: sortedColorDataType) => item.color === obj[colorKeyValue]
      );

      if (!existingColor) {
        const colorObj: any = {
          color: obj[colorKeyValue],
          values: [obj],
        };
        if (isDate) colorObj.date = obj?.date;
        result.push(colorObj);
      } else {
        existingColor?.values.push(obj);

        if (
          moment(obj.date, dateFormat).isBefore(
            moment(existingColor.date, dateFormat)
          )
        )
          existingColor.date = obj?.date;
      }

      return result;
    },
    []
  );

  if (isDate) {
    sortDateData(groupedColors);

    groupedColors.forEach((groupedColor) => {
      sortDateData(groupedColor.values);
    });
  } else {
    groupedColors.sort((a, b) =>
      a.color.toLowerCase().localeCompare(b.color.toLowerCase())
    );
  }

  return groupedColors;
};

const sortDateData = (data: Array<any> | null | undefined) => {
  if (!data) return;

  data?.sort((a, b) => {
    const dateA = moment(a.date, 'MMM DD YYYY h:mm:ss A');
    const dateB = moment(b.date, 'MMM DD YYYY h:mm:ss A');
    return dateA.diff(dateB);
  });
};
