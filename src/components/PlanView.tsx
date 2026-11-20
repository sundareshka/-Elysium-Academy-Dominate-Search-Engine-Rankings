import { useState } from 'react';
import { Check, CheckCircle2, Download, Printer, Send } from 'lucide-react';
import { LinkableAssetDraft, OutreachDraft, WorkshopState } from '../types/workshop';

interface PlanViewProps {
  state: WorkshopState;
  onToggleTask: (taskId: string) => void;
  onUpdateAssetDraft: (draft: LinkableAssetDraft) => void;
  onUpdateOutreachDraft: (draft: OutreachDraft) => void;
}

const WEEK_META = [
  {
    week: 1 as const,
    heading: 'Foundation',
    summary: '5 complete profiles or listings with identical NAP details.',
  },
  {
    week: 2 as const,
    heading: 'Relevant Listings',
    summary: '3 to 5 vetted targets from your competitor link-gap list.',
  },
  {
    week: 3 as const,
    heading: 'Linkable Asset',
    summary: '1 practical guide, checklist, or case study worth citing.',
  },
  {
    week: 4 as const,
    heading: 'Outreach',
    summary: '5 personalized messages sent. Review and update your tracker.',
  },
];

export function PlanView({
  state,
  onToggleTask,
  onUpdateAssetDraft,
  onUpdateOutreachDraft,
}: PlanViewProps) {
  const [outreachLoggedNotice, setOutreachLoggedNotice] = useState(false);

  const completedTasks = state.planTasks.filter((t) => t.completed).length;
  const totalTasks = state.planTasks.length;

  const handleDownloadPlanText = () => {
    const lines = [
      `30-DAY BACKLINK PLAN — ELYSIUM ACADEMY WORKSHOP`,
      `Participant: ${state.participantName.trim() || 'Workshop Participant'}`,
      `Target Website: ${state.practiceWebsite || state.brandKit.websiteUrl}`,
      `Generated: ${new Date().toLocaleDateString()}`,
      ``,
      ...WEEK_META.flatMap((w) => {
        const tasks = state.planTasks.filter((t) => t.week === w.week);
        return [
          `WEEK ${w.week}: ${w.heading.toUpperCase()} — ${w.summary}`,
          ...tasks.map((t) => `  [${t.completed ? 'x' : ' '}] ${t.title} — ${t.detail}`),
          ``,
        ];
      }),
      `WEEK 3 LINKABLE ASSET DRAFT`,
      `Format: ${state.assetDraft.format}`,
      `Title: ${state.assetDraft.title}`,
      `Audience: ${state.assetDraft.targetAudience}`,
      `Citation Hook: ${state.assetDraft.keyHook}`,
      ``,
      `WEEK 4 OUTREACH TEMPLATE`,
      `Target Domain: ${state.outreachDraft.recipientDomain}`,
      `Subject: ${state.outreachDraft.subject}`,
      `Messages Logged: ${state.outreachDraft.sentCount} / 5`,
      ``,
      state.outreachDraft.message,
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '30-day-backlink-plan-elysium-academy.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLogOutreachMessage = () => {
    onUpdateOutreachDraft({
      ...state.outreachDraft,
      sentCount: state.outreachDraft.sentCount + 1,
    });
    setOutreachLoggedNotice(true);
    window.setTimeout(() => setOutreachLoggedNotice(false), 3000);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 space-y-8 print-only-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#D8E0E4]">
        <div>
          <p className="text-xs font-semibold text-[#B87409]">
            Takeaway 02 <span aria-hidden="true">·</span> One-Page Action Roadmap
          </p>
          <h1 className="mt-1 text-4xl font-bold text-[#2F3E46]">Your 30-Day Backlink Plan</h1>
          <p className="mt-1 text-sm text-[#52646D]">
            A steady 30-day plan beats a one-day burst. Target website:{' '}
            <span className="font-mono font-semibold text-[#2F3E46]">
              {state.practiceWebsite || state.brandKit.websiteUrl}
            </span>{' '}
            <span aria-hidden="true">·</span>{' '}
            <span className="tabular-nums">
              {completedTasks}/{totalTasks} milestones checked
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 no-print">
          <button
            type="button"
            onClick={handleDownloadPlanText}
            className="inline-flex items-center gap-2 rounded-md border border-[#CBD5DC] bg-white px-4 py-2 text-sm font-semibold text-[#2F3E46] hover:bg-[#F7F9FA] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Download Plan
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md bg-[#2F3E46] px-4 py-2 text-sm font-semibold text-white hover:bg-[#243138] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            Print One-Pager
          </button>
        </div>
      </div>

      {/* 4-Week Column Grid (Slide 23) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {WEEK_META.map((w) => {
          const tasks = state.planTasks.filter((t) => t.week === w.week);
          const doneCount = tasks.filter((t) => t.completed).length;

          const liveSyncNote =
            w.week === 1
              ? `${state.submissions.length}/5 submissions logged`
              : w.week === 2
              ? `${state.competitorOpportunities.length} targets in tracker`
              : w.week === 3
              ? `${state.assetDraft.format} drafted`
              : `${state.outreachDraft.sentCount}/5 outreach logged`;

          return (
            <div
              key={w.week}
              className="rounded-xl border border-[#D8E0E4] bg-white p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-display-heading text-lg font-bold text-[#B87409]">
                    Week {w.week}
                  </span>
                  <span className="font-mono text-[#52646D] tabular-nums">
                    {doneCount}/{tasks.length}
                  </span>
                </div>
                <h2 className="mt-2 text-2xl font-bold text-[#2F3E46]">{w.heading}</h2>
                <p className="mt-1 text-xs text-[#52646D] leading-relaxed">{w.summary}</p>

                <ul className="mt-4 space-y-2.5 pt-4 border-t border-[#E6ECEF]">
                  {tasks.map((task) => (
                    <li key={task.id}>
                      <button
                        type="button"
                        onClick={() => onToggleTask(task.id)}
                        className="w-full text-left flex items-start gap-2.5 group cursor-pointer"
                      >
                        <span
                          className={`mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded border shrink-0 transition-colors ${
                            task.completed
                              ? 'border-[#15803D] bg-[#15803D] text-white'
                              : 'border-[#9EB0B9] bg-white group-hover:border-[#2F3E46]'
                          }`}
                        >
                          {task.completed && <Check className="h-3 w-3" />}
                        </span>
                        <span className="text-xs leading-snug">
                          <span
                            className={`block font-semibold ${
                              task.completed ? 'line-through text-[#6B7D86]' : 'text-[#2F3E46]'
                            }`}
                          >
                            {task.title}
                          </span>
                          <span className="block text-[#52646D] mt-0.5">{task.detail}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E6ECEF] text-xs font-medium text-[#52646D] tabular-nums">
                Tracker sync: <span className="text-[#2F3E46] font-semibold">{liveSyncNote}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Week 3 & Week 4 Interactive Planning Builders */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Week 3: Linkable Asset Planner */}
        <div className="lg:col-span-6 rounded-xl border border-[#D8E0E4] bg-white p-6 space-y-4">
          <div>
            <p className="text-xs font-semibold text-[#B87409]">Week 3 Planner</p>
            <h3 className="mt-0.5 text-2xl font-bold text-[#2F3E46]">Linkable Asset Blueprint</h3>
            <p className="mt-1 text-xs text-[#52646D]">
              Plan one genuinely helpful guide, checklist, or case study that bloggers and
              directories naturally want to reference.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EBEEF0] w-fit">
            {(['Guide', 'Checklist', 'Case Study'] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => onUpdateAssetDraft({ ...state.assetDraft, format: fmt })}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  state.assetDraft.format === fmt
                    ? 'bg-white text-[#2F3E46] shadow-sm'
                    : 'text-[#52646D] hover:text-[#2F3E46]'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div>
              <label htmlFor="asset-title" className="block text-xs font-semibold text-[#2F3E46]">
                Working Headline
              </label>
              <input
                id="asset-title"
                type="text"
                value={state.assetDraft.title}
                onChange={(e) =>
                  onUpdateAssetDraft({ ...state.assetDraft, title: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-3.5 py-2 text-sm text-[#1E292E] focus:border-[#2F3E46] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="asset-audience"
                className="block text-xs font-semibold text-[#2F3E46]"
              >
                Target Readers & Publishers
              </label>
              <input
                id="asset-audience"
                type="text"
                value={state.assetDraft.targetAudience}
                onChange={(e) =>
                  onUpdateAssetDraft({ ...state.assetDraft, targetAudience: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-3.5 py-2 text-xs text-[#1E292E] focus:border-[#2F3E46] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="asset-hook" className="block text-xs font-semibold text-[#2F3E46]">
                Why Another Site Would Link to This Page
              </label>
              <textarea
                id="asset-hook"
                rows={3}
                value={state.assetDraft.keyHook}
                onChange={(e) =>
                  onUpdateAssetDraft({ ...state.assetDraft, keyHook: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-3.5 py-2 text-xs text-[#1E292E] focus:border-[#2F3E46] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Week 4: Ethical Outreach Composer */}
        <div className="lg:col-span-6 rounded-xl border border-[#D8E0E4] bg-white p-6 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-[#B87409]">Week 4 Planner</p>
              <h3 className="mt-0.5 text-2xl font-bold text-[#2F3E46]">
                Outreach Message Composer
              </h3>
              <p className="mt-1 text-xs text-[#52646D]">
                Draft a concise, respectful outreach note referencing your Week 3 linkable asset.
              </p>
            </div>
            <span className="font-mono text-xs font-semibold text-[#2F3E46] tabular-nums shrink-0">
              {state.outreachDraft.sentCount}/5 logged
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="out-domain" className="block text-xs font-semibold text-[#2F3E46]">
                Target Website
              </label>
              <input
                id="out-domain"
                type="text"
                value={state.outreachDraft.recipientDomain}
                onChange={(e) =>
                  onUpdateOutreachDraft({
                    ...state.outreachDraft,
                    recipientDomain: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-3 py-2 font-mono text-xs text-[#1E292E] focus:border-[#2F3E46] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="out-subject" className="block text-xs font-semibold text-[#2F3E46]">
                Email Subject
              </label>
              <input
                id="out-subject"
                type="text"
                value={state.outreachDraft.subject}
                onChange={(e) =>
                  onUpdateOutreachDraft({ ...state.outreachDraft, subject: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-3 py-2 text-xs text-[#1E292E] focus:border-[#2F3E46] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="out-message" className="block text-xs font-semibold text-[#2F3E46]">
              Message Body
            </label>
            <textarea
              id="out-message"
              rows={5}
              value={state.outreachDraft.message}
              onChange={(e) =>
                onUpdateOutreachDraft({ ...state.outreachDraft, message: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-3.5 py-2 text-xs text-[#1E292E] leading-relaxed focus:border-[#2F3E46] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 no-print">
            <button
              type="button"
              onClick={handleLogOutreachMessage}
              className="inline-flex items-center gap-2 rounded-md bg-[#F5A623] px-4 py-2 text-xs font-semibold text-[#1E292E] hover:bg-[#E09519] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              Log Simulated Outreach Message ({state.outreachDraft.sentCount + 1}/5)
            </button>
            {outreachLoggedNotice && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803D]">
                <CheckCircle2 className="h-4 w-4" />
                Outreach logged in Week 4 counter
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
