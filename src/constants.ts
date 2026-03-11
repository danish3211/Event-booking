import type { IEvent } from "./interfaces/Event.interface";

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


export const EVENTS: IEvent[] = [
    {
        id: "1",
        title: "Shakira Live in Concert",
        category: "Music",
        coverImage:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
        date: "2024-04-15",
        time: "8:00 PM",
        venue: "Phoenix MarketCity",
        location: "Mumbai",
        distance: 2.5,
        priceRange: { min: 1500, max: 5000 },
        attendees: 2500,
        isBookmarked: false,
        isFeatured: true,
        organizer: "Live Nation",
        ticketTiers: [
            {
                id: "1",
                name: "General Admission",
                price: 1500,
                description: "Access to main arena",
                available: 100,
                total: 100,
                perks: ["Main arena access", "Food court access"],
            },
            {
                id: "2",
                name: "VIP Pass",
                price: 5500,
                description: "Premium experience with exclusive perks",
                available: 50,
                total: 50,
                perks: [
                    "Front section access",
                    "Dedicated bar",
                    "VIP restrooms",
                    "Fast track entry",
                ],
            },
            {
                id: "3",
                name: "VVIP Pass",
                price: 12000,
                description: "Ultimate luxury package",
                available: 25,
                total: 25,
                perks: [
                    "Artist meet & greet",
                    "Backstage access",
                    "Premium bar",
                    "Dedicated host",
                    "Exclusive merchandise",
                ],
            },
        ],
    },
    {
        id: "4",
        title: "Live Jazz Evening",
        category: "Jazz",
        coverImage:
            "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&h=300&fit=crop",
        date: "2024-04-25",
        time: "8:30 PM",
        venue: "Blue Note Jazz Club",
        location: "Mumbai",
        distance: 6.8,
        priceRange: { min: 1200, max: 3000 },
        attendees: 200,
        isBookmarked: true,
        isFeatured: true,
        organizer: "Jazz Collective",
        ticketTiers: [
            {
                id: "4",
                name: "Early Bird Pass",
                price: 1200,
                description: "Limited early bird pricing",
                available: 50,
                total: 100,
                perks: ["Early bird pricing", "Main venue access"],
            },
            {
                id: "5",
                name: "General Admission Pass",
                price: 2000,
                description: "Standard admission to the venue",
                available: 80,
                total: 150,
                perks: ["Standard admission", "Bar access"],
            },
            {
                id: "6",
                name: "VIP Pass",
                price: 3000,
                description: "Premium experience package",
                available: 15,
                total: 25,
                perks: ["VIP seating", "Complimentary drinks", "Meet the artist"],
            },
        ],
    },
    {
        id: "7",
        title: "Electronic Music Festival",
        category: "Electronic",
        coverImage:
            "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&h=300&fit=crop",
        date: "2024-05-10",
        time: "7:00 PM",
        venue: "Mahalaxmi Race Course",
        location: "Mumbai",
        distance: 4.2,
        priceRange: { min: 2000, max: 8000 },
        attendees: 5000,
        isBookmarked: false,
        isFeatured: false,
        organizer: "EDM Collective",
        ticketTiers: [
            {
                id: "7",
                name: "General Entry",
                price: 2000,
                description: "Access to main arena",
                available: 500,
                total: 1000,
                perks: ["Main arena access", "Food court access"],
            },
            {
                id: "8",
                name: "VIP Experience",
                price: 5000,
                description: "Premium festival experience",
                available: 50,
                total: 100,
                perks: ["VIP area access", "Premium bar", "Fast entry"],
            },
            {
                id: "9",
                name: "VVIP Backstage",
                price: 8000,
                description: "Ultimate backstage experience",
                available: 10,
                total: 20,
                perks: [
                    "Backstage access",
                    "Artist meet & greet",
                    "Premium hospitality",
                ],
            },
        ],
    },
    {
        id: "10",
        title: "Rock Concert Night",
        category: "Rock",
        coverImage:
            "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=500&h=300&fit=crop",
        date: "2024-05-20",
        time: "8:00 PM",
        venue: "Phoenix Arena",
        location: "Mumbai",
        distance: 3.5,
        priceRange: { min: 1800, max: 6000 },
        attendees: 3000,
        isBookmarked: true,
        isFeatured: false,
        organizer: "Rock Nation",
        ticketTiers: [
            {
                id: "10",
                name: "Standing",
                price: 1800,
                description: "Standing area access",
                available: 200,
                total: 500,
                perks: ["Standing area", "Bar access"],
            },
            {
                id: "11",
                name: "Seated",
                price: 3500,
                description: "Reserved seating",
                available: 80,
                total: 150,
                perks: ["Reserved seat", "Premium view"],
            },
            {
                id: "12",
                name: "VIP Lounge",
                price: 6000,
                description: "VIP lounge experience",
                available: 20,
                total: 30,
                perks: ["VIP lounge", "Meet & greet", "Premium drinks"],
            },
        ],
    },
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

export const trendingTopics = [
    "Exhibition",
    "Class",
    "Workshop",
    "Expo",
    "Designer",
    "Sport",
    "Race",
    "Spiritual",
    "Fest",
    "Business",
    "Health",
    "Movie",
    "Comedy",
    "Painting",
    "Webinar",
];


interface EventSlide {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    time: string;
    artists: string;
    image: string;
    gradient: [string, string];
}

export const eventSlides: EventSlide[] = [
    {
        id: "1",
        title: "BYOM",
        subtitle: "Bring Your Own Man",
        date: "Sun, 08 Mar",
        time: "04:00 PM",
        artists: "Prince x Anya Yaps",
        image:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
        gradient: ["rgba(255,182,193,0.88)", "rgba(255,105,180,0.62)"],
    },
    {
        id: "2",
        title: "Live Concert",
        subtitle: "Rock the Night Away",
        date: "Fri, 10 Mar",
        time: "07:00 PM",
        artists: "Coldplay x Local Band",
        image:
            "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80",
        gradient: ["rgba(138,43,226,0.88)", "rgba(127,90,240,0.58)"],
    },
    {
        id: "3",
        title: "Summer Fest",
        subtitle: "Electronic Vibes",
        date: "Sat, 15 Mar",
        time: "06:00 PM",
        artists: "DJ Martin x Local Artists",
        image:
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80",
        gradient: ["rgba(255,99,132,0.86)", "rgba(255,159,64,0.56)"],
    },
    {
        id: "4",
        title: "Jazz Night",
        subtitle: "Smooth and Soulful",
        date: "Sun, 16 Mar",
        time: "08:00 PM",
        artists: "Blue Note Quartet",
        image:
            "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=1600&q=80",
        gradient: ["rgba(75,0,130,0.88)", "rgba(106,90,205,0.56)"],
    },
];

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQ_DATA: FAQ[] = [
    {
      id: "1",
      question: "How do I create an event?",
      answer:
        "To create an event, go to your Profile tab and tap 'Create New Event'. Fill in all the required details including event title, date, venue, and ticket information. You can also add artists by browsing our artist directory.",
      category: "Events",
    },
    {
      id: "2",
      question: "How do I book an artist?",
      answer:
        "You can book an artist by going to the Discover tab, finding the artist you want, and tapping 'Send Request'. Fill in your event details and budget. The artist will receive your request and can accept or decline.",
      category: "Bookings",
    },
    {
      id: "3",
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment partners.",
      category: "Payments",
    },
    {
      id: "4",
      question: "How do I get verified?",
      answer:
        "To get verified, complete your profile with accurate information, upload ID proof, and have at least 5 successful bookings. Our team will review your profile and award verification badges.",
      category: "Account",
    },
    {
      id: "5",
      question: "Can I cancel my event?",
      answer:
        "Yes, you can cancel events. Go to 'My Events', select the event, and choose 'Cancel Event'. Please note that cancellation policies and refund terms apply based on the timing of cancellation.",
      category: "Events",
    },
    {
      id: "6",
      question: "How do refunds work?",
      answer:
        "Refunds are processed based on our refund policy. For cancellations made 7+ days before the event, full refunds are provided. For cancellations within 7 days, partial refunds may apply.",
      category: "Payments",
    },
    {
      id: "7",
      question: "How to change my account type?",
      answer:
        "You can switch between Artist, Event Organizer, and Entertainment Seeker profiles in your Profile settings. Each profile type has different features and capabilities.",
      category: "Account",
    },
    {
      id: "8",
      question: "What if an artist doesn't show up?",
      answer:
        "If an artist doesn't show up for a confirmed booking, contact our support team immediately. We have policies in place to protect event organizers and will work to resolve the issue.",
      category: "Bookings",
    },
  ];
  
  