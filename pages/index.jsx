import React, { useState, useCallback } from "react"
import dynamic from 'next/dynamic'

import  'leaflet/dist/leaflet.css'

// Leaflet doesn't works in Server Side
const Map = dynamic(
  () => import('../src/components/Map'),
  { ssr: false }
)
const AutoComplete = dynamic(
  () => import('../src/components/Autocomplete'),
  { ssr: false }
) 
 

import { 
  Main,
  InitialView,
  OverLay,
  Welcome,
  Heading,
  HolderBtns,
  Button,
  Social
} from "../src/styles/pages/home"

const markers = [
  {
    id: 0,
    name: "Extrafarma",
    tel: "(85) 99136-5347",
    logo: "",
    address: "R. Frederico Borges, 830",
    neighborhood: "Varjota",
    coords: {
      lat: -3.7362449,
      lng: -38.4893041
    },
    officeHour: {
      open: "07:00",
      close: "23:00",
      isFullyOpened: false
    },
    products: [
      {
        id: 0,
        name: "Álcool Gel",
        category: "Higiene"
      }
    ]
  },
  {
    id: 1,
    name: "Extrafarma2",
    tel: "(85) 99136-5347",
    logo: "",
    address: "R. Frederico Borges, 830",
    neighborhood: "Varjota",
    coords: {
      lat: -3.7322555,
      lng: -38.4823333
    },
    officeHour: {
      open: "07:00",
      close: "23:00",
      isFullyOpened: false
    },
    products: [
      {
        id: 0,
        name: "Álcool Gel",
        category: "Higiene"
      }
    ]
  }
]

const DEFAULT = {
  GEO: {
    accepted: null,
    center: {
      lat: -3.71839,
      lng: -38.5434
    },
    zoom: 13
  }
}

const Index = () => {
  const [geolocationInfos, setGeo] = useState(DEFAULT.GEO)
  const [showMap, setShowMap] = useState(false)
  const [isGetLocation, setIsGetLocation] = useState(false)
  const handleShowMap = () => setShowMap(true)

  
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      try {
        setIsGetLocation(true)
        navigator.geolocation.getCurrentPosition(position => {
          const { coords } = position
          const newLocation = {
            center: {
              lat: coords.latitude || coords.lat,
              lng: coords.longitude || coords.lng
            },
            zoom: 15
          }
          setGeo(newLocation)
          handleShowMap()
          setIsGetLocation(false)
        })
      } catch (error) {
        console.log("Error while capture geolocation: ", error)
      }
    }
  }

  const handleSetSuggetion = (suggestion) => {
    const { latlng: center } = suggestion 

    const newLocation = {
      center,
      zoom: 15
    }

    setGeo(newLocation)
  }

  return (
    <Main>
      <InitialView hide={showMap}>
        <OverLay hide={showMap} />
        <Welcome hide={showMap}>
          <Heading> Radar Prateleiras </Heading>
          <Heading as="h3">
            Encontre Álcool gel, máscaras e afins na sua região.
          </Heading>
          <Heading as="h3">
            Para começar, aceite compartilhar sua localização.
          </Heading>
          <HolderBtns>
            <Button disable={isGetLocation} onClick={handleGeolocation}>
              {isGetLocation ? "Carregando..." : "Compartilhar Localização"}
            </Button>
            <span>ou</span>
            <Button onClick={handleShowMap}> Buscar manualmente </Button>
          </HolderBtns>
          <Social>
            <a href="https://bit.ly/fale-com-radar" target="_blank" rel="noopener">
              <img src='/whatsapp.svg' alt="Fale Conosco" />
            </a>
            <a href="http://bit.ly/ig-radar-prat" target="_blank" rel="noopener">
              <img src='instagram.svg' alt="Veja nossas redes sociais" />
            </a>
          </Social>
        </Welcome>
      </InitialView>
      <Map
        markers={markers}
        geo={geolocationInfos}
      />
      <AutoComplete setSugestion={handleSetSuggetion} />
    </Main>
  )
}

export default Index
