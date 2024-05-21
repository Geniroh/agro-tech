import React from 'react';

export interface ColumnProps {
  header: string;
  accessor: string;
  render?: (value: any, row: Record<string, any>, index: number) => React.ReactNode;
}

export interface TableProps {
  columns: ColumnProps[];
  data: Record<string, any>[];
  className?: string;
  caption?: React.ReactNode;
  bordered?: boolean | undefined;
  emptyText?: React.ReactNode
}

export const TableP: React.FC<TableProps> = ({ columns, data, className, caption, bordered, emptyText = "No data" }) => {
  return (
    <div className={`relative overflow-x-auto sm:rounded-lg ${className}`}>
      <table className="w-full text-sm text-left text-gray-500 bg-white ">
        {
            caption && (
                <caption className="p-5 text-lg text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{caption}</p>
                </caption>
            )
        }
        <thead className="text-xs capitalize p-5 bg-[#fafafa]">
          <tr>
            {columns.map((column) => (
              <th key={column.accessor} className="py-3 px-10 text-xs" style={{ color: "#020817", textAlign: "start", fontSize: "14px", padding: "15px", fontWeight: 500}}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                <div className='w-full'>
                    <svg className='mt-10' width="100%" height="115" viewBox="0 0 250 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M207 17C210.866 17 214 20.134 214 24C214 27.866 210.866 31 207 31H167C170.866 31 174 34.134 174 38C174 41.866 170.866 45 167 45H189C192.866 45 196 48.134 196 52C196 55.866 192.866 59 189 59H178.826C173.952 59 170 62.134 170 66C170 68.5773 172 70.9107 176 73C179.866 73 183 76.134 183 80C183 83.866 179.866 87 176 87H93C89.134 87 86 83.866 86 80C86 76.134 89.134 73 93 73H54C50.134 73 47 69.866 47 66C47 62.134 50.134 59 54 59H94C97.866 59 101 55.866 101 52C101 48.134 97.866 45 94 45H69C65.134 45 62 41.866 62 38C62 34.134 65.134 31 69 31H109C105.134 31 102 27.866 102 24C102 20.134 105.134 17 109 17H207ZM207 45C210.866 45 214 48.134 214 52C214 55.866 210.866 59 207 59C203.134 59 200 55.866 200 52C200 48.134 203.134 45 207 45Z" fill="#F38E56" fillOpacity="0.1"/>
                        <path d="M120.5 85C139.002 85 154 70.0015 154 51.5C154 32.9985 139.002 18 120.5 18C101.998 18 87 32.9985 87 51.5C87 70.0015 101.998 85 120.5 85Z" fill="#F38E56" fillOpacity="0.1" stroke="#F38E56" strokeWidth="2.5"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M115.132 77.4939C116.891 77.8185 118.68 77.9872 120.5 78C135.136 78 147 66.1355 147 51.5C147 36.8645 135.136 25 120.5 25C116.74 25 113.164 25.7829 109.924 27.1946C104.294 29.6479 99.6816 33.9999 96.896 39.4419C95.0445 43.0589 94 47.1575 94 51.5C94 55.44 94.8599 59.1792 96.4021 62.5401C97.5032 64.9396 98.9521 67.1463 100.684 69.0956" fill="white"/>
                        <path d="M115.132 77.4939C116.891 77.8185 118.68 77.9872 120.5 78C135.136 78 147 66.1355 147 51.5C147 36.8645 135.136 25 120.5 25C116.74 25 113.164 25.7829 109.924 27.1946C104.294 29.6479 99.6816 33.9999 96.896 39.4419C95.0445 43.0589 94 47.1575 94 51.5C94 55.44 94.8599 59.1792 96.4021 62.5401C97.5032 64.9396 98.9521 67.1463 100.684 69.0956" stroke="#F38E56" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M103.797 72.0742C105.945 73.8202 108.372 75.2365 111.001 76.2461" stroke="#F38E56" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M148 78L154 84" stroke="#F38E56" strokeWidth="2.5"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M153.03 83.0309C151.138 84.9236 151.138 87.9923 153.03 89.885L164.116 100.97C166.008 102.863 169.077 102.863 170.97 100.97C172.863 99.0776 172.863 96.0089 170.97 94.1162L159.885 83.0309C157.992 81.1381 154.923 81.1381 153.03 83.0309Z" fill="#FEF4EF" stroke="#F38E56" strokeWidth="2.5"/>
                        <path d="M158 85L169 96" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M114 40.0005C114 51.5985 123.402 61.0005 135 61.0005C137.278 61.0005 139.472 60.6377 141.526 59.9667C138.173 68.2876 130.023 74.1612 120.5 74.1612C107.985 74.1612 97.8394 64.0157 97.8394 51.5005C97.8394 40.1601 106.17 30.7653 117.045 29.1016C115.113 32.2798 114 36.0102 114 40.0005Z" fill="#FEF4EF"/>
                        <path d="M121 33C119.727 33 118.482 33.1253 117.279 33.3642M113.645 34.4761C106.804 37.3508 102 44.1144 102 52" stroke="#EDA075" strokeOpacity="0.46" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                    <p className='mb-10'>{emptyText}</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={`${bordered && 'odd:bg-white even:bg-gray-50'} border-b hover:bg-gray-50`}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} style={{ padding: "10px"}}>
                    {column.render ? column.render(row[column.accessor], row, rowIndex) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
