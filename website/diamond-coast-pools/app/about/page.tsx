import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, Users, Clock, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Diamond Coast Pools | Danbury, TX Pool Service',
  description: 'Meet Mike - 10 years of pool service experience. Family owned pool company serving Danbury, Houston & Galveston County with honest pricing and reliable service.',
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-pool-blue-900 via-pool-blue-800 to-pool-teal-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About Diamond Coast Pools
            </h1>
            <p className="mt-6 text-xl text-pool-blue-100 max-w-3xl mx-auto">
              Family owned, honest pricing, and service you can count on
            </p>
          </div>
        </div>
      </div>

      {/* Mike's Story Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo Placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-pool-blue-100 to-pool-teal-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-pool-blue-300">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-pool-blue-200 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-pool-blue-600" />
                  </div>
                  <p className="text-lg font-medium text-pool-blue-800">Photo Coming Soon</p>
                  <p className="text-pool-blue-600 mt-2">Mike, Owner & Founder</p>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                From a National Chain to Doing It Right
              </h2>
              <div className="mt-6 space-y-6 text-lg text-gray-600">
                <p>
                  Hi, I'm Mike, the owner of Diamond Coast Pools. After spending 10 years working 
                  for a big national pool service chain, I decided it was time to do things differently.
                </p>
                <p>
                  I saw too many customers treated like numbers, not neighbors. Promises made but not kept. 
                  High prices with impersonal service. That's not how I wanted to run a business.
                </p>
                <p>
                  So I started Diamond Coast Pools — a family-owned company built on the simple idea 
                  that <strong>we do what we say we'll do</strong>. We show up when promised. We charge 
                  fair prices. We treat your pool like it's our own.
                </p>
                <p>
                  I'm proud to serve Danbury, Houston, and all of Galveston County. When you call 
                  Diamond Coast, you're talking directly to me — not a call center.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-pool-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="mt-4 text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 mx-auto bg-pool-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-pool-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Family Owned</h3>
              <p className="mt-2 text-gray-600">
                We're not a corporation. We're your neighbors, and we treat every customer like family.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 mx-auto bg-pool-blue-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-pool-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Honest Pricing</h3>
              <p className="mt-2 text-gray-600">
                No hidden fees, no surprise charges. We give you upfront quotes and stick to them.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 mx-auto bg-pool-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-pool-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">We Show Up</h3>
              <p className="mt-2 text-gray-600">
                When we say we'll be there, we mean it. Reliable service you can count on.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 mx-auto bg-pool-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-pool-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Quality First</h3>
              <p className="mt-2 text-gray-600">
                10 years of experience means we do the job right the first time, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Trusted by Homeowners Across Houston</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pool-teal-500 rounded-full" />
              <span>10+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pool-teal-500 rounded-full" />
              <span>Danbury, TX Based</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pool-teal-500 rounded-full" />
              <span>Houston Metro & Galveston County</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}