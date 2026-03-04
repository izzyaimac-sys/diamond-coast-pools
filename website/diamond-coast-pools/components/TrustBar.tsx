import { Users, Award, MapPin } from 'lucide-react'

const trustItems = [
  {
    icon: Users,
    text: 'Family Owned',
  },
  {
    icon: Award,
    text: '10 Years Experience',
  },
  {
    icon: MapPin,
    text: 'Serving Danbury, Houston & Galveston County',
  },
]

export default function TrustBar() {
  return (
    <section className="bg-white py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {trustItems.map((item, index) => (
            <div key={item.text} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pool-blue-50 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-pool-blue-600" />
              </div>
              <span className="font-semibold text-gray-700">{item.text}</span>
              {index < trustItems.length - 1 && (
                <span className="hidden lg:block text-gray-300 mx-4">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}