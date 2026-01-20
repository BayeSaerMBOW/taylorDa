import { NextRequest, NextResponse } from 'next/server'
import { getOrders, saveOrder, updateOrderStatus } from '@/lib/data'

export async function GET() {
  const orders = getOrders()
  return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { modelId, clientName, clientEmail, clientPhone, clientAddress, size, message } = body

    if (!modelId || !clientName || !clientEmail || !clientPhone || !clientAddress || !size) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    const order = saveOrder({
      modelId,
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
      size,
      message: message || undefined,
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      )
    }

    const success = updateOrderStatus(id, status)
    if (!success) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
