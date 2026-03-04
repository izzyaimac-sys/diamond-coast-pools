import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import ProblemSolution from '@/components/ProblemSolution'
import ServicesGrid from '@/components/ServicesGrid'
import ServiceArea from '@/components/ServiceArea'
import LeadForm from '@/components/LeadForm'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <ServicesGrid />
      <ServiceArea />
      <section id="quote" className="py-16 bg-pool-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Get Your Free Estimate
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Response in 2 Hours — Guaranteed
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  )
}