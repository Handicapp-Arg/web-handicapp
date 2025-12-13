require('dotenv').config();
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');

// Configura Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagesDir = path.join(__dirname, '../public/images');

async function convertAndUpload() {
  const files = await fg(['**/*.{jpg,jpeg,png,gif,avif,bmp,tiff,svg}'], { cwd: imagesDir, absolute: true });
  for (const file of files) {
    const ext = path.extname(file);
    const base = path.basename(file, ext);
    const webpPath = path.join(path.dirname(file), `${base}.webp`);

    // Convertir a WebP
    await sharp(file).toFile(webpPath);

    // Subir a Cloudinary
    const uploadRes = await cloudinary.uploader.upload(webpPath, {
      folder: 'handicapp/uploads',
      resource_type: 'image',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    // Eliminar imagen original y local WebP
    fs.unlinkSync(file);
    fs.unlinkSync(webpPath);

    // Reemplazar en el código todas las referencias
    const localPath = `/images/${path.relative(imagesDir, file).replace(/\\/g, '/')}`;
    const cloudUrl = uploadRes.secure_url;

    await replace({
      files: [
        'src/**/*.js',
        'src/**/*.jsx',
        'src/**/*.ts',
        'src/**/*.tsx',
        'public/**/*.html',
      ],
      from: new RegExp(localPath.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'g'),
      to: cloudUrl,
    });

    console.log(`Convertido y subido: ${file} → ${cloudUrl}`);
  }
}

convertAndUpload().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
