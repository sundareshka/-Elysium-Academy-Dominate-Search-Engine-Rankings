import { useEffect, useState } from 'react';
import { CertificateView } from './components/CertificateView';
import { ModulesView } from './components/ModulesView';
import { OverviewView } from './components/OverviewView';
import { PlanView } from './components/PlanView';
import { TopBar } from './components/TopBar';
import { TrackerView } from './components/TrackerView';
import { INITIAL_WORKSHOP_STATE, WORKSHOP_META } from './data/workshopData';
import {
  BacklinkProfileSnapshot,
  BrandKit,
  CompetitorOpportunity,
  Exercise1Response,
  LinkableAssetDraft,
  MainView,
  ModuleId,
  OutreachDraft,
  PollOptionId,
  SubmissionRecord,
  WorkshopState,
} from './types/workshop';

const STORAGE_KEY = 'elysium_backlink_workshop_v1';

function loadInitialState(): WorkshopState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_WORKSHOP_STATE;
    const parsed = JSON.parse(raw) as Partial<WorkshopState>;
    return {
      ...INITIAL_WORKSHOP_STATE,
      ...parsed,
      brandKit: {
        ...INITIAL_WORKSHOP_STATE.brandKit,
        ...(parsed.brandKit || {}),
      },
      assetDraft: {
        ...INITIAL_WORKSHOP_STATE.assetDraft,
        ...(parsed.assetDraft || {}),
      },
      outreachDraft: {
        ...INITIAL_WORKSHOP_STATE.outreachDraft,
        ...(parsed.outreachDraft || {}),
      },
    };
  } catch {
    return INITIAL_WORKSHOP_STATE;
  }
}

export default function App() {
  const [activeView, setActiveView] = useState<MainView>('overview');
  const [state, setState] = useState<WorkshopState>(loadInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota restrictions
    }
  }, [state]);

  const hasStarted =
    Boolean(state.pollChoice) ||
    Object.keys(state.exercise1Responses).length > 0 ||
    Boolean(state.profileSnapshot) ||
    state.submissions.length > 0;

  const handleNavigate = (view: MainView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModule = (moduleId: ModuleId) => {
    setState((prev) => ({ ...prev, activeModule: moduleId }));
    setActiveView('modules');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateParticipant = (name: string, website: string) => {
    setState((prev) => ({
      ...prev,
      participantName: name,
      practiceWebsite: website,
    }));
  };

  const handleVotePoll = (choice: PollOptionId) => {
    setState((prev) => ({ ...prev, pollChoice: choice }));
  };

  const handleRecordEx1 = (response: Exercise1Response) => {
    setState((prev) => ({
      ...prev,
      exercise1Responses: {
        ...prev.exercise1Responses,
        [response.scenarioId]: response,
      },
    }));
  };

  const handleSaveSnapshot = (snapshot: BacklinkProfileSnapshot) => {
    setState((prev) => ({
      ...prev,
      practiceWebsite: snapshot.domain,
      profileSnapshot: snapshot,
    }));
  };

  const handleUpdateBrandKit = (kit: BrandKit) => {
    setState((prev) => ({ ...prev, brandKit: kit }));
  };

  const handleAddSubmission = (record: SubmissionRecord) => {
    setState((prev) => ({
      ...prev,
      submissions: [record, ...prev.submissions],
    }));
  };

  const handleToggleSubmissionStatus = (id: string) => {
    setState((prev) => ({
      ...prev,
      submissions: prev.submissions.map((s) =>
        s.id === id ? { ...s, status: s.status === 'Live' ? 'Pending' : 'Live' } : s
      ),
    }));
  };

  const handleDeleteSubmission = (id: string) => {
    setState((prev) => ({
      ...prev,
      submissions: prev.submissions.filter((s) => s.id !== id),
    }));
  };

  const handleExportOpportunities = (keyword: string, opportunities: CompetitorOpportunity[]) => {
    setState((prev) => ({
      ...prev,
      competitorKeyword: keyword,
      competitorOpportunities: opportunities,
    }));
  };

  const handleUpdateOpportunityStatus = (
    id: string,
    status: CompetitorOpportunity['status']
  ) => {
    setState((prev) => ({
      ...prev,
      competitorOpportunities: prev.competitorOpportunities.map((o) =>
        o.id === id ? { ...o, status } : o
      ),
    }));
  };

  const handleDeleteOpportunity = (id: string) => {
    setState((prev) => ({
      ...prev,
      competitorOpportunities: prev.competitorOpportunities.filter((o) => o.id !== id),
    }));
  };

  const handleTogglePlanTask = (taskId: string) => {
    setState((prev) => ({
      ...prev,
      planTasks: prev.planTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    }));
  };

  const handleUpdateAssetDraft = (draft: LinkableAssetDraft) => {
    setState((prev) => ({ ...prev, assetDraft: draft }));
  };

  const handleUpdateOutreachDraft = (draft: OutreachDraft) => {
    setState((prev) => ({ ...prev, outreachDraft: draft }));
  };

  const handleSelectAssessmentAnswer = (questionId: string, optionIdx: number) => {
    setState((prev) => ({
      ...prev,
      assessmentAnswers: {
        ...prev.assessmentAnswers,
        [questionId]: optionIdx,
      },
    }));
  };

  const handleSubmitAssessment = () => {
    setState((prev) => ({ ...prev, assessmentSubmitted: true }));
  };

  const handleResetAssessment = () => {
    setState((prev) => ({
      ...prev,
      assessmentAnswers: {},
      assessmentSubmitted: false,
    }));
  };

  const handleResetWorkshop = () => {
    setState(INITIAL_WORKSHOP_STATE);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage error
    }
    setActiveView('overview');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FA] text-[#1E292E]">
      <TopBar
        activeView={activeView}
        onNavigate={handleNavigate}
        onContinueWorkshop={() => handleOpenModule(state.activeModule)}
        hasStarted={hasStarted}
      />

      <div className="flex-1">
        {activeView === 'overview' && (
          <OverviewView
            state={state}
            onUpdateParticipant={handleUpdateParticipant}
            onVotePoll={handleVotePoll}
            onOpenModule={handleOpenModule}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'modules' && (
          <ModulesView
            state={state}
            onSelectModule={(mod) => setState((prev) => ({ ...prev, activeModule: mod }))}
            onRecordEx1={handleRecordEx1}
            onSaveSnapshot={handleSaveSnapshot}
            onUpdateBrandKit={handleUpdateBrandKit}
            onAddSubmission={handleAddSubmission}
            onExportOpportunities={handleExportOpportunities}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'tracker' && (
          <TrackerView
            state={state}
            onAddManualSubmission={handleAddSubmission}
            onToggleSubmissionStatus={handleToggleSubmissionStatus}
            onDeleteSubmission={handleDeleteSubmission}
            onUpdateOpportunityStatus={handleUpdateOpportunityStatus}
            onDeleteOpportunity={handleDeleteOpportunity}
            onOpenModule={handleOpenModule}
          />
        )}

        {activeView === 'plan' && (
          <PlanView
            state={state}
            onToggleTask={handleTogglePlanTask}
            onUpdateAssetDraft={handleUpdateAssetDraft}
            onUpdateOutreachDraft={handleUpdateOutreachDraft}
          />
        )}

        {activeView === 'certificate' && (
          <CertificateView
            state={state}
            onUpdateName={(name) =>
              setState((prev) => ({ ...prev, participantName: name }))
            }
            onSelectAssessmentAnswer={handleSelectAssessmentAnswer}
            onSubmitAssessment={handleSubmitAssessment}
            onResetAssessment={handleResetAssessment}
          />
        )}
      </div>

      {/* Quiet Institutional Footer (Slide 26 Contact Details) */}
      <footer className="mt-16 border-t border-[#D8E0E4] bg-[#2F3E46] text-[#CBD5DC] no-print">
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 text-xs">
            <p className="font-display-heading text-lg font-bold text-white">
              Elysium Academy · {WORKSHOP_META.title}
            </p>
            <p>
              {WORKSHOP_META.website} <span aria-hidden="true">·</span> {WORKSHOP_META.email}{' '}
              <span aria-hidden="true">·</span> {WORKSHOP_META.phone}
            </p>
            <p className="text-[#9EB0B9]">{WORKSHOP_META.address}</p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs">
            <button
              type="button"
              onClick={() => handleNavigate('tracker')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Backlink Tracker
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('plan')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              30-Day Plan
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('certificate')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              E-Certificate
            </button>
            <button
              type="button"
              onClick={handleResetWorkshop}
              className="text-[#F5A623] hover:text-white transition-colors cursor-pointer"
            >
              Reset Progress
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
