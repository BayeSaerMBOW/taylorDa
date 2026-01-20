import { NextRequest, NextResponse } from 'next/server'
import { getModels, saveModel, deleteModel } from '@/lib/data'

export async function GET() {
  const models = getModels()
  return NextResponse.json(models)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, image } = body

    if (!name || !description || !price) {
      return NextResponse.json(
        { error: 'Name, description, and price are required' },
        { status: 400 }
      )
    }

    const model = saveModel({
      name,
      description,
      price: Number(price),
      image: image || undefined,
    })

    return NextResponse.json(model, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create model' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    const success = deleteModel(id)
    if (!success) {
      return NextResponse.json(
        { error: 'Model not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete model' },
      { status: 500 }
    )
  }
}
