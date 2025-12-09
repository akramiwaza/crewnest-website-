import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = {
    header: {
      nav: [
        { label: 'About', href: '#about' },
        { label: 'Insights', href: '#insights' },
        { label: 'Contact Us', href: '#contact' }
      ],
      cta: 'Sign Up'
    },
    hero: {
      title: 'Connect & Find Roommates – Built For The Airline Community',
      subtitle: '',
      description: 'Discover crash pads, rooms, and listers where you can share your space with airline professionals.',
      appButtons: { appStore: '#', googlePlay: '#' }
    },
    about: {
      title: 'About our app',
      heading: 'Simplifying Crew Accommodation – One Booking At A Time',
      description: 'Our app helps airline employees discover and book verified listings tailored to their schedules and budgets.',
      cta: 'Know More'
    },
    features: [
      { title: 'Verified Listings', description: 'All listings are reviewed and validated before going live.' },
      { title: 'Filters That Matter', description: 'Browse thousands of properties using airline-specific filters.', highlight: true },
      { title: 'Secure Bookings', description: 'Protected messaging and secure payment flows for peace of mind.' }
    ],
    stats: [
      { value: '10,000+', label: 'Listings' },
      { value: '20,000+', label: 'Verified Users' },
      { value: '4.9', label: 'Average Ratings' },
      { value: '500+', label: 'Listers' }
    ],
    testimonials: [
      { name: 'Alex', role: 'Seeker', rating: 5, content: 'The crash pad I booked was exactly as described and near my base.' },
      { name: 'Jamie', role: 'Lister', rating: 5, content: 'Great community and quick responses from verified crew.' },
      { name: 'Taylor', role: 'Seeker', rating: 4, content: 'Filters helped me find a furnished place within minutes.' },
      { name: 'Riley', role: 'Lister', rating: 5, content: 'Listing setup was simple and bookings are secure.' }
    ],
    blog: [
      { id: '1', title: 'Housing Tips For New Crew', tag: 'Tips', excerpt: 'Essentials to consider when picking your first crash pad.' },
      { id: '2', title: 'Budgeting For Layovers', tag: 'Finance', excerpt: 'Strategies to optimize housing near major hubs.' },
      { id: '3', title: 'Furnished vs Unfurnished', tag: 'Guide', excerpt: 'Pros and cons based on schedule variability.' },
      { id: '4', title: 'Designing Shared Spaces', tag: 'Home', excerpt: 'Ideas to make shared living feel personal.' }
    ],
    contact: {
      title: 'Contact Us',
      subtitle: 'Get the latest on housing trends, booking tips, and community updates shared by airline professionals.'
    },
    download: {
      title: 'Download Crew•Nest App',
      description: 'Experience an easy booking flow and secure messaging across platforms.'
    },
    footer: {
      about: 'Built for the airline community',
      links: [
        [
          { label: 'About', href: '#' },
          { label: 'Insights', href: '#' },
          { label: 'Contact', href: '#' }
        ],
        [
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Support', href: '#' }
        ]
      ],
      email: 'support@crewnest.app',
      phone: '+1 (555) 555-5555',
      store: { appStore: '#', googlePlay: '#' }
    }
  }

  return NextResponse.json(data)
}

