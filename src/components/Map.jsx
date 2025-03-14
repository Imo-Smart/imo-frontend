import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'

const mapContainerStyle = {
  height: '520px',
  width: '90%',
}

const center = {
  lat: -23.1751911,
  lng: -45.7978691,
}

const darkMapOptions = {
  styles: [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3c3a39',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#dfdcda',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#8d8b8a', // Substitua pela cor desejada para as ruas
        },
      ],
    },
    // ... adicione mais estilos conforme necessário
  ],
}

export function Map() {
  const [selectedMarker, setSelectedMarker] = useState(null)

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker)
  }

  const handleInfoWindowClose = () => {
    setSelectedMarker(null)
  }

  useEffect(() => {
    const savedMapOptions = localStorage.getItem('mapOptions')
    if (savedMapOptions) {
      const parsedOptions = JSON.parse(savedMapOptions)
      setMapOptions(parsedOptions)
    }
  }, [])

  const [mapOptions, setMapOptions] = useState({
    disableDefaultUI: true,
    styles: darkMapOptions.styles,
  })

  useEffect(() => {
    localStorage.setItem('mapOptions', JSON.stringify(mapOptions))
  }, [mapOptions])

  return (
    <LoadScript googleMapsApiKey="AIzaSyAvFlmEaxxmO5TFjdklgkZNJsE6j-3SNt8">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={16}
        options={mapOptions}
      >
        <Marker

          position={{ lat: -23.5620086, lng: -46.667409 }}
          title="Imosmart"
        />
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <h3>Imosmart</h3>
              <p>Rua Antonio Lima, 1000</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}
