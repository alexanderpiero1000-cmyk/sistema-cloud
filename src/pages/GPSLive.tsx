import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Iconos por defecto de Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Componente para re-centrar el mapa al detectar movimiento
function MapRecenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
}

export default function GPSLive() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [userIp, setUserIp] = useState<string>('Obteniendo IP...');
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(true);

  // Obtener Dirección IP de la computadora
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => setUserIp(data.ip))
      .catch(() => setUserIp('Error al obtener IP'));
  }, []);

  // Seguimiento GPS en tiempo real
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocalización no soportada en este navegador.');
      return;
    }

    let watchId: number;

    if (isTracking) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, accuracy, speed } = pos.coords;
          setPosition([latitude, longitude]);
          setAccuracy(accuracy);
          setSpeed(speed ? speed * 3.6 : 0);
          setError(null);
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError('Permiso de GPS denegado por el usuario.');
              break;
            case err.POSITION_UNAVAILABLE:
              setError('Ubicación no disponible.');
              break;
            case err.TIMEOUT:
              setError('Tiempo de espera agotado al buscar GPS.');
              break;
            default:
              setError('Error al rastrear la ubicación.');
          }
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    }

    return () => {
      if (watchId !== undefined) navigator.geolocation.clearWatch(watchId);
    };
  }, [isTracking]);

  return (
  <div className="space-y-8 max-w-7xl mx-auto">
    <div>
      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
        Módulo Auditoría
      </span>
      <h1 className="text-3xl font-bold text-slate-900 mt-1">
        Auditoría GPS e IP en Tiempo Real
      </h1>
      <p className="text-sm text-slate-500 mt-1">
        Detección en tiempo real de la dirección IP del equipo y sensores de geolocalización para auditoría.
      </p>
    </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Métricas e IP */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="DIRECCIÓN IP" value={userIp} />
        <StatCard title="LATITUD" value={position ? position[0].toFixed(6) : 'Buscando...'} />
        <StatCard title="LONGITUD" value={position ? position[1].toFixed(6) : 'Buscando...'} />
        <StatCard title="PRECISIÓN GPS" value={accuracy !== null ? `± ${accuracy.toFixed(1)} m` : '--'} />
      </div>

      {/* Mapa en Vivo */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Mapa de Ubicación Directa</h2>
            <p className="text-xs text-slate-400">
              Se actualiza automáticamente al detectar desplazamiento del usuario.
            </p>
          </div>
          <button
            onClick={() => setIsTracking(!isTracking)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              isTracking
                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isTracking ? 'Pausar Rastreo' : 'Reanudar Rastreo'}
          </button>
        </div>

        <div className="h-[450px] w-full rounded-2xl overflow-hidden border border-slate-200 relative">
          {position ? (
            <MapContainer center={position} zoom={16} scrollWheelZoom={true} className="h-full w-full z-0">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  <div className="text-xs">
                    <strong className="block font-bold">Dispositivo Conectado</strong>
                    IP: {userIp}<br />
                    Lat: {position[0]}<br />
                    Lng: {position[1]}<br />
                    Velocidad: {speed ? `${speed.toFixed(1)} km/h` : '0 km/h'}
                  </div>
                </Popup>
              </Marker>
              <MapRecenter center={position} />
            </MapContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400 text-sm space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span>Obteniendo coordenadas GPS... Concede los permisos en el navegador.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}