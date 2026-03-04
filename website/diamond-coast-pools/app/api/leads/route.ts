import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendLeadNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'phone', 'address', 'serviceType']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        address: body.address,
        poolType: body.poolType || null,
        serviceType: body.serviceType,
        message: body.message || null,
        status: 'new',
      },
    })

    // Send email notification
    try {
      await sendLeadNotification({
        name: body.name,
        phone: body.phone,
        email: body.email,
        address: body.address,
        poolType: body.poolType,
        serviceType: body.serviceType,
        message: body.message,
      })
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json(
      { message: 'Lead submitted successfully', lead },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { message: 'Failed to submit lead. Please try again.' },
      { status: 500 }
    )
  }
}