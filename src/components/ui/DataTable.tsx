import React from 'react';

export interface TableColumn<T> {
    header: string;
    accessorKey: keyof T | ((data: T) => React.ReactNode);
    className?: string;
    headerClassName?: string;
    render?: (value: any, data: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    emptyMessage?: string;
    className?: string;
}

export function DataTable<T>({ 
    data, 
    columns, 
    emptyMessage = "No data available currently.",
    className = "" 
}: DataTableProps<T>) {
    if (!data || data.length === 0) {
        return (
            <div className="p-8 text-center text-text/50 font-medium bg-white/5 rounded-[2rem] border border-surface/20">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className={`overflow-x-auto rounded-[2rem] border border-surface/20 shadow-xs bg-white/10 ${className}`}>
            <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                    <tr className="bg-primary/10 border-b border-surface/20 text-background">
                        {columns.map((column, idx) => (
                            <th 
                                key={idx} 
                                className={`p-6 text-xs font-bold uppercase tracking-widest ${idx === 0 ? 'pl-8' : ''} ${idx === columns.length - 1 ? 'pr-8 text-right' : ''} ${column.headerClassName || ''}`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-surface/10">
                    {data.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-primary/5 transition-colors group cursor-pointer text-background">
                            {columns.map((column, colIdx) => {
                                let content: React.ReactNode;
                                if (column.render) {
                                    const value = typeof column.accessorKey === 'function' 
                                        ? column.accessorKey(row) 
                                        : row[column.accessorKey];
                                    content = column.render(value, row);
                                } else if (typeof column.accessorKey === 'function') {
                                    content = column.accessorKey(row);
                                } else {
                                    content = String(row[column.accessorKey]);
                                }

                                return (
                                    <td 
                                        key={colIdx} 
                                        className={`p-6 ${colIdx === 0 ? 'pl-8' : ''} ${colIdx === columns.length - 1 ? 'pr-8 text-right' : ''} ${column.className || ''}`}
                                    >
                                        {content}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
