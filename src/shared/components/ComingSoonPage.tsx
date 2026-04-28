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

      <h1 className="text-slate-900 font-extrabold text-2xl mb-3">{title}</h1>
      <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-8">{description}</p>

      <p className="text-slate-300 text-xs font-medium mb-8">No disponible aún</p>

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
