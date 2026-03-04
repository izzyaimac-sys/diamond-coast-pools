import { MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const areas = [
  { name: 'Danbury, TX', description: 'Home base with same-day service' },
  { name: 'Houston Metro', description: 'Full metro area coverage' },
  { name: 'League City', description: 'Weekly service routes' },
  { name: 'Friendswood', description: 'Complete coverage' },
  { name: 'Pearland', description: 'All neighborhoods' },
  { name: 'Galveston County', description: 'County-wide service' },
]

export default function ServiceArea() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Serving Danbury, Houston & Galveston County
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Based in Danbury, Texas, we provide reliable pool service throughout the greater 
              Houston area. From residential pools in League City to beach houses in Galveston, 
              we keep Texas pools crystal clear.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Our service area includes Houston Metro, all of Galveston County, and surrounding 
              communities. We offer same-day service for urgent issues in Danbury and typically 
              next-day service throughout our coverage area.
            </p>
            <div className="mt-8">
              <Link
                href="/service-area"
                className="inline-flex items-center gap-2 bg-pool-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pool-blue-700 transition-colors"
              >
                View Full Service Area
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Areas Grid */}
          <div className="grid grid-cols-2 gap-4">
            {areas.map((area) => (
              <div
                key={area.name}
                className="bg-pool-blue-50 rounded-xl p-4 border border-pool-blue-100"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-pool-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{area.name}</h3>
                    <p className="text-sm text-gray-600">{area.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}