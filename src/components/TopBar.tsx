import { MainView } from '../types/workshop';
import { BrandLogo } from './BrandLogo';

interface TopBarProps {
  activeView: MainView;
  onNavigate: (view: MainView) => void;
  onContinueWorkshop: () => void;
  hasStarted: boolean;
}

const NAV_ITEMS: { id: MainView; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'modules', label: 'Modules' },
  { id: 'tracker', label: 'Tracker' },
  { id: 'plan', label: '30-Day Plan' },
  { id: 'certificate', label: 'Certificate' },
];

export function TopBar({
  activeView,
  onNavigate,
  onContinueWorkshop,
  hasStarted,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#D8E0E4] bg-white/95 backdrop-blur-sm no-print">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
        {/* Zone 1: Single brand element */}
        <button
          type="button"
          onClick={() => onNavigate('overview')}
          className="flex items-center whitespace-nowrap shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="Elysium Academy Workshop Home"
        >
          <BrandLogo className="h-8 sm:h-9" />
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Workshop navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'text-[#2F3E46] font-semibold'
                    : 'text-[#52646D] hover:text-[#2F3E46]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[13px] h-[2px] bg-[#F5A623]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onContinueWorkshop}
            className="rounded-md bg-[#2F3E46] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#243138] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {hasStarted ? 'Resume Lab' : 'Start Workshop'}
          </button>
        </div>
      </div>

      {/* Compact single-row mobile navigation */}
      <nav
        aria-label="Mobile workshop navigation"
        className="flex md:hidden items-center gap-5 overflow-x-auto border-t border-[#E6ECEF] px-4 py-2 text-xs font-medium"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`whitespace-nowrap shrink-0 py-0.5 transition-colors ${
                isActive
                  ? 'text-[#2F3E46] font-semibold underline decoration-[#F5A623] decoration-2 underline-offset-4'
                  : 'text-[#52646D]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
