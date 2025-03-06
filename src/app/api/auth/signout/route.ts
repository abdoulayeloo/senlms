import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    // Here we could add any additional cleanup like invalidating tokens in a blacklist
    // or clearing any server-side sessions if implemented

    return NextResponse.json({ message: 'Successfully signed out' });
  } catch (error) {
    console.error('Sign out error:', error);
    return NextResponse.json(
      { message: 'An error occurred during sign out' },
      { status: 500 }
    );
  }
}