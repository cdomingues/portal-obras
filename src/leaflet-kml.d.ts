declare module 'leaflet-kml' {
    import * as L from 'leaflet';
    export interface KMLOptions extends L.LayerOptions {
      async?: boolean;
    }
    export function KML(url: string, options?: KMLOptions): L.Layer;
  }
  