import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {}
  private latitude: number | any;
  private longtitude: number| any;

  public async ngOnInit() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longtitude = position.coords.longitude;
   const map = new Map({
    basemap: "topo-vector"
   });

   const view = new MapView({
    container: "container",
    map: map,
    zoom: 12,
    center: [this.longtitude, this.latitude]
   })


  const markerSymbol = new SimpleMarkerSymbol({
    color: "red",
    outline: {
      color: "black",
      width: 2
    }
  });

  const point = new Point({
    longitude: this.longtitude,
    latitude: this.latitude
  });


  const pointGraphic = new Graphic({
    geometry: point,
    symbol: markerSymbol
  });


  view.graphics.add(pointGraphic);
}

}
