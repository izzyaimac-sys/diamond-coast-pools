import type { Metadata } from 'next'
import Image from 'next/image'
import { Sparkles, Wrench, Leaf, Filter } from 'lucide-react'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Our Services | Diamond Coast Pools | Danbury, TX',
  description: 'Professional pool services in Danbury, Houston & Galveston County. Pool cleaning, equipment repair, green-to-clean recovery, and salt cell service.',
}

const services = [
  {
    icon: Sparkles,
    title: 'Routine Pool Cleaning',
    image: 'https://static.wixstatic.com/media/11062b_ea4263410d6f449c836364cbd03a3698~mv2.jpg/v1/crop/x_912,y_0,w_3648,h_3648/fill/w_800,h_600,al_c,q_80,usm_0.66_1.00_0.01/Water%20Testing%20Kit.jpg',
    shortDesc: 'Weekly and bi-weekly maintenance to keep your pool sparkling clean',
    description: 'Our routine cleaning service takes the hassle out of pool ownership. We visit your property on a regular schedule to ensure your pool is always ready for a swim.',
    includes: [
      'Skimming surface debris',
      'Vacuuming pool floor',
      'Brushing walls and tile line',
      'Emptying skimmer and pump baskets',
      'Chemical testing and balancing',
      'Equipment inspection',
      'Water clarity check',
    ],
    why: 'Regular maintenance prevents costly repairs and keeps your pool safe for your family.',
  },
  {
    icon: Wrench,
    title: 'Equipment Repair',
    image: 'https://static.wixstatic.com/media/a34bf5_a2baad9d9862449c99eca09e5d22a47f~mv2.jpg/v1/crop/x_33,y_0,w_194,h_194/fill/w_800,h_600,al_c,q_80,usm_0.66_1.00_0.01/equip.jpg',
    shortDesc: 'Expert diagnosis and repair of pumps, filters, heaters, and more',
    description: 'When your pool equipment fails, you need it fixed fast. With 10 years of experience, we diagnose and repair all major brands of pool equipment.',
    includes: [
      'Pump repair and replacement',
      'Filter cleaning and repair',
      'Heater service and installation',
      'Automation system troubleshooting',
      'Leak detection and repair',
      'Motor replacement',
      'Plumbing repairs',
    ],
    why: 'Broken equipment can damage your pool and cost thousands if not addressed quickly.',
  },
  {
    icon: Leaf,
    title: 'Green-to-Clean Recovery',
    image: 'https://static.wixstatic.com/media/a34bf5_3950d46053544222855492386555c8e9~mv2.jpg/v1/crop/x_57,y_0,w_175,h_175/fill/w_800,h_600,al_c,q_80,usm_0.66_1.00_0.01/green%20to%20clean.jpg',
    shortDesc: 'Transform your algae-filled pool back to crystal clear',
    description: 'Is your pool green and unusable? Our green-to-clean service will restore your pool to pristine condition, no matter how bad it looks.',
    includes: [
      'Initial assessment and water testing',
      'Shock treatment application',
      'Algae brushing and removal',
      'Filtration system deep clean',
      'Multiple visits until clear',
      'Chemical rebalancing',
      'Preventive maintenance plan',
    ],
    why: 'A green pool is more than unsightly — it can be a health hazard. We get you swimming again fast.',
  },
  {
    icon: Filter,
    title: 'Salt Cell & Filter Service',
    image: 'https://static.wixstatic.com/media/a34bf5_0420c251aac94ba3a1b43357a5026a50~mv2.jpg/v1/crop/x_25,y_0,w_201,h_201/fill/w_800,h_600,al_c,q_80,usm_0.66_1.00_0.01/cell.jpg',
    shortDesc: 'Keep your salt system and filters running at peak efficiency',
    description: 'Salt pools require specialized care. We service salt chlorine generators and all types of filtration systems to keep your water crystal clear.',
    includes: [
      'Salt cell cleaning and inspection',
      'Salt level testing and adjustment',
      'Cartridge filter cleaning/replacement',
      'DE filter maintenance',
      'Sand filter backwashing',
      'System optimization',
      'Winterizing services',
    ],
    why: 'Proper salt and filter maintenance extends equipment life and ensures comfortable swimming.',
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-pool-blue-900 via-pool-blue-800 to-pool-teal-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our Pool Services
            </h1>
            <p className="mt-6 text-xl text-pool-blue-100 max-w-3xl mx-auto">
              Professional pool care for Danbury, Houston, and Galveston County
            </p>
          </div>
        </div>
      </div>

      {/* Services Detail Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 bg-pool-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-pool-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                  <p className="mt-4 text-xl text-gray-600">{service.shortDesc}</p>
                  <p className="mt-6 text-gray-600">{service.description}</p>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900">What's Included:</h3>
                    <ul className="mt-4 space-y-3">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-pool-teal-500 rounded-full mt-2" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 p-4 bg-pool-blue-50 rounded-lg border-l-4 border-pool-blue-500">
                    <p className="text-pool-blue-800 font-medium">Why it matters: {service.why}</p>
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={service.image}
                      alt={`${service.title} - Diamond Coast Pools service`}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="quote" className="py-16 bg-pool-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
            <p className="mt-4 text-xl text-gray-600">
              Request a free quote for any of our services
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
    </div>
  )
}