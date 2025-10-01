import connectDB from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    
    // Try to get database info
    const mongoose = require('mongoose');
    const connection = mongoose.connection;
    
    return NextResponse.json({
      success: true,
      message: 'Connected to MongoDB Atlas successfully!',
      database: connection.db?.databaseName || 'evilstash',
      readyState: connection.readyState,
      host: connection.host
    });
  } catch (error: any) {
    console.error('MongoDB connection test failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to MongoDB Atlas',
        error: error.message
      },
      { status: 500 }
    );
  }
}