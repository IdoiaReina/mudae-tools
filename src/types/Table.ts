/* Types declaration -------------------------------------------------------- */
export type Order = 'asc' | 'desc'

export type DataName = string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataType = any

export type Row = Record<DataName, DataType>

export interface ColumnHeader {
  id: DataName;
  sortId?: DataName;
  label: string;
  disablePadding?: boolean;
  align?: 'right' | 'left' | 'center';
  removeFromExport?: boolean;
  render?: (content: DataType, row?: Row) => React.ReactNode;
  renderForExport?: (content: DataType) => string | number;
}
