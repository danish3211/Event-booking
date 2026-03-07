export interface TourDate {
    date: string;
    name: string;
    venue: string;
}

interface TourDatesTableProps {
    data: TourDate[];
}

export function TourDatesTable({ data }: TourDatesTableProps) {
    if (!data || data.length === 0) {
        return (
            <div className="p-8 text-center text-text/50 font-medium">
                No tour dates available currently.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-[2rem] border border-surface/20 shadow-xs bg-background">
            <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                    <tr className="bg-primary/10 border-b border-surface/20">
                        <th className="p-6 pl-8 text-xs font-bold text-primary uppercase tracking-widest w-48">Date</th>
                        <th className="p-6 text-xs font-bold text-primary uppercase tracking-widest">Event Name</th>
                        <th className="p-6 pr-8 text-xs font-bold text-primary uppercase tracking-widest w-1/3">Venue</th>
                        <th className="p-6 pr-8 text-xs font-bold text-primary uppercase tracking-widest w-32 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-surface/10">
                    {data.map((tour, idx) => (
                        <tr key={idx} className="hover:bg-primary/5 transition-colors group cursor-pointer">
                            <td className="p-6 pl-8 text-[15px] font-bold text-text/80 whitespace-nowrap">{tour.date}</td>
                            <td className="p-6 text-[15px] font-bold group-hover:text-primary transition-colors pr-8 leading-snug">{tour.name}</td>
                            <td className="p-6 text-text/60 text-sm font-medium">{tour.venue}</td>
                            <td className="p-6 pr-8 text-right">
                                <button className="px-6 py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold rounded-xl transition-all text-sm whitespace-nowrap">
                                    Find Tickets
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
