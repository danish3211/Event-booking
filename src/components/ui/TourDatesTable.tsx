import Button from './Button';
import { DataTable } from './DataTable';
import type { TableColumn } from './DataTable';

export interface TourDate {
    date: string;
    name: string;
    venue: string;
}

interface TourDatesTableProps {
    data: TourDate[];
}

export function TourDatesTable({ data }: TourDatesTableProps) {
    const columns: TableColumn<TourDate>[] = [
        {
            header: "Date",
            accessorKey: "date",
            className: "text-[15px] font-bold whitespace-nowrap",
            headerClassName: "w-48"
        },
        {
            header: "Event Name",
            accessorKey: "name",
            className: "text-[15px] font-bold group-hover:text-primary transition-colors pr-8 leading-snug"
        },
        {
            header: "Venue",
            accessorKey: "venue",
            className: "text-sm font-medium",
            headerClassName: "w-1/3"
        },
        {
            header: "Action",
            accessorKey: "venue", // Dummy key since we use render
            headerClassName: "w-32",
            render: () => (
                <Button
                    className='whitespace-nowrap'
                    variant="primary"
                    title="Find Tickets"
                />
            )
        }
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            emptyMessage="No tour dates available currently."
        />
    );
}
