'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/data/site'

interface ImageUploadProps {
  onImageUploaded: (imageName: string, imageUrl: string) => void
  onImageReplaced?: (galleryIndex: number, newImageUrl: string) => void
}

export function ImageUpload({ onImageUploaded, onImageReplaced }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = async (files: FileList) => {
    setUploading(true)
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`)
        continue
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Please choose a file smaller than 5MB`)
        continue
      }

      try {
        // Upload to server
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Upload failed')
        }

        const result = await response.json()
        
        // Store image info in localStorage for demo (in production, save to database)
        const imageData = {
          name: result.fileName,
          url: result.url, // This is now a base64 data URL
          uploadedAt: new Date().toISOString(),
          size: result.size,
          type: result.type
        }
        
        const existingImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]')
        existingImages.push(imageData)
        localStorage.setItem('uploadedImages', JSON.stringify(existingImages))
        
        setUploadedImages(prev => [...prev, result.fileName])
        onImageUploaded(result.fileName, result.url)
        
      } catch (error) {
        console.error('Error uploading file:', error)
        alert(`Error uploading ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
    
    setUploading(false)
  }

  const removeImage = (imageName: string) => {
    const existingImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]')
    const updatedImages = existingImages.filter((img: any) => img.name !== imageName)
    localStorage.setItem('uploadedImages', JSON.stringify(updatedImages))
    
    setUploadedImages(prev => prev.filter(name => name !== imageName))
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const handleReplaceImage = async (galleryIndex: number) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`)
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Please choose a file smaller than 5MB`)
        return
      }

      try {
        setUploading(true)
        
        // Upload to server
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Upload failed')
        }

        const result = await response.json()
        
        // Store image info in localStorage
        const imageData = {
          name: result.fileName,
          url: result.url, // This is now a base64 data URL
          uploadedAt: new Date().toISOString(),
          size: result.size,
          type: result.type
        }
        
        const existingImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]')
        existingImages.push(imageData)
        localStorage.setItem('uploadedImages', JSON.stringify(existingImages))
        
        setUploadedImages(prev => [...prev, result.fileName])
        
        // Call the replacement callback
        if (onImageReplaced) {
          onImageReplaced(galleryIndex, result.url)
        }
        
      } catch (error) {
        console.error('Error uploading file:', error)
        alert(`Error uploading ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      } finally {
        setUploading(false)
      }
    }
    input.click()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload Images</h3>
        <p className="text-sm text-slate-600">
          Upload images to replace the stock photos on your website. Supported formats: JPG, PNG, WebP (max 5MB each)
        </p>
      </div>

      {/* Upload Area */}
      <Card className="p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-slate-300 hover:border-slate-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-slate-600" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-slate-900">
                {dragActive ? 'Drop images here' : 'Drag & drop images here'}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                or{' '}
                <button
                  onClick={openFileDialog}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  browse files
                </button>
              </p>
            </div>
            
            {uploading && (
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Uploading...</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Current Gallery Images */}
      <div>
        <h4 className="text-md font-semibold text-slate-900 mb-3">Current Gallery Images</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {siteConfig.gallery.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white text-slate-900 hover:bg-slate-100"
                  onClick={() => handleReplaceImage(index)}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Replace'}
                </Button>
              </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-slate-600 truncate">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div>
          <h4 className="text-md font-semibold text-slate-900 mb-3">Uploaded Images</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((imageName, index) => {
              const imageData = JSON.parse(localStorage.getItem('uploadedImages') || '[]')
                .find((img: any) => img.name === imageName)
              
              return (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
                    <img
                      src={imageData?.url || imageData?.data}
                      alt={imageName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeImage(imageName)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="mt-2">
                    <p className="text-xs text-slate-600 truncate">{imageName}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Check className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">Ready to use</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
