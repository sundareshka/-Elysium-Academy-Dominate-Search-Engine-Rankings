import { ArrowRight, Check, CheckCircle2, ClipboardList, ExternalLink, FileSpreadsheet, GraduationCap, ShieldCheck } from 'lucide-react';
import {
  AGENDA_ITEMS,
  TAKEAWAY_ITEMS,
  WARMUP_POLL_OPTIONS,
  WELCOME_ETIQUETTE,
  WORKSHOP_META,
} from '../data/workshopData';
import { MainView, ModuleId, PollOptionId, WorkshopState } from '../types/workshop';

interface OverviewViewProps {
  state: WorkshopState;
  onUpdateParticipant: (name: string, website: string) => void;
  onVotePoll: (choice: PollOptionId) => void;
  onOpenModule: (moduleId: ModuleId) => void;
  onNavigate: (view: MainView) => void;
}

export function OverviewView({
  state,
  onUpdateParticipant,
  onVotePoll,
  onOpenModule,
  onNavigate,
}: OverviewViewProps) {
  const ex1Count = Object.keys(state.exercise1Responses).length;
  const ex2Done = Boolean(
    state.profileSnapshot && state.profileSnapshot.anchors.every((a) => a.selectedType !== '')
  );
  const ex3Count = state.submissions.length;
  const ex4Count = state.competitorOpportunities.filter((o) => o.status !== 'Removed').length;

  const totalVotes =
    WARMUP_POLL_OPTIONS.reduce((acc, opt) => acc + opt.baseVotes, 0) + (state.pollChoice ? 1 : 0);

  const getPollFeedback = (choice: PollOptionId) => {
    switch (choice) {
      case 'yes_regularly':
        return 'Great foundation. Today’s 5-point quality checklist and competitor link-gap workflow will help you sharpen which links are worth pursuing.';
      case 'once_or_twice':
        return 'You are in the right place. In Module 2 we will walk through reading Authority Score, referring domains, and anchor text ratios step by step.';
      case 'heard_never':
        return 'Very common across this cohort. You will run your first backlink report and record two live submissions right inside this workshop.';
      case 'first_time':
        return 'Welcome! Every module starts from first principles and builds directly into your tracker and 30-day action plan.';
    }
  };

  const getSessionStatus = (target: string) => {
    if (target === 'overview') return state.pollChoice ? 'Completed' : 'In progress';
    if (target === 'module1') return ex1Count >= 5 ? 'Completed' : ex1Count > 0 ? `${ex1Count}/5 judged` : 'Not started';
    if (target === 'module2') return ex2Done ? 'Completed' : state.profileSnapshot ? 'In progress' : 'Not started';
    if (target === 'module3') return ex3Count >= 2 ? 'Completed' : ex3Count > 0 ? `${ex3Count}/2 logged` : 'Not started';
    if (target === 'module4') return ex4Count >= 5 ? 'Completed' : ex4Count > 0 ? `${ex4Count} targets` : 'Not started';
    if (target === 'certificate') return state.assessmentSubmitted ? 'Completed' : 'Not started';
    return 'Ready';
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* Hero & Attendance Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 rounded-xl bg-[#2F3E46] p-7 sm:p-10 text-white flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#CBD5DC]">
              Online Workshop <span aria-hidden="true">·</span> {WORKSHOP_META.date}{' '}
              <span aria-hidden="true">·</span> {WORKSHOP_META.time}
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.02] tracking-tight text-white">
              Dominate Search Engine Rankings
            </h1>
            <div className="mt-4 h-[3px] w-14 bg-[#F5A623]" />
            <p className="mt-4 text-lg sm:text-xl font-medium text-[#E4EBEE]">
              {WORKSHOP_META.subtitle}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#C2CFD6]">
              Practice every concept from the Elysium Academy training deck in an interactive
              sandbox: judge real link scenarios, read backlink reports, verify NAP consistency on
              submissions, uncover competitor link gaps, and export your 30-day plan and
              e-certificate.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-[#C2CFD6] space-y-1">
              <p>
                Speaker: <span className="font-semibold text-white">{WORKSHOP_META.speaker}</span>{' '}
                <span aria-hidden="true">·</span> {WORKSHOP_META.platform}
              </p>
              <p>{WORKSHOP_META.website}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenModule('module1')}
                className="inline-flex items-center gap-2 rounded-md bg-[#F5A623] px-5 py-2.5 text-sm font-semibold text-[#1E292E] transition-colors hover:bg-[#E09519] whitespace-nowrap shrink-0 cursor-pointer"
              >
                Start Module 1
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('tracker')}
                className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Open Tracker
              </button>
            </div>
          </div>
        </div>

        {/* Right Attendance Check-in & Session Etiquette */}
        <div className="lg:col-span-5 rounded-xl border border-[#D8E0E4] bg-white p-7 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#2F3E46]">Welcome & Attendance Check-In</h2>
            <p className="mt-1.5 text-sm text-[#52646D]">
              Enter your full name for workshop attendance and your Elysium Academy e-certificate,
              plus the practice website you will audit today.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="participant-name"
                  className="block text-xs font-semibold text-[#2F3E46]"
                >
                  Full Name (appears on your certificate)
                </label>
                <input
                  id="participant-name"
                  type="text"
                  value={state.participantName}
                  onChange={(e) => onUpdateParticipant(e.target.value, state.practiceWebsite)}
                  placeholder="e.g., Priya Natarajan"
                  className="mt-1.5 w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-3.5 py-2.5 text-sm text-[#1E292E] placeholder:text-[#86969F] focus:border-[#2F3E46] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="practice-website"
                  className="block text-xs font-semibold text-[#2F3E46]"
                >
                  Practice Website Domain
                </label>
                <input
                  id="practice-website"
                  type="text"
                  value={state.practiceWebsite}
                  onChange={(e) => onUpdateParticipant(state.participantName, e.target.value)}
                  placeholder="www.elysiumacademy.org"
                  className="mt-1.5 w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-3.5 py-2.5 font-mono text-sm text-[#1E292E] placeholder:text-[#86969F] focus:border-[#2F3E46] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-[#E6ECEF]">
            <p className="text-xs font-semibold text-[#52646D] mb-3">Workshop Ground Rules</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WELCOME_ETIQUETTE.map((item) => (
                <div key={item.title} className="rounded-lg bg-[#F7F9FA] p-3">
                  <p className="text-xs font-semibold text-[#2F3E46]">{item.title}</p>
                  <p className="mt-0.5 text-xs text-[#52646D] leading-snug">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Warm-Up Poll (Slide 3) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 bg-[#F5A623] p-7 sm:p-9 text-[#1E292E] flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#1E292E]/80">
                Opening · Warm-Up Poll
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight text-[#1E292E]">
                Have you ever checked a website’s backlinks?
              </h2>
              <p className="mt-3 text-sm text-[#1E292E]/85">
                Answer in the workshop poll to see how your experience compares with the rest of the
                simulated session cohort.
              </p>
            </div>
            <p className="mt-6 text-xs font-medium text-[#1E292E]/75 tabular-nums">
              {totalVotes} cohort responses recorded
            </p>
          </div>

          <div className="lg:col-span-7 p-7 sm:p-9 flex flex-col justify-center">
            <div className="space-y-3">
              {WARMUP_POLL_OPTIONS.map((option) => {
                const isSelected = state.pollChoice === option.id;
                const optionVotes = option.baseVotes + (isSelected ? 1 : 0);
                const percent = Math.round((optionVotes / totalVotes) * 100);

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onVotePoll(option.id)}
                    className={`w-full text-left rounded-lg border p-3.5 transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#2F3E46] bg-[#F1F5F7]'
                        : 'border-[#DCE3E7] bg-white hover:border-[#9EB0B9]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2.5 text-sm font-medium text-[#1E292E]">
                        <span
                          className={`inline-flex h-4 w-4 items-center justify-center rounded-full border shrink-0 ${
                            isSelected
                              ? 'border-[#2F3E46] bg-[#2F3E46] text-white'
                              : 'border-[#9EB0B9] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="h-2.5 w-2.5" />}
                        </span>
                        {option.label}
                      </span>
                      {state.pollChoice && (
                        <span className="font-mono text-xs font-semibold text-[#2F3E46] tabular-nums shrink-0">
                          {percent}%
                        </span>
                      )}
                    </div>

                    {state.pollChoice && (
                      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#E6ECEF]">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isSelected ? 'bg-[#2F3E46]' : 'bg-[#9EB0B9]'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {state.pollChoice && (
              <div className="mt-5 rounded-lg border border-[#DCE3E7] bg-[#F7F9FA] p-4">
                <p className="text-xs font-semibold text-[#2F3E46]">Trainer Note · Rishan</p>
                <p className="mt-1 text-sm text-[#3E5059] leading-relaxed">
                  {getPollFeedback(state.pollChoice)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Workshop Agenda (Slide 4) */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
          <div>
            <h2 className="text-3xl font-bold text-[#2F3E46]">Workshop Agenda</h2>
            <div className="mt-1.5 h-[3px] w-10 bg-[#F5A623]" />
          </div>
          <p className="text-sm text-[#52646D] tabular-nums">
            90 minutes total <span aria-hidden="true">·</span> 4 hands-on exercises
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#D8E0E4] bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2F3E46] text-white text-xs font-semibold">
                <th className="py-3.5 px-5 whitespace-nowrap">Time</th>
                <th className="py-3.5 px-5 whitespace-nowrap">Session</th>
                <th className="py-3.5 px-5">Topic</th>
                <th className="py-3.5 px-5 whitespace-nowrap text-right">Duration</th>
                <th className="py-3.5 px-5 whitespace-nowrap text-right">Progress</th>
                <th className="py-3.5 px-5 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6ECEF] text-sm">
              {AGENDA_ITEMS.map((row, idx) => {
                const status = getSessionStatus(row.target);
                const isDone = status === 'Completed';

                return (
                  <tr
                    key={row.session}
                    className={`${idx % 2 === 1 ? 'bg-[#F7F9FA]/70' : 'bg-white'} hover:bg-[#EEF2F4]/80 transition-colors`}
                  >
                    <td className="py-3.5 px-5 font-mono text-xs text-[#3E5059] tabular-nums whitespace-nowrap">
                      {row.time}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-[#2F3E46] whitespace-nowrap">
                      {row.session}
                    </td>
                    <td className="py-3.5 px-5 text-[#2F3E46]">{row.topic}</td>
                    <td className="py-3.5 px-5 font-mono text-xs text-[#52646D] tabular-nums text-right whitespace-nowrap">
                      {row.duration}
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium tabular-nums ${
                          isDone ? 'text-[#15803D]' : 'text-[#52646D]'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="h-3.5 w-3.5" />}
                        {status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => {
                          if (row.target === 'overview') return;
                          if (row.target === 'certificate') {
                            onNavigate('certificate');
                          } else {
                            onOpenModule(row.target);
                          }
                        }}
                        disabled={row.target === 'overview'}
                        className={`text-xs font-semibold transition-colors cursor-pointer ${
                          row.target === 'overview'
                            ? 'text-[#86969F] cursor-default'
                            : 'text-[#2F3E46] hover:text-[#B87409] underline underline-offset-4'
                        }`}
                      >
                        {row.target === 'overview' ? 'Current view' : 'Open'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* What You Will Take Away (Slide 5) */}
      <section>
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-[#2F3E46]">What You Will Take Away</h2>
          <div className="mt-1.5 h-[3px] w-10 bg-[#F5A623]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TAKEAWAY_ITEMS.map((item) => {
            const Icon =
              item.number === '01'
                ? FileSpreadsheet
                : item.number === '02'
                ? ClipboardList
                : item.number === '03'
                ? ShieldCheck
                : GraduationCap;

            const statusNote =
              item.number === '01'
                ? `${ex3Count} submissions · ${ex4Count} targets`
                : item.number === '02'
                ? `${state.planTasks.filter((t) => t.completed).length} of ${state.planTasks.length} tasks done`
                : item.number === '03'
                ? `${ex1Count} of 5 practice links judged`
                : state.participantName.trim()
                ? `Issued to ${state.participantName.trim()}`
                : 'Add your name above to personalize';

            return (
              <div
                key={item.number}
                className="rounded-xl border border-[#D8E0E4] bg-white p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[#52646D]">
                    <span className="font-display-heading text-2xl font-bold text-[#2F3E46] tabular-nums">
                      {item.number}
                    </span>
                    <Icon className="h-5 w-5 text-[#52646D]" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-[#2F3E46]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#52646D] leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E6ECEF] flex items-center justify-between gap-2">
                  <span className="text-xs text-[#52646D] truncate">{statusNote}</span>
                  <button
                    type="button"
                    onClick={() =>
                      item.targetView === 'modules'
                        ? onOpenModule('module1')
                        : onNavigate(item.targetView)
                    }
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#2F3E46] hover:text-[#B87409] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Open
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
