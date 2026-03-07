import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import Header from '../components/Header'

import appCss from '../styles.css?url'
import Footer from '@/components/Footer'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Event Management',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,

  notFoundComponent: () => <div className='flex justify-center items-center text-5xl font-semibold h-screen'>this page is not available</div>
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <Scripts />
        <Footer />
      </body>
    </html>
  )
}
