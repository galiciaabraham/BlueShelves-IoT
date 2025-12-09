// src/app/api/session/route.ts
import { NextResponse } from 'next/server';
import { createSession, getSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { id, role } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!role || (role !== 'user' && role !== 'admin')) {
      return NextResponse.json(
        { error: 'Role must be either "user" or "admin"' },
        { status: 400 }
      );
    }

    await createSession(id, role);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

// GET /api/session - Get current session
export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        authenticated: true,
        id: session.id,
        expiresAt: session.expiresAt,
        role: session.role,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify session' },
      { status: 500 }
    );
  }
}