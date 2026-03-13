import { allEvents, eventSlides } from "@/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchBar from "../ui/SearchBar";
import { useNavigate } from "@tanstack/react-router";
import { slugify } from "@/lib/utils";


export function EventSlide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const goToSlide = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const nextIndex = (index + eventSlides.length) % eventSlides.length;
    const nextSlide = slideRefs.current[nextIndex];

    setCurrentSlide(nextIndex);

    if (nextSlide) {
      nextSlide.scrollIntoView({
        behavior,
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  useEffect(() => {

    const timer = window.setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    goToSlide(0, "auto");
  }, [goToSlide]);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = window.requestAnimationFrame(() => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return;
      }

      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      slideRefs.current.forEach((slide, index) => {
        if (!slide) {
          return;
        }

        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const distance = Math.abs(slideCenter - viewportCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setCurrentSlide(nearestIndex);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const navigate = useNavigate();

  const handleCardClick = (eventTitle: string) => {
    const slug = slugify(eventTitle);
    navigate({
      to: "/events/$eventId",
      params: { eventId: slug },
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-[#141414] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0">
        {eventSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700  ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${slide.gradient[0]} 0%, ${slide.gradient[1]} 52%, rgba(2,6,23,0.92) 100%)`,
              }}
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>
        ))}
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <section className="flex flex-1 flex-col justify-between gap-10 pb-6 pt-24 sm:pt-28 lg:pt-32">
          <div
            className="space-y-5"
          >
            <div className="">
              <div>
                <h1 className="text-5xl font-bold mb-4">
                  <span className="text-primary">Live.</span> Don't Just Exist.
                </h1>

                <p className="text-xl mb-10 text-gray-200">
                  Discover The Most Happening Events Around You
                </p>
              </div>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholders={[
                  "Search for events",
                  "Search for artists",
                  "Search for venues",
                ]}
                animationInterval={2500}
                fadeDirection="slide"
              />
            </div>

            <div
              ref={viewportRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none]"
              style={{ msOverflowStyle: "none" }}
            >
              {allEvents.map((slide, index) => {
                const isActive = index === currentSlide;

                return (
                  <button
                    key={slide.id}
                    ref={(element) => {
                      slideRefs.current[index] = element;
                    }}
                    type="button"
                    onClick={() => handleCardClick(slide.title)}
                    className={`group relative min-h-[22rem] min-w-[86%] snap-center overflow-hidden rounded-[2rem] text-left transition duration-500 sm:min-w-[36rem] lg:min-w-[42rem] ${isActive
                      ? "scale-100 opacity-100"
                      : "scale-[0.94] opacity-65 hover:scale-[0.97] hover:opacity-90"
                      }`}
                  >
                    <img src={slide.coverImage} alt={slide.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    {/* <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, rgba(15,23,42,0.06) 0%, ${slide.gradient[1]} 48%, rgba(2,6,23,0.94) 100%)`,
                      }}
                    /> */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="w-fit p-5 absolute top-0 left-0 right-0 z-10 pointer-events-none">
                      <div className="bg-orange-500 rounded-full px-4 py-2 shadow-lg">
                        <span className="text-white text-sm font-bold">
                          ⭐ Editor's pick
                        </span>
                      </div>
                    </div>
                    <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">


                      <div className="space-y-3">
                        <h3 className="text-3xl font-black sm:text-4xl">{slide.title}</h3>
                        {/* <p className="max-w-md text-base text-white/82 sm:text-lg">{slide.subtitle}</p> */}
                        <span className="text-xs uppercase tracking-[0.25em] text-white/70">
                          {slide.date} • {slide.time}
                        </span>
                        {/* <p className="text-sm uppercase tracking-[0.22em] text-white/68">{slide.artists}</p> */}
                      </div>
                    </div>
                    <button
                      className="absolute bottom-5 right-5 bg-white/20 hover:bg-white/30 transition-colors rounded-full px-6 py-3 backdrop-blur-md border border-white/10"
                    >
                      <span className="text-white font-semibold text-sm">
                        Get Tickets
                      </span>
                    </button>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {eventSlides.map((slide, index) => {
                  const isActive = index === currentSlide;

                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${isActive ? "w-10 bg-primary" : "w-2 bg-white"
                        }`}
                      aria-label={`Go to ${slide.title}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#141414] to-transparent z-10 pointer-events-none" />
    </main>
  );
}
