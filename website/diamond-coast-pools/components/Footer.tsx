import Link from 'next/link'
import { Droplets, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pool-blue-500 to-pool-teal-500 rounded-lg flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">Diamond Coast</span>
                <span className="text-xs text-pool-blue-400 leading-tight">Pool Service</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Family owned pool service company with 10 years experience. 
              Serving Danbury, Houston, and Galveston County.
            </p>
            <p className="text-sm text-gray-500">
              Licensed & Insured
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-pool-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-pool-blue-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-pool-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/service-area" className="text-sm hover:text-pool-blue-400 transition-colors">
                  Service Area
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-pool-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-sm hover:text-pool-blue-400 transition-colors">
                  Routine Pool Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-pool-blue-400 transition-colors">
                  Equipment Repair
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-pool-blue-400 transition-colors">
                  Green-to-Clean Recovery
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-pool-blue-400 transition-colors">
                  Salt Cell & Filter Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+12149957128" 
                  className="flex items-center gap-2 text-sm hover:text-pool-blue-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (214) 995-7128
                </a>
              </li>
              <li>
                <a 
                  href="mailto:mike@diamondcoastpools.com" 
                  className="flex items-center gap-2 text-sm hover:text-pool-blue-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  mike@diamondcoastpools.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  Danbury, TX<br />
                  Serving Houston & Galveston County
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Diamond Coast Pools. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Family Owned</span>
            <span className="text-gray-700">|</span>
            <span>10 Years Experience</span>
            <span className="text-gray-700">|</span>
            <span>Danbury, TX</span>
          </div>
        </div>
      </div>
    </footer>
  )
}