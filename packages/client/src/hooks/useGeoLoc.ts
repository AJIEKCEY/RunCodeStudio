import { useState, useEffect } from 'react'

export type GeolocationCoordinates = {
  latitude: number
  longitude: number
  accuracy: number
}

export type GeolocationError = {
  code: number
  message: string
}

export type GeolocationStatus = {
  coordinates: GeolocationCoordinates | null
  error: GeolocationError | null
  isFetching: boolean
  country: string | null
}

export const useGeolocation = (): GeolocationStatus => {
  if (typeof window === 'undefined') {
    console.warn('useGeolocation: данный хук только для браузерного окружения')
    return {
      coordinates: null,
      error: {
        code: 0,
        message:
          'служба геолокации не поддерживаеьтся текущей средой исполнения',
      },
      isFetching: false,
      country: null,
    }
  }

  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(
    null
  )
  const [error, setError] = useState<GeolocationError | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [country, setCountry] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'геолокация не поддерживатся текущей средой исполнения',
      })
      setIsFetching(false)
      return
    }

    const onSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords
      setCoordinates({ latitude, longitude, accuracy })
      try {
        const response = await fetch(
          `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=682307da54818989064771png001342`
        )
        const data = await response.json()

        setCountry(data.address.country)
      } catch (error) {
        console.error('Error fetching country:', error)
      }
      setIsFetching(false)
    }

    const onError = (error: GeolocationPositionError) => {
      setError({ code: error.code, message: error.message })
      setIsFetching(false)
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  return { coordinates, error, isFetching, country }
}
