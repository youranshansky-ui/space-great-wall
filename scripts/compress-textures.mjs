import { read, write } from '@gltf-transform/core'
import { KHRONOS_EXTENSIONS } from '@gltf-transform/extensions'
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'

async function main() {
  console.log('Loading model...')
  const model = read(readFileSync('public/space man-opt.glb'))
  
  for (const texture of model.getRoot().listTextures()) {
    const imageData = texture.getImage()
    if (!imageData) continue
    
    console.log(`Processing texture: ${texture.getURI() || texture.getName()} (${imageData.length} bytes)`)
    
    try {
      // Convert to WebP with resize, ignoring color space issues
      const result = await sharp(imageData, { 
        failOn: 'none',
        limitInputPixels: false 
      })
        .resize(512, 512, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 70 })
        .toBuffer()
      
      texture.setImage(result)
      texture.setMimeType('image/webp')
      console.log(`  -> ${result.length} bytes (WebP)`)
    } catch (err) {
      console.error(`  Failed: ${err.message}`)
    }
  }
  
  console.log('Writing optimized model...')
  writeFileSync('public/space man-final.glb', write(model))
  console.log('Done!')
}

main().catch(console.error)
