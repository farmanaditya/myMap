import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import Basemap from '@arcgis/core/Basemap';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mapView!: MapView;
  userLocationGraphic!: Graphic;
  selectedBasemap!: string;  // Menggunakan string untuk pilihan basemap

  // NOAA weather service URL
  private WeatherServiceUrl = 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer';

  constructor() { }

  async ngOnInit() {
    // Create map with default basemap
    const map = new Map({
      basemap: 'topo-vector' // Default basemap
    });

    // Initialize the MapView
    this.mapView = new MapView({
      container: "container",
      map: map,
      zoom: 5,
      center: [-98.35, 39.5] // Center of the US
    });

    // Add weather service layer
    const weatherServiceFL = new ImageryLayer({
      url: this.WeatherServiceUrl
    });
    map.add(weatherServiceFL);

    // Add a weather marker in Kansas (Center of US)
    this.addWeatherMarker(-95.72261597919703, 39.3392225774411);  // Latitude and Longitude for Kansas
  }

  // Method to change the basemap
  async changeBasemap() {
    if (this.mapView && this.selectedBasemap) {
      // Create a Basemap based on the selected string value
      const newBasemap = Basemap.fromId(this.selectedBasemap);
      this.mapView.map.basemap = newBasemap;  // Set the new basemap
    }
  }

  // Add a weather marker to the map
  addWeatherMarker(longitude: number, latitude: number) {
    const weatherPoint = new Point({
      longitude: longitude,
      latitude: latitude
    });
    const weatherMarker = new Graphic({
      geometry: weatherPoint,
      symbol: new SimpleMarkerSymbol({
        color: "red",
        outline: {
          color: "white",
          width: 2
        }
      })
    });
    this.mapView.graphics.add(weatherMarker);
  }
}
