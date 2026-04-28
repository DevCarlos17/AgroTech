import { type FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface NavItem {
  icon: string;
  label: string;
  to: string;
  filled?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { icon: 'dashboard',        label: 'Panel de Control', to: '/dashboard',        filled: true },
  { icon: 'pets',             label: 'Ganadería',        to: '/ganado/inventario'              },
  { icon: 'eco',              label: 'Cultivos',         to: '/cultivos'                       },
  { icon: 'payments',         label: 'Finanzas',         to: '/finanzas'                       },
  { icon: 'medical_services', label: 'Salud y Reprod.',  to: '/ganado/salud'                   },
  { icon: 'inventory_2',      label: 'Inventario',       to: '/inventario'                     },
  { icon: 'agriculture',      label: 'Maquinaria',       to: '/maquinaria'                     },
];

export const Sidebar: FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`${
        expanded ? 'w-64' : 'w-16'
      } border-r border-slate-100 bg-white flex flex-col h-screen sticky top-0 overflow-hidden shrink-0 transition-[width] duration-200 ease-in-out`}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 shrink-0 ${expanded ? 'px-6 gap-3' : 'justify-center px-3'} transition-all duration-200`}>
        <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
          <span className="material-symbols-outlined filled-icon">potted_plant</span>
        </div>
        {expanded && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-extrabold leading-tight tracking-tight text-slate-800 whitespace-nowrap">
              AgroTech
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary whitespace-nowrap">
              Hacienda Valle Verde
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav
        className={`flex-1 ${expanded ? 'px-4' : 'px-2'} space-y-1 mt-2 transition-all duration-200`}
        aria-label="Navegación principal"
      >
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            title={!expanded ? item.label : undefined}
            className={({ isActive }) =>
              `flex items-center py-2.5 rounded-lg transition-all text-sm ${
                expanded ? 'gap-3 px-4' : 'justify-center px-0'
              } ${
                isActive
                  ? 'bg-primary text-white font-semibold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
              }`
            }
          >
            <span
              className={`material-symbols-outlined text-[22px] shrink-0 ${item.filled ? 'filled-icon' : ''}`}
            >
              {item.icon}
            </span>
            {expanded && (
              <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Profile */}
      <div className={`${expanded ? 'p-4' : 'p-2'} mt-auto shrink-0 transition-all duration-200`}>
        <div
          className={`flex items-center rounded-2xl bg-slate-50 border border-slate-100 transition-all duration-200 ${
            expanded ? 'gap-3 p-3' : 'justify-center p-2'
          }`}
        >
          <div
            className="size-9 rounded-full bg-slate-200 shrink-0 border border-slate-100 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://i.pravatar.cc/36?u=juan)' }}
            role="img"
            aria-label="Avatar de Juan Molino"
          />
          {expanded && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate text-slate-800">Juan Molino</p>
                <p className="text-[10px] text-slate-500 truncate">Administrador</p>
              </div>
              <button
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="Configuración de cuenta"
              >
                <span className="material-symbols-outlined text-lg">settings</span>
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};
