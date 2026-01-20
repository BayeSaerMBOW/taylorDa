import { NextRequest, NextResponse } from 'next/server'

// Mot de passe par défaut - À CHANGER EN PRODUCTION !
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function GET(request: NextRequest) {
  try {
    // Vérifier le token de session depuis les cookies ou headers
    const authHeader = request.headers.get('authorization')
    const sessionToken = request.cookies.get('admin_session')?.value

    // Pour simplifier, on vérifie juste si une session existe
    // En production, vous devriez vérifier un vrai token JWT
    if (sessionToken || authHeader) {
      return NextResponse.json({
        authenticated: true,
      })
    }

    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    )
  }
}
