import type { Metadata } from 'next'
import { MapPin, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pool Service Area | Danbury, TX | Friendswood, League City, Dickinson',
  description: 'Professional pool service in Danbury, Friendswood, League City, Dickinson, Santa Fe, Fresno, Arcola, Sienna and surrounding Southeast Houston areas. Same-day service available.',
}

const serviceAreas = [
  {
    name: 'Friendswood',
    description: 'Comprehensive pool care for Friendswood residents. We service both residential and community pools throughout the city.',
    highlight: 'Full Coverage',
  },
  {
    name: 'League City',
    description: 'Serving the growing League City community with reliable pool maintenance and repair services. One of our most popular areas.',
    highlight: 'Popular Service Area',
  },
  {
    name: 'Dickinson',
    description: 'Full pool service coverage for Dickinson and surrounding neighborhoods. Quick response times for this growing area.',
    highlight: 'Fast Response Times',
  },
  {
    name: 'Santa Fe',
    description: 'Reliable pool maintenance for Santa Fe residents. We understand the needs of both established and new communities.',
    highlight: 'Established Service Routes',
  },
  {
    name: 'Fresno',
    description: 'Pool service for Fresno and nearby communities. Keeping pools clean and ready for the Texas heat.',
    highlight: 'Reliable Weekly Service',
  },
  {
    name: 'Arcola',
    description: 'Serving Arcola and surrounding rural areas. We bring professional pool care to your neighborhood.',
    highlight: 'Rural Area Specialists',
  },
  {
    name: 'Sienna',
    description: 'Expert pool service for the Sienna master-planned community. We know the unique needs of large residential developments.',
    highlight: 'Master-Planned Community Experts',
  },
  {
    name: 'Danbury & Surrounding Areas',
    description: 'Our home base. We know every neighborhood in Danbury and provide same-day service for urgent issues within 30 minutes.',
    highlight: 'Home Base - Same Day Service',
  },
]

const citiesList = [
  'Friendswood', 'League City', 'Dickinson', 'Santa Fe', 'Fresno',
  'Arcola', 'Sienna', 'Danbury', 'Alvin', 'Manvel',
  'Iowa Colony', 'Rosharon', 'Liverpool', 'Bonney', 'Sandy Point',
  'Holiday Lakes', 'Brazoria', 'Angleton', 'Brookside Village', 'Pearland'
]

export default function ServiceAreaPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-pool-blue-900 via-pool-blue-800 to-pool-teal-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our Service Area
            </h1>
            <p className="mt-6 text-xl text-pool-blue-100 max-w-3xl mx-auto">
              Based in Danbury, Texas — Serving Houston Metro & Galveston County
            </p>
          </div>
        </div>
      </div>

      {/* Coverage Intro */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">
              Local Pool Service You Can Count On
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Diamond Coast Pools provides reliable pool maintenance, repair, and cleaning services 
              throughout Southeast Houston. Based in Danbury, we specialize in serving communities 
              within 30 minutes of our home base — including Friendswood, League City, Dickinson, 
              Santa Fe, Fresno, Arcola, and Sienna. This focused approach means faster response 
              times and better service for our local customers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-pool-blue-50 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-pool-teal-600" />
                <span className="font-medium text-gray-700">Within 30 Minutes of Danbury</span>
              </div>
              <div className="flex items-center gap-2 bg-pool-blue-50 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-pool-teal-600" />
                <span className="font-medium text-gray-700">Southeast Houston Area</span>
              </div>
              <div className="flex items-center gap-2 bg-pool-blue-50 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-pool-teal-600" />
                <span className="font-medium text-gray-700">Same-Day Service Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Areas We Serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceAreas.map((area) => (
              <div
                key={area.name}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-pool-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-pool-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{area.name}</h3>
                    <span className="text-xs font-medium text-pool-teal-600 bg-pool-teal-50 px-2 py-1 rounded-full">
                      {area.highlight}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Complete List of Cities We Serve
          </h2>
          <div className="bg-pool-blue-50 rounded-xl p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {citiesList.map((city) => (
                <div
                  key={city}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <div className="w-1.5 h-1.5 bg-pool-blue-400 rounded-full" />
                  <span className="text-sm">{city}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            Don't see your city? We may still service your area.{' '}
            <a href="/contact" className="text-pool-blue-600 hover:text-pool-blue-700 font-medium">
              Contact us
            </a>{' '}
            to find out.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pool-blue-900 to-pool-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready for Pool Service in Your Area?
          </h2>
          <p className="mt-4 text-xl text-pool-blue-100 max-w-2xl mx-auto">
            We service pools across Houston Metro and Galveston County. Get your free quote today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-pool-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Quote
            </a>
            <a
              href="tel:+12149957128"
              className="inline-block bg-pool-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pool-teal-700 transition-colors"
            >
              Call (214) 995-7128
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}