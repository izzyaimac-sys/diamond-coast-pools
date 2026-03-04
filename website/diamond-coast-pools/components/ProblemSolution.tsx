import { CheckCircle, XCircle } from 'lucide-react'

const problems = [
  'Pool companies that don\'t show up when scheduled',
  'Hidden fees and surprise charges',
  'Call centers instead of real people',
  'Technicians who rush through the job',
  'No response when you need help',
]

const solutions = [
  'We show up when we say we will — guaranteed',
  'Upfront pricing, no surprises ever',
  'Talk directly to Mike, the owner',
  'Thorough service every single visit',
  'Response within 2 hours — always',
]

export default function ProblemSolution() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Tired of Pool Companies That Don't Show Up?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            We do what we say. It's that simple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Problems */}
          <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
            <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-2">
              <XCircle className="w-6 h-6" />
              The Other Guys
            </h3>
            <ul className="space-y-4">
              {problems.map((problem) => (
                <li key={problem} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="bg-pool-teal-50 rounded-2xl p-8 border border-pool-teal-100">
            <h3 className="text-xl font-bold text-pool-teal-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Diamond Coast Pools
            </h3>
            <ul className="space-y-4">
              {solutions.map((solution) => (
                <li key={solution} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-pool-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-block bg-pool-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pool-blue-700 transition-colors shadow-lg"
          >
            Experience the Difference
          </a>
        </div>
      </div>
    </section>
  )
}