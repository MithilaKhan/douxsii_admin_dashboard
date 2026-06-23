import { ConfigProvider, Table as AntTable, TableProps as AntTableProps } from 'antd';

interface TableProps<T> extends AntTableProps<T> {
  className?: string;
}

export function Table<T extends object>({ className, pagination = false, ...props }: TableProps<T>) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: 'transparent',
            headerColor: 'rgba(255, 255, 255, 0.4)',
            headerSplitColor: 'transparent',
            colorBgContainer: 'transparent',
            colorText: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.05)',
            rowHoverBg: 'rgba(255, 255, 255, 0.02)',
          },
        },
      }}
    >
      <AntTable
        pagination={pagination}
        className={`${className || ''}`}
        {...props}
      />
    </ConfigProvider>
  );
}
export default Table;
