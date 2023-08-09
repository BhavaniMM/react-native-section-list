export interface colorDataType {
  color: string;
  value: string;
  date?: string;
}

export interface sortedColorDataType {
  [x: string]: any;
  color: string;
  values: [colorDataType];
  date?: string;
}
