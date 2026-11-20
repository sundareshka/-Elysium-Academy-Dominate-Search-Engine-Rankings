import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  MessageSquare,
  Send,
  Shield,
  Users,
  XCircle,
} from 'lucide-react';
import { EXERCISE_1_SCENARIOS, QUALITY_CHECKLIST } from '../../data/workshopData';
import { Exercise1Response, LinkVerdict } from '../../types/workshop';

interface Module1QualityProps {
  participantName: string;
  responses: Record<string, Exercise1Response>;
  onRecordResponse: (response: Exercise1Response) => void;
  onNextModule: () => void;
}

const SOURCE_PRESETS = [
  {
    id: 'news',
    label: 'News Site',
    domain: 'tamilnaduedutech.in',
    discoveryImpact: 'Search bots crawl high-frequency news articles within minutes and follow the link to index your new guide.',
    authorityImpact: 'Editorial approval from an established regional publication passes strong topical trust to your page.',
    referralImpact: 'Readers researching career courses click straight through to your landing page with high intent.',
  },
  {
    id: 'blog',
    label: 'Industry Blog',
    domain: 'seoplaybook.in',
    discoveryImpact: 'Crawlers map the topical relationship between the blog post and your resource page.',
    authorityImpact: 'Contextual placement inside a relevant tutorial signals subject-matter credibility.',
    referralImpact: 'Practitioners and students follow the citation to download your checklist or syllabus.',
  },
  {
    id: 'directory',
    label: 'Verified Directory',
    domain: 'shiksha.com',
    discoveryImpact: 'Structured category pages help search engines discover your course listings and contact details.',
    authorityImpact: 'Consistent business data confirms your brand is legitimate and active.',
    referralImpact: 'Prospective learners comparing local institutes click directly to your website.',
  },
  {
    id: 'college',
    label: 'College Page',
    domain: 'csdept.maduraicollege.edu.in',
    discoveryImpact: 'Academic partner pages are crawled reliably and rarely suffer from link rot.',
    authorityImpact: 'Institutional .edu.in domains carry high inherent trust in search algorithms.',
    referralImpact: 'Final-year students discover your workshops through department career portals.',
  },
];

export function Module1Quality({
  participantName,
  responses,
  onRecordResponse,
  onNextModule,
}: Module1QualityProps) {
  const [selectedSourceId, setSelectedSourceId] = useState(SOURCE_PRESETS[0].id);
  const [pulseActive, setPulseActive] = useState(true);
  const [expandedCheckId, setExpandedCheckId] = useState<number>(1);

  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [selectedVerdict, setSelectedVerdict] = useState<LinkVerdict | null>(null);
  const [reasonInput, setReasonInput] = useState('');

  const selectedSource = SOURCE_PRESETS.find((s) => s.id === selectedSourceId) ?? SOURCE_PRESETS[0];
  const scenario = EXERCISE_1_SCENARIOS[activeScenarioIdx];
  const existingResponse = responses[scenario.id];

  const classifiedCount = Object.keys(responses).length;
  const reasonedCount = Object.values(responses).filter((r) => r.reason.trim().length >= 6).length;
  const correctCount = Object.values(responses).filter((r) => r.isCorrect).length;
  const exerciseComplete = classifiedCount === 5 && reasonedCount >= 3;

  const handleSelectScenario = (idx: number) => {
    setActiveScenarioIdx(idx);
    const saved = responses[EXERCISE_1_SCENARIOS[idx].id];
    setSelectedVerdict(saved ? saved.verdict : null);
    setReasonInput(saved ? saved.reason : '');
  };

  const handleSubmitJudge = () => {
    if (!selectedVerdict) return;
    const isCorrect = selectedVerdict === scenario.correctVerdict;
    onRecordResponse({
      scenarioId: scenario.id,
      verdict: selectedVerdict,
      reason: reasonInput.trim(),
      isCorrect,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <div className="space-y-10">
      {/* Module Header */}
      <div className="rounded-xl bg-[#2F3E46] p-6 sm:p-8 text-white">
        <p className="text-xs font-semibold tracking-wide text-[#F5A623]">
          Module 01 <span aria-hidden="true">·</span> 20 minutes
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
          Backlinks and Link Quality
        </h2>
        <div className="mt-3 h-[3px] w-12 bg-[#F5A623]" />
        <p className="mt-3 max-w-2xl text-sm text-[#C8D4DA] leading-relaxed">
          A backlink is a link from another website to yours. Search engines read it as a
          recommendation—and judge every link using five practical quality checks.
        </p>
      </div>

      {/* Interactive Simulator 1A: What is a Backlink & Three Ways Backlinks Help */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-[#2F3E46]">
              Interactive Model: How a Backlink Works
            </h3>
            <p className="mt-1 text-sm text-[#52646D]">
              Select a linking website source to simulate how Discovery, Authority, and Referral
              Traffic flow to your page.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EBEEF0] self-start sm:self-auto">
            {SOURCE_PRESETS.map((src) => (
              <button
                key={src.id}
                type="button"
                onClick={() => {
                  setSelectedSourceId(src.id);
                  setPulseActive(true);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedSourceId === src.id
                    ? 'bg-white text-[#2F3E46] font-semibold shadow-sm'
                    : 'text-[#52646D] hover:text-[#2F3E46]'
                }`}
              >
                {src.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Signal Flow Diagram */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-11 gap-4 items-center rounded-lg border border-[#E6ECEF] bg-[#F7F9FA] p-5">
          {/* Source Node */}
          <div className="lg:col-span-4 rounded-lg border border-[#CBD5DC] bg-white p-4">
            <p className="text-xs font-semibold text-[#52646D]">Another Website</p>
            <p className="mt-1 text-lg font-bold text-[#2F3E46]">{selectedSource.label}</p>
            <p className="mt-1 font-mono text-xs text-[#52646D] truncate">
              {selectedSource.domain}
            </p>
            <p className="mt-3 text-xs text-[#3E5059] border-t border-[#E6ECEF] pt-2.5">
              Links out to your page as a trusted recommendation.
            </p>
          </div>

          {/* Animated SVG Connector */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center py-2">
            <svg
              viewBox="0 0 220 68"
              className="w-full max-w-[220px] h-16"
              aria-label="Backlink signal pathway from referring website to your website"
            >
              <line
                x1="8"
                y1="14"
                x2="196"
                y2="34"
                stroke="#2F3E46"
                strokeWidth="2"
                className={pulseActive ? 'animate-signal-flow' : ''}
              />
              <line
                x1="8"
                y1="34"
                x2="196"
                y2="34"
                stroke="#F5A623"
                strokeWidth="3"
                className={pulseActive ? 'animate-signal-flow' : ''}
              />
              <line
                x1="8"
                y1="54"
                x2="196"
                y2="34"
                stroke="#15803D"
                strokeWidth="2"
                className={pulseActive ? 'animate-signal-flow' : ''}
              />
              <polygon points="196,26 212,34 196,42" fill="#F5A623" />
            </svg>
            <button
              type="button"
              onClick={() => setPulseActive((v) => !v)}
              className="mt-1 text-xs font-medium text-[#52646D] hover:text-[#2F3E46] underline underline-offset-4 cursor-pointer"
            >
              {pulseActive ? 'Pause signal flow' : 'Resume signal flow'}
            </button>
          </div>

          {/* Target Node */}
          <div className="lg:col-span-4 rounded-lg bg-[#2F3E46] p-4 text-white">
            <p className="text-xs font-semibold text-[#F5A623]">Your Website</p>
            <p className="mt-1 text-lg font-bold text-white">Receiving Page</p>
            <p className="mt-1 font-mono text-xs text-[#CBD5DC] truncate">
              www.elysiumacademy.org
            </p>
            <p className="mt-3 text-xs text-[#D5DFE4] border-t border-white/15 pt-2.5">
              Gains crawl discovery, ranking authority, and direct visitors.
            </p>
          </div>
        </div>

        {/* Three Ways Backlinks Help */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-[#F7F9FA] border border-[#E6ECEF] p-4">
            <div className="flex items-center gap-2 text-[#2F3E46]">
              <Compass className="h-4 w-4 shrink-0" />
              <h4 className="font-display-heading text-lg font-bold">1. Discovery</h4>
            </div>
            <p className="mt-2 text-xs text-[#3E5059] leading-relaxed">
              {selectedSource.discoveryImpact}
            </p>
          </div>

          <div className="rounded-lg bg-[#F7F9FA] border border-[#E6ECEF] p-4">
            <div className="flex items-center gap-2 text-[#2F3E46]">
              <Shield className="h-4 w-4 shrink-0" />
              <h4 className="font-display-heading text-lg font-bold">2. Authority</h4>
            </div>
            <p className="mt-2 text-xs text-[#3E5059] leading-relaxed">
              {selectedSource.authorityImpact}
            </p>
          </div>

          <div className="rounded-lg bg-[#F7F9FA] border border-[#E6ECEF] p-4">
            <div className="flex items-center gap-2 text-[#2F3E46]">
              <Users className="h-4 w-4 shrink-0" />
              <h4 className="font-display-heading text-lg font-bold">3. Referral Traffic</h4>
            </div>
            <p className="mt-2 text-xs text-[#3E5059] leading-relaxed">
              {selectedSource.referralImpact}
            </p>
          </div>
        </div>
      </section>

      {/* Five-Point Quality Checklist (Slide 9) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white p-6 sm:p-7">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-[#2F3E46]">
            Quality vs. Low-Quality Links — 5-Point Checklist
          </h3>
          <p className="mt-1 text-sm text-[#52646D]">
            Select any row to inspect why search engines reward or discount that signal.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#D8E0E4]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2F3E46] text-white text-xs font-semibold">
                <th className="py-3 px-4">Check</th>
                <th className="py-3 px-4">Quality backlink</th>
                <th className="py-3 px-4">Low-quality backlink</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6ECEF] text-sm">
              {QUALITY_CHECKLIST.map((item) => {
                const isExpanded = expandedCheckId === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setExpandedCheckId(item.id)}
                    className={`cursor-pointer transition-colors ${
                      isExpanded ? 'bg-[#EEF2F4]' : 'bg-white hover:bg-[#F7F9FA]'
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-[#2F3E46] whitespace-nowrap">
                      {item.check}
                    </td>
                    <td className="py-3 px-4 text-[#15803D] font-medium">{item.quality}</td>
                    <td className="py-3 px-4 text-[#B91C1C] font-medium">{item.lowQuality}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Active Row Detail */}
        {QUALITY_CHECKLIST.filter((c) => c.id === expandedCheckId).map((active) => (
          <div
            key={active.id}
            className="mt-4 rounded-lg border border-[#DCE3E7] bg-[#F7F9FA] p-4 text-sm text-[#2F3E46]"
          >
            <span className="font-semibold">{active.check}: </span>
            <span className="text-[#3E5059]">{active.explanation}</span>
          </div>
        ))}
      </section>

      {/* Hands-On Exercise 1: Judge the Link (Slide 10) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E6ECEF]">
          <div>
            <p className="text-xs font-semibold text-[#B87409]">
              Exercise 1 <span aria-hidden="true">·</span> 5 minutes <span aria-hidden="true">·</span>{' '}
              Chat Activity
            </p>
            <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-[#2F3E46]">
              Judge the Link
            </h3>
          </div>
          <div className="text-xs text-[#52646D] tabular-nums">
            Progress: <strong className="text-[#2F3E46]">{classifiedCount}/5</strong> classified{' '}
            <span aria-hidden="true">·</span>{' '}
            <strong className="text-[#2F3E46]">{reasonedCount}/3</strong> reasons added{' '}
            <span aria-hidden="true">·</span>{' '}
            <strong className="text-[#15803D]">{correctCount}</strong> accurate
          </div>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {EXERCISE_1_SCENARIOS.map((sc, idx) => {
            const resp = responses[sc.id];
            const isActive = idx === activeScenarioIdx;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleSelectScenario(idx)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                  isActive
                    ? 'border-[#2F3E46] bg-[#2F3E46] text-white'
                    : 'border-[#D8E0E4] bg-[#F7F9FA] text-[#2F3E46] hover:bg-[#EBEEF0]'
                }`}
              >
                <span>Link {sc.number}</span>
                {resp && (
                  <span className={isActive ? 'text-[#F5A623]' : resp.isCorrect ? 'text-[#15803D]' : 'text-[#B91C1C]'}>
                    ({resp.verdict})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Two-column Exercise Workbench: Left = Link Situation, Right = Simulated Chat */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Simulated Link Situation on Trainer's Screen */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-lg border border-[#D8E0E4] bg-[#F7F9FA] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#52646D]">
                <span className="font-mono font-medium text-[#2F3E46]">{scenario.sourceSite}</span>
                <span>Link Scenario {scenario.number} of 5</span>
              </div>

              <h4 className="mt-2 text-xl font-bold text-[#2F3E46]">{scenario.title}</h4>

              {/* Simulated Webpage Snippet */}
              <div className="mt-3 rounded-md border border-[#DCE3E7] bg-white p-4 text-sm leading-relaxed text-[#3E5059]">
                “{scenario.snippetHtml.before}
                <span className="font-semibold text-[#1D4ED8] underline decoration-2 underline-offset-2">
                  {scenario.snippetHtml.anchor}
                </span>
                {scenario.snippetHtml.after}”
              </div>

              {/* 5-Point Metadata Inspection */}
              <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                <div>
                  <dt className="font-semibold text-[#52646D]">Source Topic</dt>
                  <dd className="mt-0.5 text-[#1E292E]">{scenario.sourceTopic}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#52646D]">Placement</dt>
                  <dd className="mt-0.5 text-[#1E292E]">{scenario.placement}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#52646D]">Anchor Text</dt>
                  <dd className="mt-0.5 font-mono text-[#1E292E]">{scenario.anchorText}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#52646D]">How It Was Earned</dt>
                  <dd className="mt-0.5 text-[#1E292E]">{scenario.acquisition}</dd>
                </div>
              </dl>
            </div>

            {/* Judge Controls */}
            <div className="rounded-lg border border-[#D8E0E4] bg-white p-5 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#2F3E46] mb-2">
                  Step 1: Classify using the 5-point checklist
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedVerdict('Q')}
                    className={`rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                      selectedVerdict === 'Q'
                        ? 'border-[#15803D] bg-[#15803D] text-white'
                        : 'border-[#CBD5DC] bg-white text-[#2F3E46] hover:bg-[#F7F9FA]'
                    }`}
                  >
                    Q — Quality Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedVerdict('L')}
                    className={`rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                      selectedVerdict === 'L'
                        ? 'border-[#B91C1C] bg-[#B91C1C] text-white'
                        : 'border-[#CBD5DC] bg-white text-[#2F3E46] hover:bg-[#F7F9FA]'
                    }`}
                  >
                    L — Low-Quality Link
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="judge-reason"
                  className="block text-xs font-semibold text-[#2F3E46]"
                >
                  Step 2: Give one checklist reason for the workshop chat
                </label>
                <input
                  id="judge-reason"
                  type="text"
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  placeholder="e.g., Relevant topic, real visitors, placed inside useful content..."
                  className="mt-1.5 w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-3.5 py-2 text-sm text-[#1E292E] focus:border-[#2F3E46] focus:bg-white focus:outline-none"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {scenario.suggestedReasons.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setReasonInput(suggestion)}
                      className="text-left text-xs text-[#52646D] hover:text-[#2F3E46] underline underline-offset-2 cursor-pointer"
                    >
                      Use note: “{suggestion}”
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleSubmitJudge}
                  disabled={!selectedVerdict}
                  className="inline-flex items-center gap-2 rounded-md bg-[#2F3E46] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#243138] disabled:opacity-45 disabled:cursor-not-allowed whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  {existingResponse ? 'Update Chat Answer' : 'Post to Workshop Chat'}
                </button>

                {activeScenarioIdx < EXERCISE_1_SCENARIOS.length - 1 && existingResponse && (
                  <button
                    type="button"
                    onClick={() => handleSelectScenario(activeScenarioIdx + 1)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2F3E46] hover:text-[#B87409] cursor-pointer"
                  >
                    Next Link
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Simulated Teams Workshop Chat */}
          <div className="lg:col-span-5 rounded-lg border border-[#D8E0E4] bg-[#F7F9FA] flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-[#DCE3E7] bg-white px-4 py-3 rounded-t-lg">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#2F3E46]" />
                <span className="text-sm font-semibold text-[#2F3E46]">Simulated Teams Chat</span>
              </div>
              <span className="text-xs text-[#52646D]">Exercise 1 Feed</span>
            </div>

            <div className="p-4 space-y-3 flex-1 min-h-[300px] max-h-[420px] overflow-y-auto">
              <div className="rounded-lg bg-white border border-[#E6ECEF] p-3 text-xs">
                <p className="font-semibold text-[#2F3E46]">
                  Rishan (Trainer) <span className="font-normal text-[#6B7D86]">· 11:18 AM</span>
                </p>
                <p className="mt-1 text-[#3E5059]">
                  Look at each link situation on screen. Type <strong>Q</strong> for quality or{' '}
                  <strong>L</strong> for low-quality with one checklist reason.
                </p>
              </div>

              {Object.values(responses).length === 0 ? (
                <div className="rounded-lg border border-dashed border-[#CBD5DC] p-5 text-center text-xs text-[#6B7D86]">
                  Your classified answers and trainer feedback will appear here as you judge Links 1
                  through 5.
                </div>
              ) : (
                EXERCISE_1_SCENARIOS.filter((sc) => responses[sc.id]).map((sc) => {
                  const r = responses[sc.id];
                  return (
                    <div key={sc.id} className="space-y-2">
                      {/* Trainee message */}
                      <div className="rounded-lg bg-[#2F3E46] p-3 text-xs text-white">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">
                            {participantName.trim() || 'You'} · Link {sc.number}
                          </span>
                          <span className="text-[#CBD5DC] font-mono tabular-nums">
                            {r.timestamp}
                          </span>
                        </div>
                        <p className="mt-1 text-[#E6ECEF]">
                          <strong>{r.verdict}</strong>
                          {r.reason ? ` — ${r.reason}` : ' — (no reason added yet)'}
                        </p>
                      </div>

                      {/* Trainer instant evaluation */}
                      <div className="rounded-lg bg-white border border-[#DCE3E7] p-3 text-xs">
                        <div className="flex items-center gap-1.5 font-semibold">
                          {r.isCorrect ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
                              <span className="text-[#15803D]">Accurate call · Rishan</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5 text-[#B91C1C]" />
                              <span className="text-[#B91C1C]">Re-check rubric · Rishan</span>
                            </>
                          )}
                        </div>
                        <p className="mt-1 text-[#3E5059] leading-relaxed">{sc.trainerFeedback}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Expected Output Bar (clean border, no border-l-4) */}
        <div className="mt-6 rounded-lg border border-[#D8E0E4] bg-[#EEF2F4] px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-[#2F3E46]">
            <strong>Expected output:</strong> Five links classified, with a reason for at least
            three.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`text-xs font-semibold tabular-nums ${
                exerciseComplete ? 'text-[#15803D]' : 'text-[#52646D]'
              }`}
            >
              {exerciseComplete ? 'Output Complete' : `${classifiedCount}/5 classified`}
            </span>
            <button
              type="button"
              onClick={onNextModule}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#2F3E46] px-4 py-2 text-xs font-semibold text-white hover:bg-[#243138] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Continue to Module 2
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
