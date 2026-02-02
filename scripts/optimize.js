import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.join(__dirname, '../src/assets');

ffmpeg.setFfmpegPath(ffmpegPath);

async function optimizeImages() {
    const files = fs.readdirSync(ASSETS_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

    for (const file of files) {
        const filePath = path.join(ASSETS_DIR, file);
        const tempPath = path.join(ASSETS_DIR, `temp_${file}`);
        const originalSize = fs.statSync(filePath).size;

        console.log(`Optimizing ${file} (${(originalSize / 1024 / 1024).toFixed(2)} MB)...`);

        try {
            await sharp(filePath)
                .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' }) // High quality, keep chroma
                .toFile(tempPath);

            const newSize = fs.statSync(tempPath).size;

            if (newSize < originalSize) {
                fs.renameSync(tempPath, filePath);
                console.log(`✅ Reduced ${file} by ${((originalSize - newSize) / originalSize * 100).toFixed(1)}%`);
            } else {
                console.log(`⚠️  No reduction for ${file}, keeping original.`);
                fs.unlinkSync(tempPath);
            }
        } catch (e) {
            console.error(`❌ Error optimizing ${file}:`, e);
        }
    }
}

async function optimizeVideo() {
    const files = fs.readdirSync(ASSETS_DIR).filter(f => /\.(mp4)$/i.test(f));

    for (const file of files) {
        const filePath = path.join(ASSETS_DIR, file);
        const tempPath = path.join(ASSETS_DIR, `temp_${file}`);
        const originalSize = fs.statSync(filePath).size;

        console.log(`Optimizing Video ${file} (${(originalSize / 1024 / 1024).toFixed(2)} MB)...`);

        await new Promise((resolve, reject) => {
            ffmpeg(filePath)
                .outputOptions([
                    '-c:v libx264',
                    '-crf 23',      // Visually lossless
                    '-preset medium',
                    '-an'           // Remove audio
                ])
                .output(tempPath)
                .on('end', () => {
                    const newSize = fs.statSync(tempPath).size;
                    fs.renameSync(tempPath, filePath);
                    console.log(`✅ Reduced ${file} by ${((originalSize - newSize) / originalSize * 100).toFixed(1)}%`);
                    resolve();
                })
                .on('error', (err) => {
                    console.error(`❌ Error optimizing video:`, err);
                    reject(err);
                })
                .run();
        });
    }
}

(async () => {
    await optimizeImages();
    await optimizeVideo();
    console.log("Optimization complete!");
})();
