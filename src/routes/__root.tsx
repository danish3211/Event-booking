import { HeadContent, Scripts, createRootRoute, useRouterState } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query'



import appCss from '../styles.css?url'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'

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
  const state = useRouterState()
  const isSignupPage = state.location.pathname === '/signup'

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          {!isSignupPage && <Header />}
          {children}
          <Scripts />
          {!isSignupPage && <Footer />}
        </body>
      </html>
    </QueryClientProvider>
  )
}
