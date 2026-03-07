
// Sample data to mimic the screenshot
const galleryItems = [
  { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1540039155732-6761b54f22ce?q=80&w=400', user: 'Bhupen Patil', time: '2 days ago', avatar: 'https://i.pravatar.cc/150?u=11' },
  { id: 2, type: 'review', rating: 5, text: '"Nice run organised by cambridge public school...."', user: 'Khuman Singh', time: '2 days ago', avatar: 'https://i.pravatar.cc/150?u=22' },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?q=80&w=400', user: 'Munmun Poddar', time: '3 days ago', avatar: 'https://i.pravatar.cc/150?u=33' },
  { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400', user: 'Prapa Acharya', time: '3 days ago', avatar: 'https://i.pravatar.cc/150?u=44' },
  { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400', user: 'Poon Tavati', time: '3 days ago', avatar: 'https://i.pravatar.cc/150?u=55' },
  { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400', user: 'Harsh Barot', time: '3 days ago', avatar: 'https://i.pravatar.cc/150?u=66' },
  { id: 7, type: 'review', rating: 5, text: '"It was great. Enjoyed it very much..."', user: 'Charlene Shupert', time: '2 days ago', avatar: 'https://i.pravatar.cc/150?u=77' },
  { id: 8, type: 'image', src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400', user: 'Dave S', time: '3 days ago', avatar: 'https://i.pravatar.cc/150?u=88' },
  { id: 9, type: 'image', src: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=400', user: 'Gurpreet Singh', time: '3 days ago', avatar: 'https://i.pravatar.cc/150?u=99' },
  { id: 10, type: 'image', src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=400', user: 'Himanshu Patel', time: '3 days ago', avatar: 'https://i.pravatar.cc/150?u=10' },
  { id: 11, type: 'review', rating: 5, text: '"I had a ball. I was in VIP section with my 2 boys it was ent..."', user: 'Deborah Carr', time: '2 days ago', avatar: 'https://i.pravatar.cc/150?u=111' },
  { id: 12, type: 'image', src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400', user: 'Satyaprakash Sharma', time: '3 days ago', avatar: 'https://i.pravatar.cc/150?u=12' },
  { id: 13, type: 'image', src: 'https://images.unsplash.com/photo-1533174000255-598d38f1c347?q=80&w=400', user: 'Nenad Mvc', time: '4 days ago', avatar: 'https://i.pravatar.cc/150?u=13' },
  { id: 14, type: 'image', src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=400', user: 'Randall Talaski', time: '4 days ago', avatar: 'https://i.pravatar.cc/150?u=14' }
];

// Helper to render stars
const renderStars = (rating: number) => {
  return (
    <div className="flex justify-center gap-1 text-yellow-500 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
    </div>
  );
};

// Item Component
const GalleryItem = ({ item }: { item: typeof galleryItems[0] }) => {
  if (item.type === 'review') {
    return (
      <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col justify-center h-64 w-64 flex-shrink-0 relative overflow-hidden group/item">
        {renderStars(item.rating!)}
        <p className="text-sm text-center text-gray-600 italic mb-6">
          {item.text}
        </p>
        <div className="flex items-center gap-3 absolute bottom-6 left-6 right-6">
          <img src={item.avatar} alt={item.user} className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-900">{item.user}</span>
            <span className="text-[10px] text-gray-500">{item.time}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-[2rem] overflow-hidden h-64 w-64 flex-shrink-0 group/item bg-gray-100 dark:bg-gray-800">
      <img src={item.src} alt={item.user} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
        <img src={item.avatar} alt={item.user} className="w-8 h-8 rounded-full border-2 border-white/20" />
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white shadow-sm">{item.user}</span>
          <span className="text-[10px] text-white/80">{item.time}</span>
        </div>
      </div>
    </div>
  );
};

export default function Gallery() {
  // Split items into 4 columns for staggered scrolling effect
  const col1 = [...galleryItems.slice(0, 4), ...galleryItems.slice(0, 4)];
  const col2 = [...galleryItems.slice(4, 7), ...galleryItems.slice(4, 7)];
  const col3 = [...galleryItems.slice(7, 11), ...galleryItems.slice(7, 11)];
  const col4 = [...galleryItems.slice(11, 14), galleryItems[0], ...galleryItems.slice(11, 14), galleryItems[0]];
  const col5 = [...galleryItems.slice(11, 14), galleryItems[0], ...galleryItems.slice(11, 14), galleryItems[0]];
  const col6 = [...galleryItems.slice(11, 14), galleryItems[0], ...galleryItems.slice(11, 14), galleryItems[0]];

  return (
    <section className="py- overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-medium text-text mb-4">
          Loved by millions. Lived on AllEvents
        </h2>
        <p className="text-primary/50 text-lg">
          Join the people turning moments into memories.
        </p>
      </div>

      {/* The Gallery Container - Horizontal Layout with Vertical Columns inside */}
      <div className="w-full overflow-hidden relative group h-[600px]">
        {/* Fade gradients at top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-secondary to-transparent z-10 pointer-events-none" />

        <div className="flex justify-center gap-6 h-full px-4">
          
          {/* Column 1 - Scrolling UP */}
          <div className="flex flex-col gap-6 w-64 animate-scroll-up pt-12">
            {col1.map((item, idx) => (
              <GalleryItem key={`c1-${idx}`} item={item} />
            ))}
          </div>

          {/* Column 2 - Scrolling DOWN */}
          <div className="flex flex-col gap-6 w-64 animate-scroll-down">
            {col2.map((item, idx) => (
              <GalleryItem key={`c2-${idx}`} item={item} />
            ))}
          </div>

          {/* Column 3 - Scrolling UP */}
          <div className="flex flex-col gap-6 w-64 animate-scroll-up pt-24">
            {col3.map((item, idx) => (
              <GalleryItem key={`c3-${idx}`} item={item} />
            ))}
          </div>

          {/* Column 4 - Scrolling DOWN */}
          <div className="flex flex-col gap-6 w-64 animate-scroll-down pt-8">
            {col4.map((item, idx) => (
              <GalleryItem key={`c4-${idx}`} item={item} />
            ))}
          </div>

          {/* Column 5 - Scrolling DOWN */}
          <div className="flex flex-col gap-6 w-64 animate-scroll-up pt-8">
            {col5.map((item, idx) => (
              <GalleryItem key={`c5-${idx}`} item={item} />
            ))}
          </div>

          {/* Column 6 - Scrolling DOWN */}
          <div className="flex flex-col gap-6 w-64 animate-scroll-down pt-8">
            {col6.map((item, idx) => (
              <GalleryItem key={`c6-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
