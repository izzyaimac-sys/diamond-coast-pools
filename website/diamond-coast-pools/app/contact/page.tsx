import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Contact Us | Diamond Coast Pools | Free Quote | Danbury, TX',
  description: 'Get a free pool service quote in Danbury, Houston & Galveston County. Call, text, or fill out our form. We respond within 2 hours!',
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-pool-blue-900 via-pool-blue-800 to-pool-teal-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Get Your Free Quote
            </h1>
            <p className="mt-6 text-xl text-pool-blue-100 max-w-3xl mx-auto">
              We respond within 2 hours — guaranteed. Call, text, or fill out the form below.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info + Form Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Contact Diamond Coast Pools</h2>
              <p className="mt-4 text-lg text-gray-600">
                Ready for crystal clear water? Reach out however works best for you.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pool-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-pool-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Call or Text</h3>
                    <p className="text-gray-600 mt-1">
                      <a href="tel:+12149957128" className="text-pool-blue-600 hover:text-pool-blue-700 font-medium">
                        (214) 995-7128
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">Mon-Fri 8am-6pm, Sat by appointment</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pool-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-pool-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600 mt-1">
                      <a href="mailto:mike@diamondcoastpools.com" className="text-pool-blue-600 hover:text-pool-blue-700 font-medium">
                        mike@diamondcoastpools.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pool-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-pool-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Service Area</h3>
                    <p className="text-gray-600 mt-1">
                      Based in Danbury, TX<br />
                      Serving Houston Metro & Galveston County
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pool-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-pool-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Response Time</h3>
                    <p className="text-gray-600 mt-1">
                      <span className="font-semibold text-pool-teal-600">Within 2 hours</span> for all inquiries
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Photos CTA */}
              <div className="mt-10 p-6 bg-gradient-to-r from-pool-blue-50 to-pool-teal-50 rounded-xl border border-pool-blue-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pool-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Text Us Photos for a Faster Quote</h3>
                    <p className="text-gray-600 mt-2">
                      Send us pictures of your pool and any issues you're experiencing. 
                      We'll give you a more accurate estimate right away.
                    </p>
                    <a 
                      href="sms:+12149957128?body=Hi Mike, I'm interested in a pool service quote. Here are some photos of my pool:"
                      className="inline-block mt-4 bg-pool-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pool-teal-700 transition-colors"
                    >
                      Text Photos Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Request a Free Quote</h3>
              <LeadForm fullForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="py-16 bg-pool-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Our Service Area</h2>
            <p className="mt-2 text-gray-600">Based in Danbury, serving Houston Metro & Galveston County</p>
          </div>
          <div className="aspect-[16/9] bg-gradient-to-br from-pool-blue-100 to-pool-teal-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-pool-blue-200">
            <div className="text-center p-8">
              <MapPin className="w-16 h-16 mx-auto text-pool-blue-300 mb-4" />
              <p className="text-lg font-medium text-pool-blue-600">Interactive Map Coming Soon</p>
              <p className="text-pool-blue-500 mt-2">Danbury, TX • Houston • Galveston County</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}