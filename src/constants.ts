export interface Category {
    name: string;
    icon: string;
    slug: string;
}

export const CATEGORIES: Category[] = [
    { name: "Music", icon: "🎸", slug: "music" },
    { name: "Business", icon: "💼", slug: "business" },
    { name: "Concert", icon: "🎤", slug: "concert" },
    { name: "Parties", icon: "🎉", slug: "parties" },
    { name: "Food & Drinks", icon: "🍔", slug: "foods" },
    { name: "Comedy", icon: "🎭", slug: "comedy" },
    { name: "Crafts", icon: "🧵", slug: "craft" },
    { name: "Festivals", icon: "🎪", slug: "fastivals" },
    { name: "Fine Arts", icon: "🎨", slug: "arts" },
    { name: "Dance", icon: "💃", slug: "dance" },
    { name: "Sports", icon: "⚽", slug: "sports" },
    { name: "Technology", icon: "🕶️", slug: "technology" },
];

export const CATEGORY_CONFIG = [
    {
        slug: "business",
        title: "Business Events",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200",
        description: "Business events offer powerful spaces to network and grow in the corporate world.",
    },
    {
        slug: "music",      
        title: "Music Events",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200",
        description: "Explore the best music events in the city today and experience the diverse musical landscape.",
    },
]

export interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    venue: string;
    image: string;
    interestedCount: number;
    price: string;
    isFeatured: boolean;
    attendees: string[];
}

export const EVENTS: Event[] = [
    {
        id: 1,
        title: "CALVIN HARRIS - Live in Mumbai",
        date: "Sat, 18 Apr",
        time: "04:00 PM",
        venue: "Infinity Bay: Mumbai",
        image: "https://cdn-ip.allevents.in/s/rs:fill:500:250/g:sm/sh:100/aHR0cHM6Ly9jZG4tYXouYWxsZXZlbnRzLmluL2V2ZW50czgvYmFubmVycy80MmQ4NTA4MC1kMWFmLTExZjAtOTk2Yi1kNTlmZTQwYmI5MTgtcmltZy13MTIwMC1oNjc1LWRjMTkxNTE2LWdtaXIud2VicD92PTE3NjQ5MjExMTI.avif",
        interestedCount: 2821,
        price: "3k",
        isFeatured: true,
        attendees: [
            "https://i.pravatar.cc/150?u=1",
            "https://i.pravatar.cc/150?u=2",
            "https://i.pravatar.cc/150?u=3",
            "https://i.pravatar.cc/150?u=4",
        ],
    },
    {
        id: 2,
        title: "CALVIN HARRIS - Live in Mumbai",
        date: "Sat, 18 Apr",
        time: "04:00 PM",
        venue: "Infinity Bay: Mumbai",
        image: "https://cdn-ip.allevents.in/s/rs:fill:500:250/g:sm/sh:100/aHR0cHM6Ly9jZG4tYXouYWxsZXZlbnRzLmluL2V2ZW50czgvYmFubmVycy80MmQ4NTA4MC1kMWFmLTExZjAtOTk2Yi1kNTlmZTQwYmI5MTgtcmltZy13MTIwMC1oNjc1LWRjMTkxNTE2LWdtaXIud2VicD92PTE3NjQ5MjExMTI.avif",
        interestedCount: 2821,
        price: "3k",
        isFeatured: true,
        attendees: [
            "https://i.pravatar.cc/150?u=1",
            "https://i.pravatar.cc/150?u=2",
            "https://i.pravatar.cc/150?u=3",
            "https://i.pravatar.cc/150?u=4",
        ],
    },
    {
        id: 3,
        title: "CALVIN HARRIS - Live in Mumbai",
        date: "Sat, 18 Apr",
        time: "04:00 PM",
        venue: "Infinity Bay: Mumbai",
        image: "https://cdn-ip.allevents.in/s/rs:fill:500:250/g:sm/sh:100/aHR0cHM6Ly9jZG4tYXouYWxsZXZlbnRzLmluL2V2ZW50czgvYmFubmVycy80MmQ4NTA4MC1kMWFmLTExZjAtOTk2Yi1kNTlmZTQwYmI5MTgtcmltZy13MTIwMC1oNjc1LWRjMTkxNTE2LWdtaXIud2VicD92PTE3NjQ5MjExMTI.avif",
        interestedCount: 2821,
        price: "3k",
        isFeatured: true,
        attendees: [
            "https://i.pravatar.cc/150?u=1",
            "https://i.pravatar.cc/150?u=2",
            "https://i.pravatar.cc/150?u=3",
            "https://i.pravatar.cc/150?u=4",
        ],
    },
    {
        id: 4,
        title: "CALVIN HARRIS - Live in Mumbai",
        date: "Sat, 18 Apr",
        time: "04:00 PM",
        venue: "Infinity Bay: Mumbai",
        image: "https://cdn-ip.allevents.in/s/rs:fill:500:250/g:sm/sh:100/aHR0cHM6Ly9jZG4tYXouYWxsZXZlbnRzLmluL2V2ZW50czgvYmFubmVycy80MmQ4NTA4MC1kMWFmLTExZjAtOTk2Yi1kNTlmZTQwYmI5MTgtcmltZy13MTIwMC1oNjc1LWRjMTkxNTE2LWdtaXIud2VicD92PTE3NjQ5MjExMTI.avif",
        interestedCount: 2821,
        price: "3k",
        isFeatured: true,
        attendees: [
            "https://i.pravatar.cc/150?u=1",
            "https://i.pravatar.cc/150?u=2",
            "https://i.pravatar.cc/150?u=3",
            "https://i.pravatar.cc/150?u=4",
        ],
    }
]

export const attendees = [
    "https://i.pravatar.cc/150?u=1",
    "https://i.pravatar.cc/150?u=2",
    "https://i.pravatar.cc/150?u=3",
    "https://i.pravatar.cc/150?u=4",
]

export const date = [
    "Today",
    "This Weekend",
    "Next Week",
]

export const price = [
    "Any Price",
    "Free",
    "Paid",
]

export const tourDates = [
    { date: "02 Mar 2024", name: "Karan Aujla P-Pop Culture India Tour - Delhi", venue: "Jawaharlal Nehru Stadium, Delhi, NCR, India" },
    { date: "03 Mar 2024", name: "Karan Aujla P-Pop Culture India Tour - Mumbai - Holi Edition", venue: "Jio World Garden, BKC, Mumbai, MH, India" },
    { date: "04 Mar 2024", name: "Karan Aujla P-Pop Culture India Tour - Pune - Holi Edition", venue: "Amanora Mall, Pune, MH, India" },
    { date: "07 Mar 2024", name: "Karan Aujla P-Pop Culture India Tour - Hyderabad", venue: "Gachibowli Stadium, Hyderabad, TS, India" },
    { date: "14 Mar 2024", name: "Karan Aujla P-Pop Culture India Tour - Chandigarh", venue: "Exhibition Ground, Sector 34, Chandigarh, India" },
    { date: "21 Mar 2024", name: "Karan Aujla P-Pop Culture India Tour - Indore", venue: "SGSITS College Ground, Indore, MP, India" },
    { date: "29 Mar 2024", name: "Karan Aujla P-Pop Culture India Tour - Bengaluru", venue: "Bhartiya City, Bengaluru, KA, India" },
]

export const ticketData = [
    { type: "GOLD", price: "1,499 INR" },
    { type: "PLATINUM", price: "1,999 INR" },
    { type: "DAIMOND", price: "2,499 INR" },
    { type: "BRONZE", price: "799 INR" },
    { type: "SILVER", price: "999 INR" },
];

export interface Artist {
    id: number;
    slug: string;
    name: string;
    genre: string;
    image: string;
    followers: string;
    bannerImage: string;
    about: string;
    socials: { id: string; platform: string; link: string }[];
    nearestShow: {
        date: { day: string; month: string };
        title: string;
        location: string;
    };
    tourDates: { date: string; name: string; venue: string }[];
}

export const ARTISTS: Artist[] = [
    {
        id: 1,
        slug: "aditya-gadhvi",
        name: "Aditya Gadhvi",
        genre: "Gujarati Garba",
        image: "https://cdn-ip.allevents.in/s/rs:fill:200:200/g:sm/sh:100/aHR0cHM6Ly9jZG4tYXouYWxsZXZlbnRzLmluL2V2ZW50czgvYmFubmVycy80MmQ4NTA4MC1kMWFmLTExZjAtOTk2Yi1kNTlmZTQwYmI5MTgtcmltZy13MTIwMC1oNjc1LWRjMTkxNTE2LWdtaXIud2VicD92PTE3NjQ5MjExMTI.avif",
        followers: "120K",
        bannerImage: "https://images.unsplash.com/photo-1540039155732-d6749b93223e?auto=format&fit=crop&q=80&w=2000",
        about: "Aditya Gadhvi is an Indian playback singer and lyricist who primarily works in Gujarati cinema. He is known for his soulful renditions and energetic live performances.",
        socials: [
            { id: 'twitter', platform: 'Twitter', link: '#' },
            { id: 'facebook', platform: 'Facebook', link: '#' },
            { id: 'instagram', platform: 'Instagram', link: '#' },
        ],
        nearestShow: {
            date: { day: "15", month: "Mar" },
            title: "Aditya Gadhvi Live - Ahmedabad",
            location: "GMDC Ground, Ahmedabad",
        },
        tourDates: tourDates,
    },
    {
        id: 2,
        slug: "osman-mir",
        name: "Osman Mir",
        genre: "Gujarati Garba",
        image: "https://cdn-ip.allevents.in/s/rs:fill:200:200/g:sm/sh:100/aHR0cHM6Ly9jZG4tYXouYWxsZXZlbnRzLmluL2V2ZW50czgvYmFubmVycy80MmQ4NTA4MC1kMWFmLTExZjAtOTk2Yi1kNTlmZTQwYmI5MTgtcmltZy13MTIwMC1oNjc1LWRjMTkxNTE2LWdtaXIud2VicD92PTE3NjQ5MjExMTI.avif",
        followers: "85K",
        bannerImage: "https://images.unsplash.com/photo-1540039155732-d6749b93223e?auto=format&fit=crop&q=80&w=2000",
        about: "Osman Mir is a renowned Indian folk and playback singer. His voice is synonymous with Gujarati culture and devotional music.",
        socials: [
            { id: 'instagram', platform: 'Instagram', link: '#' },
        ],
        nearestShow: {
            date: { day: "20", month: "Mar" },
            title: "Folk Night with Osman Mir",
            location: "Rajkot, Gujarat",
        },
        tourDates: tourDates,
    },
    {
        id: 3,
        slug: "calvin-harris",
        name: "Calvin Harris",
        genre: "Dance Pop",
        image: "https://cdn-ip.allevents.in/s/rs:fill:200:200/g:sm/sh:100/aHR0cHM6Ly9jZG4tYXouYWxsZXZlbnRzLmluL2V2ZW50czgvYmFubmVycy80MmQ4NTA4MC1kMWFmLTExZjAtOTk2Yi1kNTlmZTQwYmI5MTgtcmltZy13MTIwMC1oNjc1LWRjMTkxNTE2LWdtaXIud2VicD92PTE3NjQ5MjExMTI.avif",
        followers: "45M",
        bannerImage: "https://images.unsplash.com/photo-1540039155732-d6749b93223e?auto=format&fit=crop&q=80&w=2000",
        about: "Adam Richard Wiles, known professionally as Calvin Harris, is a Scottish DJ, record producer, singer, and songwriter.",
        socials: [
            { id: 'twitter', platform: 'Twitter', link: '#' },
            { id: 'instagram', platform: 'Instagram', link: '#' },
        ],
        nearestShow: {
            date: { day: "10", month: "Apr" },
            title: "Calvin Harris Live - Ibiza",
            location: "Ushuaïa, Ibiza",
        },
        tourDates: tourDates,
    },
    {
        id: 4,
        slug: "shakira",
        name: "Shakira",
        genre: "Colombian Pop",
        image: "https://cdn-ip.allevents.in/s/rs:fill:200:200/g:sm/sh:100/aHR0cHM6Ly9jZG4tYXouYWxsZXZlbnRzLmluL2V2ZW50czgvYmFubmVycy80MmQ4NTA4MC1kMWFmLTExZjAtOTk2Yi1kNTlmZTQwYmI5MTgtcmltZy13MTIwMC1oNjc1LWRjMTkxNTE2LWdtaXIud2VicD92PTE3NjQ5MjExMTI.avif",
        followers: "90M",
        bannerImage: "https://images.unsplash.com/photo-1540039155732-d6749b93223e?auto=format&fit=crop&q=80&w=2000",
        about: "Shakira Isabel Mebarak Ripoll is a Colombian singer and songwriter. Born and raised in Barranquilla, she has been referred to as the 'Queen of Latin Music'.",
        socials: [
            { id: 'instagram', platform: 'Instagram', link: '#' },
            { id: 'twitter', platform: 'Twitter', link: '#' },
        ],
        nearestShow: {
            date: { day: "25", month: "May" },
            title: "Las Mujeres Ya No Lloran World Tour",
            location: "Miami, FL",
        },
        tourDates: tourDates,
    },
    {
        id: 5,
        slug: "karan-aujla",
        name: "Karan Aujla",
        genre: "Desi Hip Hop",
        image: "https://cdn-ip.allevents.in/s/rs:fill:200:200/g:sm/sh:100/aHR0cHM6Ly9jZG4tYXouYWxsZXZlbnRzLmluL2V2ZW50czgvYmFubmVycy80MmQ4NTA4MC1kMWFmLTExZjAtOTk2Yi1kNTlmZTQwYmI5MTgtcmltZy13MTIwMC1oNjc1LWRjMTkxNTE2LWdtaXIud2VicD92PTE3NjQ5MjExMTI.avif",
        followers: "341K",
        bannerImage: "https://images.unsplash.com/photo-1540039155732-d6749b93223e?auto=format&fit=crop&q=80&w=2000",
        about: "Jaskaran Singh Aujla, known professionally as Karan Aujla, is an Indian singer, rapper and songwriter based in Canada who works primarily in Punjabi music.",
        socials: [
            { id: 'twitter', platform: 'Twitter', link: '#' },
            { id: 'facebook', platform: 'Facebook', link: '#' },
            { id: 'instagram', platform: 'Instagram', link: '#' },
        ],
        nearestShow: {
            date: { day: "03", month: "Mar" },
            title: "Karan Aujla P-Pop Culture India Tour - Mumbai - Holi Edition",
            location: "PVR Juhu, India",
        },
        tourDates: tourDates,
    },
    {
        id: 6,
        slug: "hariharan",
        name: "Hariharan",
        genre: "Filmi",
        image: "https://cdn-ip.allevents.in/s/rs:fill:200:200/g:sm/sh:100/aHR0cHM6Ly9jZG4tYXouYWxsZXZlbnRzLmluL2V2ZW50czgvYmFubmVycy80MmQ4NTA4MC1kMWFmLTExZjAtOTk2Yi1kNTlmZTQwYmI5MTgtcmltZy13MTIwMC1oNjc1LWRjMTkxNTE2LWdtaXIud2VicD92PTE3NjQ5MjExMTI.avif",
        followers: "500K",
        bannerImage: "https://images.unsplash.com/photo-1540039155732-d6749b93223e?auto=format&fit=crop&q=80&w=2000",
        about: "Hariharan is an Indian playback, bhajan and ghazal singer who predominantly sings in Tamil and Hindi languages.",
        socials: [
            { id: 'instagram', platform: 'Instagram', link: '#' },
        ],
        nearestShow: {
            date: { day: "05", month: "Apr" },
            title: "Ghazal Night with Hariharan",
            location: "Shanmukhananda Hall, Mumbai",
        },
        tourDates: tourDates,
    },
];
