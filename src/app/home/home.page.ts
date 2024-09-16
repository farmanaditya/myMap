import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }
  private latitude: number | any;
  private longitude: number | any;
  public async ngOnInit() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    const map = new Map({
      basemap: 'topo-vector'
    });
    const view = new MapView({
      container: 'container', // Reference to the DOM node that will contain the view
      map: map, // Reference to the map object created before the view
      center: [this.latitude, this.longitude], // Coordinates of the center of the view
      zoom: 4 // Sets zoom level
    });
  }

}
