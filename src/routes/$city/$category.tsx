// src/routes/$city/$category.tsx
import Breadcrumb from "@/components/ui/Breadcrumb";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import EventCard from "@/components/ui/EventCard";
import { TourDatesTable } from "@/components/ui/TourDatesTable";
import { Wrapper } from "@/components/ui/Wrapper";
import { CATEGORY_CONFIG, CATEGORIES, attendees, date, price, tourDates, allEvents } from "@/constants";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/$city/$category")({
  component: CategoryPage,
});

function CategoryPage() {
  const { city, category } = Route.useParams();
  const navigate = useNavigate();
  const data = CATEGORY_CONFIG.find((item) => item.slug === category);

  if (!data) return <div className="p-10 text-center">Category not found</div>;

  const filters = [
    {
      label: "Category",
      options: CATEGORIES.map(cat => cat.name),
      onSelect: (option: string) => {
        const newSlug = CATEGORIES.find(cat => cat.name === option)?.slug;
        if (newSlug) {
          navigate({ to: "/$city/$category", params: { city, category: newSlug } });
        }
      }
    },
    {
      label: "Date",
      options: date,
    },
    {
      label: "Price",
      options: price,
    },
  ];

  return (
    <Wrapper className="p-6">
      <div className="relative min-h-[400px] w-full overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl">
        <div className="absolute inset-0">
          <img
            src={data?.image}
            alt={data?.title}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-14">

          <div className="max-w-2xl">
            <Breadcrumb city={city} categoryTitle={data?.title} />

            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight">
              {data?.title}
              <span className="block text-2xl md:text-3xl font-medium opacity-90 mt-2">
                in {city.charAt(0).toUpperCase() + city.slice(1)}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-200 opacity-90">
              {data?.description}
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            {/* <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200">
                <Bell size={18} />
                Get Updates
              </button>

              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition hover:bg-white/20">
                <Share2 size={18} />
              </button>
            </div> */}
            <div className="hidden items-center gap-2 border-l border-white/20 pl-6 md:flex">
              <div className="flex -space-x-2">
                {attendees.slice(0, 3).map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Attendee ${i + 1}`}
                    className="inline-block h-7 w-7 rounded-full object-cover hover:translate-y-[-2px] transition-transform cursor-pointer"
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-300">Join 3.7M+ lovers</span>
            </div>

          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center py-10">
        <p className="text-3xl font-medium tracking-tight text-background">
          {data.title}
          &nbsp;  in {city.charAt(0).toUpperCase() + city.slice(1)}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {filters.map((filter, index) => (
            <CustomDropdown
              key={index}
              label={filter.label}
              options={filter.options}
              onSelect={filter.onSelect}
            />
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {allEvents.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
      <div className="mt-6 py-10">
        <p className="text-3xl font-medium tracking-tight text-background">
          Upcoming {data.title}
          &nbsp;  in {city.charAt(0).toUpperCase() + city.slice(1)}
        </p>
        <div className="mt-5">
          <TourDatesTable data={tourDates} />
        </div>
      </div>
    </Wrapper>
  );
}