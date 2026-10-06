import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { IoShieldCheckmark } from 'react-icons/io5'

const footerLinks = {
  Platform: ['Browse Tutors', 'How It Works', 'Pricing', 'FAQs'],
  'My Account': ['My Bookings', 'My Sessions', 'Messages', 'Profile Settings'],
  'For Tutors': ['Become a Tutor', 'Tutor Login', 'Resources', 'Help Center'],
  Company: ['About Us', 'Blog', 'Contact Us', 'Terms & Conditions', 'Privacy Policy'],
}

const SocialIcons = [
  { Icon: FaFacebook, label: 'Facebook', href: '#' },
  { Icon: FaXTwitter, label: 'Twitter', href: '#' },
  { Icon: FaInstagram, label: 'Instagram', href: '#' },
  { Icon: FaLinkedin, label: 'LinkedIn', href: '#' },
  { Icon: FaYoutube, label: 'YouTube', href: '#' },
]

const paymentMethods = [{ name: 'bkash', src: '/bkash.png' }, { name: 'nagad', src: '/nagad.png' }, { name: 'rocket', src: '/rocket.svg' }, { name: 'vias', src: '/visa.svg' }, { name: 'master', src: '/master.svg' }]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800 pt-12 pb-6 text-gray-900 dark:text-zinc-100 transition-colors duration-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">

        {/* Top Section: Brand, Links, Newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">

          {/* Brand & Socials */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-primary tracking-tight">MediQueue</span>
            </div>

            <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed max-w-[240px]">
              Your trusted platform to discover expert tutors and book personalized learning sessions online.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {SocialIcons.map(({ Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-primary hover:text-white text-gray-500 dark:text-zinc-400 flex items-center justify-center transition-all"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Dynamic Link Groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-sm font-bold text-gray-900 dark:text-zinc-100 mb-4 uppercase tracking-widest">
                {group}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 dark:text-zinc-400 hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Subscription */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <p className="text-sm font-bold text-gray-900 dark:text-zinc-100 mb-2 uppercase tracking-widest">
              Stay Updated
            </p>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">
              Subscribe to get tips and offers.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                required
                placeholder="Enter email"
                className="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-zinc-100"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright, Payments, Security */}
        <div className="border-t border-gray-100 dark:border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-400 dark:text-zinc-500">
            © {currentYear} <span className="font-semibold">MediQueue</span>. All rights reserved.
          </p>

          {/* Payment Badges */}
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {paymentMethods.map((method) => (
              <li
                key={method.name}
                className="bg-transparent  px-2 py-1 rounded"
              >
                <Image src={method.src} alt={method.name} width={48} height={48} className='object-contain h-6 w-auto' />
              </li>
            ))}
          </ul>

          {/* Security Badge */}
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-zinc-400 font-medium">
            <IoShieldCheckmark className='text-emerald-500 text-xl' />
            Secure Payments
          </div>
        </div>

      </div>
    </footer>
  )
}