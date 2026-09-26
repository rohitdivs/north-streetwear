import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let buffer;
    let originalName = 'product-image.jpg';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      if (!body.dataUrl) {
        return NextResponse.json({ error: 'Missing dataUrl in request body' }, { status: 400 });
      }
      originalName = body.name || 'product.jpg';
      const matches = body.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return NextResponse.json({ error: 'Invalid base64 data' }, { status: 400 });
      }
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      // Multipart FormData
      const formData = await request.formData();
      const file = formData.get('file');

      if (!file || typeof file === 'string') {
        return NextResponse.json({ error: 'No valid file uploaded' }, { status: 400 });
      }

      originalName = file.name || 'product-image.jpg';
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
    }

    // Sanitize filename to preserve extension and make it safe
    const ext = path.extname(originalName) || '.jpg';
    const cleanBase = path.basename(originalName, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase() || 'product';

    let fileName = `${cleanBase}${ext}`;

    // Target folder 1: public/images (for Next.js web serving)
    const publicImagesDir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(publicImagesDir)) {
      fs.mkdirSync(publicImagesDir, { recursive: true });
    }

    // Target folder 2: images (project root image folder)
    const rootImagesDir = path.join(process.cwd(), 'images');
    if (!fs.existsSync(rootImagesDir)) {
      fs.mkdirSync(rootImagesDir, { recursive: true });
    }

    // If file already exists with same name, prepend timestamp to prevent overwriting
    if (fs.existsSync(path.join(publicImagesDir, fileName))) {
      fileName = `${cleanBase}-${Date.now()}${ext}`;
    }

    const publicFilePath = path.join(publicImagesDir, fileName);
    const rootFilePath = path.join(rootImagesDir, fileName);

    // Write real binary image file to both folders
    fs.writeFileSync(publicFilePath, buffer);
    fs.writeFileSync(rootFilePath, buffer);

    const publicUrl = `/images/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName,
      size: buffer.length,
      savedTo: [
        `public/images/${fileName}`,
        `images/${fileName}`
      ],
      message: 'Image successfully saved to real project images folder'
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const publicImagesDir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(publicImagesDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = fs.readdirSync(publicImagesDir)
      .filter(f => /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(f))
      .map(f => ({
        fileName: f,
        url: `/images/${f}`
      }));

    return NextResponse.json({ success: true, files });
  } catch (err) {
    return NextResponse.json({ success: false, files: [], error: err.message });
  }
}
