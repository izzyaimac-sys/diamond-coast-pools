'use client'

import { useState, useEffect } from 'react'
import { Lock, Loader2, Phone, Mail, MapPin, Calendar, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'

interface Lead {
  id: string
  name: string
  phone: string
  email: string | null
  address: string
  poolType: string | null
  serviceType: string
  message: string | null
  status: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  new: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  contacted: 'bg-blue-100 text-blue-800 border-blue-200',
  scheduled: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-gray-100 text-gray-800 border-gray-200',
}

const statusIcons: Record<string, React.ReactNode> = {
  new: <AlertCircle className="w-4 h-4" />,
  contacted: <Clock className="w-4 h-4" />,
  scheduled: <CheckCircle className="w-4 h-4" />,
  completed: <CheckCircle className="w-4 h-4" />,
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const authenticate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/leads/admin?password=${encodeURIComponent(password)}`)
      
      if (!response.ok) {
        throw new Error('Invalid password')
      }

      const data = await response.json()
      setLeads(data.leads)
      setIsAuthenticated(true)
    } catch (err) {
      setError('Invalid password')
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    
    try {
      const response = await fetch(`/api/leads/admin?password=${encodeURIComponent(password)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update')
      }

      setLeads(leads.map(lead => 
        lead.id === id ? { ...lead, status: newStatus } : lead
      ))
    } catch (err) {
      alert('Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  const refreshLeads = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/leads/admin?password=${encodeURIComponent(password)}`)
      const data = await response.json()
      setLeads(data.leads)
    } catch (err) {
      setError('Failed to refresh')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-pool-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-pool-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Enter password to view leads</p>
          </div>

          <form onSubmit={authenticate} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pool-blue-500 focus:border-pool-blue-500 outline-none"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pool-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-pool-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lead Dashboard</h1>
              <p className="text-gray-600">{leads.length} total leads</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={refreshLeads}
                disabled={isLoading}
                className="px-4 py-2 text-pool-blue-600 font-medium hover:bg-pool-blue-50 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
              <button
                onClick={() => {
                  setIsAuthenticated(false)
                  setPassword('')
                  setLeads([])
                }}
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Leads List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {leads.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">No leads yet</h2>
            <p className="text-gray-600 mt-2">Leads will appear here when customers submit the form.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Lead Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {lead.phone}
                          </span>
                          {lead.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {lead.email}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${statusColors[lead.status]}`}>
                        {statusIcons[lead.status]}
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p className="flex items-start gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {lead.address}
                      </p>
                      <p className="flex items-start gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        Submitted {formatDate(lead.createdAt)}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700">Service Needed:</p>
                      <p className="text-gray-600">{lead.serviceType}</p>
                      {lead.poolType && (
                        <p className="text-sm text-gray-500 mt-1">Pool Type: {lead.poolType}</p>
                      )}
                    </div>

                    {lead.message && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700">Message:</p>
                        <p className="text-gray-600 text-sm mt-1">{lead.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Status Update */}
                  <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                    <p className="text-sm font-medium text-gray-700 w-full lg:text-right">Update Status:</p>
                    {['new', 'contacted', 'scheduled', 'completed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(lead.id, status)}
                        disabled={updatingId === lead.id || lead.status === status}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                          lead.status === status
                            ? 'bg-pool-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {updatingId === lead.id ? '...' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}