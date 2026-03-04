import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-pool-blue-900 via-pool-blue-800 to-pool-teal-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-pool-teal-400 rounded-full animate-pulse" />
              <span className="text-pool-blue-100 text-sm font-medium">Now Serving Danbury & Houston Area</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Danbury's Trusted Pool Service
            </h1>
            <p className="mt-6 text-xl text-pool-blue-100 max-w-2xl mx-auto lg:mx-0">
              10 Years Keeping Houston Pools Crystal Clear. Family owned, honest pricing, and service you can count on.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-pool-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Free Estimate
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+12149957128"
                className="inline-flex items-center justify-center gap-2 bg-pool-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pool-teal-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                (214) 995-7128
              </a>
            </div>

            <p className="mt-6 text-pool-blue-200 text-sm">
              Response in 2 Hours — Guaranteed
            </p>
          </div>

          {/* Hero Image - Crystal Clear Pool */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=800&q=80"
                alt="Crystal clear swimming pool - Diamond Coast Pools"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                unoptimized
                priority
              />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pool-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-pool-teal-600">10+</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Years of</p>
                  <p className="text-gray-600">Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </div>
  )
}