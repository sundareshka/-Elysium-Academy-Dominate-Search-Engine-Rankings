import { CheckCircle2, ClipboardList, FileSpreadsheet, GraduationCap } from 'lucide-react';
import {
  BacklinkProfileSnapshot,
  BrandKit,
  CompetitorOpportunity,
  Exercise1Response,
  MainView,
  ModuleId,
  SubmissionRecord,
  WorkshopState,
} from '../types/workshop';
import { Module1Quality } from './modules/Module1Quality';
import { Module2DomainsAnchors } from './modules/Module2DomainsAnchors';
import { Module3Submissions } from './modules/Module3Submissions';
import { Module4Competitors } from './modules/Module4Competitors';

interface ModulesViewProps {
  state: WorkshopState;
  onSelectModule: (moduleId: ModuleId) => void;
  onRecordEx1: (response: Exercise1Response) => void;
  onSaveSnapshot: (snapshot: BacklinkProfileSnapshot) => void;
  onUpdateBrandKit: (kit: BrandKit) => void;
  onAddSubmission: (record: SubmissionRecord) => void;
  onExportOpportunities: (keyword: string, opportunities: CompetitorOpportunity[]) => void;
  onNavigate: (view: MainView) => void;
}

export function ModulesView({
  state,
  onSelectModule,
  onRecordEx1,
  onSaveSnapshot,
  onUpdateBrandKit,
  onAddSubmission,
  onExportOpportunities,
  onNavigate,
}: ModulesViewProps) {
  const ex1Done = Object.keys(state.exercise1Responses).length >= 5;
  const ex2Done = Boolean(
    state.profileSnapshot && state.profileSnapshot.anchors.every((a) => a.selectedType !== '')
  );
  const ex3Done = state.submissions.length >= 2;
  const ex4Done = state.competitorOpportunities.filter((o) => o.status !== 'Removed').length >= 5;

  const moduleList: {
    id: ModuleId;
    num: string;
    title: string;
    duration: string;
    summary: string;
    completed: boolean;
  }[] = [
    {
      id: 'module1',
      num: '01',
      title: 'Backlinks & Link Quality',
      duration: '20 min',
      summary: `${Object.keys(state.exercise1Responses).length}/5 links judged`,
      completed: ex1Done,
    },
    {
      id: 'module2',
      num: '02',
      title: 'Referring Domains & Anchors',
      duration: '20 min',
      summary: ex2Done ? '5/5 anchors saved' : state.profileSnapshot ? 'Report loaded' : 'Not run yet',
      completed: ex2Done,
    },
    {
      id: 'module3',
      num: '03',
      title: 'Opportunities & Submissions',
      duration: '20 min',
      summary: `${state.submissions.length}/2 submissions`,
      completed: ex3Done,
    },
    {
      id: 'module4',
      num: '04',
      title: 'Competitors & Strategy',
      duration: '12 min',
      summary: `${state.competitorOpportunities.length} targets saved`,
      completed: ex4Done,
    },
  ];

  const completedCount = moduleList.filter((m) => m.completed).length;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8">
      {/* Mobile Module Switcher */}
      <div className="lg:hidden mb-6 flex items-center gap-2 overflow-x-auto pb-1">
        {moduleList.map((mod) => {
          const isActive = state.activeModule === mod.id;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => onSelectModule(mod.id)}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'border-[#2F3E46] bg-[#2F3E46] text-white'
                  : 'border-[#D8E0E4] bg-white text-[#2F3E46]'
              }`}
            >
              <span>{mod.num}.</span>
              <span>{mod.title}</span>
              {mod.completed && (
                <CheckCircle2
                  className={`h-3.5 w-3.5 ${isActive ? 'text-[#F5A623]' : 'text-[#15803D]'}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Two-Zone Desktop Layout: Left Sidebar Rail + Right Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <aside className="hidden lg:block lg:col-span-3 sticky top-[76px] space-y-5">
          <div className="rounded-xl border border-[#D8E0E4] bg-white p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6ECEF]">
              <h2 className="text-lg font-bold text-[#2F3E46]">Workshop Modules</h2>
              <span className="font-mono text-xs font-semibold text-[#52646D] tabular-nums">
                {completedCount}/4
              </span>
            </div>

            <nav aria-label="Workshop modules" className="mt-3 space-y-1.5">
              {moduleList.map((mod) => {
                const isActive = state.activeModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => onSelectModule(mod.id)}
                    className={`w-full text-left rounded-lg px-3.5 py-3 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#2F3E46] text-white'
                        : 'bg-transparent text-[#2F3E46] hover:bg-[#F7F9FA]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-mono font-semibold ${
                          isActive ? 'text-[#F5A623]' : 'text-[#6B7D86]'
                        }`}
                      >
                        Module {mod.num} · {mod.duration}
                      </span>
                      {mod.completed && (
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 ${
                            isActive ? 'text-[#F5A623]' : 'text-[#15803D]'
                          }`}
                        />
                      )}
                    </div>
                    <p className="mt-1 text-sm font-semibold leading-snug">{mod.title}</p>
                    <p
                      className={`mt-0.5 text-xs tabular-nums ${
                        isActive ? 'text-[#CBD5DC]' : 'text-[#52646D]'
                      }`}
                    >
                      {mod.summary}
                    </p>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Live Deliverables Quick Jump */}
          <div className="rounded-xl border border-[#D8E0E4] bg-white p-5 space-y-2.5">
            <p className="text-xs font-semibold text-[#52646D]">Workshop Deliverables</p>
            <button
              type="button"
              onClick={() => onNavigate('tracker')}
              className="w-full flex items-center justify-between rounded-md bg-[#F7F9FA] px-3 py-2 text-xs font-semibold text-[#2F3E46] hover:bg-[#EBEEF0] transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <FileSpreadsheet className="h-3.5 w-3.5 text-[#52646D]" />
                Backlink Tracker
              </span>
              <span className="font-mono text-[#52646D] tabular-nums">
                {state.submissions.length + state.competitorOpportunities.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('plan')}
              className="w-full flex items-center justify-between rounded-md bg-[#F7F9FA] px-3 py-2 text-xs font-semibold text-[#2F3E46] hover:bg-[#EBEEF0] transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <ClipboardList className="h-3.5 w-3.5 text-[#52646D]" />
                30-Day Plan
              </span>
              <span className="font-mono text-[#52646D] tabular-nums">
                {state.planTasks.filter((t) => t.completed).length}/{state.planTasks.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('certificate')}
              className="w-full flex items-center justify-between rounded-md bg-[#F7F9FA] px-3 py-2 text-xs font-semibold text-[#2F3E46] hover:bg-[#EBEEF0] transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <GraduationCap className="h-3.5 w-3.5 text-[#52646D]" />
                E-Certificate
              </span>
              <span className="text-[#52646D]">
                {state.assessmentSubmitted ? 'Ready' : 'Quiz'}
              </span>
            </button>
          </div>
        </aside>

        {/* Active Module Content Stage */}
        <main className="lg:col-span-9 min-w-0">
          {state.activeModule === 'module1' && (
            <Module1Quality
              participantName={state.participantName}
              responses={state.exercise1Responses}
              onRecordResponse={onRecordEx1}
              onNextModule={() => {
                onSelectModule('module2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {state.activeModule === 'module2' && (
            <Module2DomainsAnchors
              practiceWebsite={state.practiceWebsite}
              savedSnapshot={state.profileSnapshot}
              onSaveSnapshot={onSaveSnapshot}
              onNextModule={() => {
                onSelectModule('module3');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {state.activeModule === 'module3' && (
            <Module3Submissions
              brandKit={state.brandKit}
              submissions={state.submissions}
              onUpdateBrandKit={onUpdateBrandKit}
              onAddSubmission={onAddSubmission}
              onNextModule={() => {
                onSelectModule('module4');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {state.activeModule === 'module4' && (
            <Module4Competitors
              savedOpportunities={state.competitorOpportunities}
              onExportOpportunities={onExportOpportunities}
              onNavigate={onNavigate}
            />
          )}
        </main>
      </div>
    </div>
  );
}
