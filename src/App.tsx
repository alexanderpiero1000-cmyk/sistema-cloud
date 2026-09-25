import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Planning from './pages/Planning';
import Costs from './pages/Costs';
import Infraestructura from './pages/Infrastructura';
import Security from './pages/Security';
import Network from './pages/Network';
import Services from './pages/Services';
import GPSLive from './pages/GPSLive';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planificacion" element={<Planning />} />
          <Route path="/costos" element={<Costs />} />
          <Route path="/infraestructura" element={<Infraestructura />} />
          <Route path="/seguridad" element={<Security />} />
          <Route path="/red" element={<Network />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/gps" element={<GPSLive />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}