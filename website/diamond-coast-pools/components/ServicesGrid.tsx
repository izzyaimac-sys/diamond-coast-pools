import Image from 'next/image'
import { Sparkles, Wrench, Leaf, Filter, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Sparkles,
    title: 'Routine Pool Cleaning',
    image: 'https://static.wixstatic.com/media/11062b_ea4263410d6f449c836364cbd03a3698~mv2.jpg/v1/crop/x_912,y_0,w_3648,h_3648/fill/w_400,h_160,al_c,q_80,usm_0.66_1.00_0.01/Water%20Testing%20Kit.jpg',
    description: 'Weekly and bi-weekly maintenance to keep your pool sparkling clean and swim-ready all season long.',
    features: ['Skimming & vacuuming', 'Chemical balancing', 'Equipment checks'],
  },
  {
    icon: Wrench,
    title: 'Equipment Repair',
    image: 'https://static.wixstatic.com/media/a34bf5_a2baad9d9862449c99eca09e5d22a47f~mv2.jpg/v1/crop/x_33,y_0,w_194,h_194/fill/w_400,h_160,al_c,q_80,usm_0.66_1.00_0.01/equip.jpg',
    description: 'Expert diagnosis and repair of pumps, filters, heaters, and all major pool equipment brands.',
    features: ['Pump repair', 'Filter service', 'Heater repair'],
  },
  {
    icon: Leaf,
    title: 'Green-to-Clean Recovery',
    image: 'https://static.wixstatic.com/media/a34bf5_3950d46053544222855492386555c8e9~mv2.jpg/v1/crop/x_57,y_0,w_175,h_175/fill/w_400,h_160,al_c,q_80,usm_0.66_1.00_0.01/green%20to%20clean.jpg',
    description: 'Transform your algae-filled pool back to crystal clear with our intensive recovery service.',
    features: ['Algae removal', 'Shock treatment', 'Filtration restore'],
  },
  {
    icon: Filter,
    title: 'Salt Cell & Filter Service',
    image: 'https://static.wixstatic.com/media/a34bf5_0420c251aac94ba3a1b43357a5026a50~mv2.jpg/v1/crop/x_25,y_0,w_201,h_201/fill/w_400,h_160,al_c,q_80,usm_0.66_1.00_0.01/cell.jpg',
    description: 'Keep your salt system and filters running at peak efficiency for crystal clear water.',
    features: ['Salt cell cleaning', 'Filter maintenance', 'System optimization'],
  },
]

export default function ServicesGrid() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Pool Services
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything your pool needs to stay clean, clear, and ready to enjoy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div className="h-40 overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.title} - Diamond Coast Pools service`}
                  width={400}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-pool-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pool-blue-600 transition-colors">
                  <service.icon className="w-6 h-6 text-pool-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-pool-teal-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-pool-blue-600 font-semibold hover:text-pool-blue-700 transition-colors"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}