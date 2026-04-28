import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './shared/components/Layout';
import DashboardPage from './pages/DashboardPage';
import GanadoInventarioPage from './modules/ganado/pages/GanadoInventarioPage';
import GanadoSaludPage from './modules/ganado/pages/GanadoSaludPage';
import GanadoSaludListPage from './modules/ganado/pages/GanadoSaludListPage';
import GanadoPesajesPage from './modules/ganado/pages/GanadoPesajesPage';
import { ComingSoonPage } from './shared/components/ComingSoonPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Módulo 1: Ganadería */}
          <Route path="ganado/inventario" element={<GanadoInventarioPage />} />
          <Route path="ganado/salud" element={<GanadoSaludListPage />} />
          <Route path="ganado/salud/:id" element={<GanadoSaludPage />} />
          <Route path="ganado/pesajes" element={<GanadoPesajesPage />} />

          {/* Otros módulos — próximos */}
          <Route
            path="cultivos"
            element={
              <ComingSoonPage
                title="Módulo de Cultivos"
                description="Gestión de siembras, cosechas, insumos agrícolas y seguimiento de ciclos productivos."
                icon="eco"
              />
            }
          />
          <Route
            path="finanzas"
            element={
              <ComingSoonPage
                title="Módulo de Finanzas"
                description="Análisis financiero, flujo de caja, costos de producción e indicadores económicos."
                icon="payments"
              />
            }
          />
          <Route
            path="inventario"
            element={
              <ComingSoonPage
                title="Inventario General"
                description="Control de insumos, medicamentos, equipos y materiales de la hacienda."
                icon="inventory_2"
              />
            }
          />
          <Route
            path="maquinaria"
            element={
              <ComingSoonPage
                title="Módulo de Maquinaria"
                description="Registro de maquinaria agrícola, mantenimientos y programación de uso."
                icon="agriculture"
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
