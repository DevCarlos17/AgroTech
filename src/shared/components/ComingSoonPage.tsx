import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface ComingSoonPageProps {
  title: string;
  description?: string;
  icon?: string;
}

export const ComingSoonPage: FC<ComingSoonPageProps> = ({
  title,
  description = 'Estamos trabajando en esta sección. Pronto estará disponible.',
  icon = 'construction',
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-24 px-8 text-center">
      {/* Icon badge */}
      <div className="size-24 rounded-3xl bg-primary-light border border-primary/10 flex items-center justify-center mb-6 shadow-sm">
        <span className="material-symbols-outlined text-primary text-5xl">{icon}</span>
      </div>

      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold uppercase tracking-wider mb-5">
        <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
        En Desarrollo
      </span>

      <h1 className="text-slate-900 font-extrabold text-2xl mb-3">{title}</h1>
      <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-8">{description}</p>

      {/* Progress indicator */}
      <div className="w-64 mb-8">
        <div className="flex justify-between text-xs text-slate-400 font-medium mb-2">
          <span>Progreso del módulo</span>
          <span>Próximamente</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-primary rounded-full" />
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary text-sm font-semibold transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Volver
      </button>
    </div>
  );
};
