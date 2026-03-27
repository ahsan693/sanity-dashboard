import React, { useState } from 'react'
import { Box, Stack, Text, Card } from '@sanity/ui'
import { definePlugin } from 'sanity'
import { useClient } from 'sanity'

const parseCSV = (csv) => {
  const lines = csv.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim())
  const rows = []

  for (let i = 1; i < lines.length; i++) {
    const obj = {}
    const currentLine = lines[i].split(',')
    
    for (let j = 0; j < headers.length; j++) {
      const key = headers[j]
      const value = currentLine[j]?.trim() || ''
      
      if (value === 'true') obj[key] = true
      else if (value === 'false') obj[key] = false
      else if (!isNaN(value) && value !== '') obj[key] = Number(value)
      else obj[key] = value || null
    }
    
    if (currentLine[0]?.trim()) rows.push(obj)
  }
  
  return rows
}

const BulkImportTool = () => {
  const client = useClient()
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [importCount, setImportCount] = useState(0)

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setMessage('Processing file and creating cars...')
    setImportCount(0)

    try {
      const text = await file.text()
      const cars = parseCSV(text)
      let imported = 0
      let failed = 0

      for (const carData of cars) {
        try {
          // Create car document without images (users can add images manually in Sanity UI)
          const carDoc = {
            _type: 'car',
            make: carData.make || '',
            model: carData.model || '',
            year: carData.year ? Number(carData.year) : undefined,
            price: carData.price ? Number(carData.price) : undefined,
            mileage: carData.mileage ? Number(carData.mileage) : undefined,
            fuelType: carData.fuelType || undefined,
            transmission: carData.transmission || undefined,
            color: carData.color || undefined,
            engineSize: carData.engineSize ? Number(carData.engineSize) : undefined,
            bodyType: carData.bodyType || undefined,
            description: carData.description || undefined,
            status: carData.status || 'available',
            featured: carData.featured === 'true' || carData.featured === true,
            nctExpiry: carData.nctExpiry || undefined,
            owners: carData.owners ? Number(carData.owners) : undefined,
          }

          // Filter out undefined values
          Object.keys(carDoc).forEach(key => carDoc[key] === undefined && delete carDoc[key])

          if (client && client.create) {
            await client.create(carDoc)
            imported++
          } else {
            console.error('Sanity client not available')
            failed++
          }
        } catch (err) {
          console.error(`Error importing ${carData.make} ${carData.model}:`, err)
          failed++
        }
      }

      setImportCount(imported)
      if (imported > 0) {
        setMessage(`✅ Successfully imported ${imported} cars! Add images manually in the Sanity UI.`)
      } else {
        setMessage(`❌ Failed to import cars. Please check the Sanity console for errors.`)
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Box padding={4}>
      <Stack space={4}>
        <div>
          <Text as="h2" weight="bold" size={2}>
            Bulk Import Cars
          </Text>
          <Text as="p" muted size={1} style={{ marginTop: '8px' }}>
            Upload a CSV file to import multiple cars with all details. Add images manually in each car's edit view.
          </Text>
        </div>

        <Card padding={3} border>
          <Stack space={3}>
            <Text weight="bold" size={1}>
              CSV Column Headers Required:
            </Text>
            <code style={{ fontSize: '12px', whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: '12px', display: 'block' }}>
              make,model,year,price,mileage,fuelType,transmission,color,engineSize,bodyType,description,status,featured,nctExpiry,owners,imageUrl
            </code>
          </Stack>
        </Card>

        <div>
          <label htmlFor="csv-file">
            <input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={uploading}
              style={{ padding: '8px', cursor: 'pointer' }}
            />
          </label>
        </div>

        {message && (
          <Card padding={3} tone={message.includes('Successfully') || message.includes('✅') ? 'positive' : 'critical'}>
            <Text size={1}>{message}</Text>
          </Card>
        )}

        <Card padding={3} tone="primary">
          <Stack space={2}>
            <Text weight="bold">Expected CSV Format:</Text>
            <code style={{ fontSize: '11px', whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: '12px', display: 'block' }}>
              Honda,Civic,2020,15000,45000,Petrol,Automatic,Silver,1.5,Saloon,Full service history,available,true,2026-12-31,1,https://images.unsplash.com/photo-1590274455693-f39f27a11c5c?w=800
            </code>
            <Text size={0} muted style={{ marginTop: '8px' }}>
              📝 Note: The imageUrl column is optional and for reference only. Add images directly in the Sanity UI after import.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}

export default definePlugin({
  name: 'bulk-car-import',
  tools: [
    {
      name: 'bulk-car-import',
      title: 'Bulk Import Cars',
      component: BulkImportTool,
    },
  ],
})
