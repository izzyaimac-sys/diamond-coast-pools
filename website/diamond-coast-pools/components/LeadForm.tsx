'use client'

import { useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'

interface LeadFormProps {
  fullForm?: boolean
}

export default function LeadForm({ fullForm = false }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    poolType: '',
    serviceType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Something went wrong')
      }

      setIsSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        poolType: '',
        serviceType: '',
        message: '',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-pool-teal-50 border border-pool-teal-200 rounded-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-pool-teal-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">
          Your request has been received. We'll be in touch within 2 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-pool-blue-600 font-medium hover:text-pool-blue-700"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pool-blue-500 focus:border-pool-blue-500 outline-none transition-all"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pool-blue-500 focus:border-pool-blue-500 outline-none transition-all"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      {(fullForm || true) && (
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-gray-400 text-sm">(optional)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pool-blue-500 focus:border-pool-blue-500 outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>
      )}

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Pool Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pool-blue-500 focus:border-pool-blue-500 outline-none transition-all"
          placeholder="123 Main St, Danbury, TX"
        />
      </div>

      {fullForm && (
        <div>
          <label htmlFor="poolType" className="block text-sm font-medium text-gray-700 mb-2">
            Pool Type <span className="text-gray-400 text-sm">(optional)</span>
          </label>
          <select
            id="poolType"
            name="poolType"
            value={formData.poolType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pool-blue-500 focus:border-pool-blue-500 outline-none transition-all bg-white"
          >
            <option value="">Select pool type</option>
            <option value="in-ground">In-Ground Pool</option>
            <option value="above-ground">Above-Ground Pool</option>
            <option value="commercial">Commercial Pool</option>
            <option value="other">Other / Not Sure</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
          Service Needed <span className="text-red-500">*</span>
        </label>
        <select
          id="serviceType"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pool-blue-500 focus:border-pool-blue-500 outline-none transition-all bg-white"
        >
          <option value="">Select a service</option>
          <option value="Routine Cleaning">Routine Pool Cleaning</option>
          <option value="Equipment Repair">Equipment Repair</option>
          <option value="Green-to-Clean">Green-to-Clean Recovery</option>
          <option value="Salt Cell Service">Salt Cell & Filter Service</option>
          <option value="One-Time Service">One-Time Service</option>
          <option value="Multiple Services">Multiple Services</option>
          <option value="Other">Other / Not Sure</option>
        </select>
      </div>

      {fullForm && (
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message <span className="text-gray-400 text-sm">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pool-blue-500 focus:border-pool-blue-500 outline-none transition-all resize-none"
            placeholder="Tell us about your pool or any specific issues..."
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-pool-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-pool-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Get My Free Quote'
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        We respect your privacy. Your information will never be shared.
      </p>
    </form>
  )
}