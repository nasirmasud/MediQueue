import { BadgeCheck, BookOpen, Lock } from 'lucide-react'
import Link from 'next/link'
import NewsletterForm from './NewsletterForm'

const footerColumns = [
  {
    heading: 'Platform',
    links: [
      { label: 'Browse Tutors', href: '/tutors' },
      { label: 'How It Works', href: '/#how-it-works' },
    ],
  },
  {
    heading: 'My Account',
    links: [
      { label: 'Booked Sessions', href: '/booked-sessions' },
      { label: 'Saved Mentors', href: '/my-tutors' },
      { label: 'Student Portal', href: '/profile' },
    ],
  },
  {
    heading: 'For Tutors',
    links: [{ label: 'Apply as Mentor', href: '/add-tutor' }],
  },
]

const paymentMethods = ['bKash', 'Nagad', 'Rocket', 'VISA', 'Mastercard']

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-surface-container-lowest shadow-edge-bottom pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-on-primary-container" />
              </div>
              <span className="text-headline-sm tracking-tight text-on-surface">
                MediQueue
              </span>
            </Link>

            <p className="text-body-sm text-on-surface-variant max-w-sm">
              Bangladesh&apos;s dedicated medical clinical tutoring marketplace. Connecting MBBS
              students with verified residents, registrars, and viva-tested mentors across premier
              medical colleges.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-tertiary text-label-sm">
                <BadgeCheck className="w-4 h-4" />
                BMDC Verified Mentors &amp; Secure Escrow
              </span>
            </div>
          </div>

          {/* Link Groups */}
          {footerColumns.map(({ heading, links }) => (
            <div key={heading} className="space-y-3">
              <h4 className="text-label-lg text-on-surface">{heading}</h4>
              <ul className="space-y-2 text-body-sm text-on-surface-variant">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-on-surface transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-label-lg text-on-surface">Stay Updated</h4>
            <p className="text-body-sm text-on-surface-variant">
              Weekly clinical case discussions, ward tips, and viva scheduling updates.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-label-sm text-outline uppercase">Supported Payments</span>
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 rounded bg-surface-container text-label-sm text-on-surface-variant font-bold"
              >
                {method}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-label-sm text-tertiary bg-surface-container px-3 py-1.5 rounded-full">
            <Lock className="w-4 h-4" />
            <span>SSL 256-Bit Encrypted Payments</span>
          </div>
        </div>

        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-body-sm text-outline">
          <div>
            &copy; {currentYear} MediQueue Bangladesh Ltd. Clinical Excellence. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
