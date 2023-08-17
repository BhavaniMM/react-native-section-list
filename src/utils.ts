import moment from 'moment';

export const modifySectionList = (
  Json_data: Array<any> | null | undefined,
  JSON_KEY: string | undefined,
  isDate?: boolean
) => {
  const dateFormat = 'MMM DD YYYY h:mm:ss A';
  let keyName: any = null;

  if (!Json_data) return null;

  const isValue = !Json_data[0]?.hasOwnProperty(JSON_KEY);
  const keysArray = Object.keys(Json_data[0]);

  const filteredList = isValue
    ? Json_data?.filter((item) =>
        keysArray.some(
          (keyVal) => item[keyVal]?.toLowerCase() === JSON_KEY?.toLowerCase()
        )
      )
    : Json_data;

  const groupedData: any[] = filteredList.reduce((result: any[], obj: any) => {
    keyName = isValue
      ? Object.keys(obj).find(
          (key) => obj[key]?.toLowerCase() === JSON_KEY?.toLowerCase()
        )
      : JSON_KEY;

    const existedData: any = result?.find(
      (item: any) => item.keyName?.toLowerCase() === obj[keyName]?.toLowerCase()
    );

    if (!existedData) {
      const dataObj: any = {
        keyName: obj[keyName],
        values: [obj],
      };
      if (isDate) dataObj.date = obj?.date;
      result.push(dataObj);
    } else {
      // existedData?.values.push(obj);

      if (
        moment(obj.date, dateFormat).isBefore(
          moment(existedData.date, dateFormat)
        )
      ) {
        existedData.date = obj?.date;
        existedData?.values.unshift(obj);
      } else {
        existedData?.values.push(obj);
      }
    }

    return result;
  }, []);

  if (isDate) {
    sortDateData(groupedData);
  } else if (keyName) {
    groupedData.sort((a, b) =>
      a?.keyName?.toLowerCase().localeCompare(b?.keyName?.toLowerCase())
    );
  }

  return groupedData;
};

const sortDateData = (data: Array<any> | null | undefined) => {
  if (!data) return;

  data?.sort((a, b) => {
    const dateA = moment(a.date, 'MMM DD YYYY h:mm:ss A');
    const dateB = moment(b.date, 'MMM DD YYYY h:mm:ss A');
    return dateA.diff(dateB);
  });
};
