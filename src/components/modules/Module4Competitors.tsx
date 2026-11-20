import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Filter,
  Search,
  Trash2,
  Undo2,
} from 'lucide-react';
import { COMPETITOR_PRESETS, KEY_TAKEAWAYS } from '../../data/workshopData';
import { CompetitorOpportunity, MainView } from '../../types/workshop';

interface Module4CompetitorsProps {
  savedOpportunities: CompetitorOpportunity[];
  onExportOpportunities: (keyword: string, opportunities: CompetitorOpportunity[]) => void;
  onNavigate: (view: MainView) => void;
}

export function Module4Competitors({
  savedOpportunities,
  onExportOpportunities,
  onNavigate,
}: Module4CompetitorsProps) {
  const [presetIdx, setPresetIdx] = useState(0);
  const [viewFilter, setViewFilter] = useState<'all' | 'both' | 'kept'>('all');
  const [removedIds, setRemovedIds] = useState<Record<string, boolean>>({});
  const [exportedMessage, setExportedMessage] = useState('');

  const preset = COMPETITOR_PRESETS[presetIdx];

  const handleSelectPreset = (idx: number) => {
    setPresetIdx(idx);
    setRemovedIds({});
    setExportedMessage('');
  };

  const toggleRemove = (id: string) => {
    setRemovedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setExportedMessage('');
  };

  const keptCandidates = preset.candidates.filter((c) => !removedIds[c.id]);
  const unremovedSpam = keptCandidates.filter((c) => c.isLowQuality);
  const bothCount = preset.candidates.filter((c) => c.linksToCompA && c.linksToCompB).length;
  const keptCleanCount = keptCandidates.filter((c) => !c.isLowQuality).length;

  const visibleCandidates = preset.candidates.filter((c) => {
    if (viewFilter === 'both') return c.linksToCompA && c.linksToCompB;
    if (viewFilter === 'kept') return !removedIds[c.id];
    return true;
  });

  const handleExportToTracker = () => {
    const opportunities: CompetitorOpportunity[] = keptCandidates.map((c) => ({
      id: `opp-${presetIdx}-${c.id}`,
      domain: c.domain,
      domainRating: c.domainRating,
      topic: c.topic,
      linksToCompA: c.linksToCompA,
      linksToCompB: c.linksToCompB,
      isBoth: c.linksToCompA && c.linksToCompB,
      placement: c.placement,
      qualityPass: !c.isLowQuality,
      checklistNotes: c.qualityReason,
      status: 'Target',
    }));

    onExportOpportunities(preset.keyword, opportunities);
    setExportedMessage(
      `${opportunities.length} checked competitor opportunities saved to your Backlink Tracker & Week 2 plan.`
    );
  };

  return (
    <div className="space-y-10">
      {/* Module 4 Banner (Slide 20) */}
      <div className="rounded-xl bg-[#2F3E46] p-6 sm:p-8 text-white">
        <p className="text-xs font-semibold tracking-wide text-[#F5A623]">
          Module 04 <span aria-hidden="true">·</span> 12 minutes
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
          Competitor Analysis and Strategy
        </h2>
        <div className="mt-3 h-[3px] w-12 bg-[#F5A623]" />
        <p className="mt-3 max-w-2xl text-sm text-[#C8D4DA] leading-relaxed">
          Find websites that already link to two similar competitors—but not to you. Filter every
          target through the five-point checklist to build your shortlist for Week 2.
        </p>
      </div>

      {/* Find the Link Gap Visual Diagram (Slide 21) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white p-6 sm:p-7">
        <h3 className="text-2xl font-bold text-[#2F3E46]">Find the Link Gap</h3>
        <p className="mt-1 text-sm text-[#52646D]">
          If a website links to two competitors in your niche, it is already open to covering
          businesses like yours.
        </p>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-lg border border-[#DCE3E7] bg-[#F7F9FA] p-4">
              <div className="flex items-center justify-between">
                <p className="font-display-heading text-xl font-bold text-[#2F3E46]">Competitor A</p>
                <span className="font-mono text-xs text-[#52646D] tabular-nums">
                  DR {preset.compA.dr} · {preset.compA.referringDomains} domains
                </span>
              </div>
              <p className="mt-1 text-xs text-[#52646D]">
                {preset.compA.name} (<span className="font-mono">{preset.compA.domain}</span>)
              </p>
            </div>

            <div className="rounded-lg border border-[#DCE3E7] bg-[#F7F9FA] p-4">
              <div className="flex items-center justify-between">
                <p className="font-display-heading text-xl font-bold text-[#2F3E46]">Competitor B</p>
                <span className="font-mono text-xs text-[#52646D] tabular-nums">
                  DR {preset.compB.dr} · {preset.compB.referringDomains} domains
                </span>
              </div>
              <p className="mt-1 text-xs text-[#52646D]">
                {preset.compB.name} (<span className="font-mono">{preset.compB.domain}</span>)
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 flex justify-center py-1">
            <ArrowRight className="h-7 w-7 text-[#F5A623] rotate-90 lg:rotate-0" />
          </div>

          <div className="lg:col-span-5 rounded-lg bg-[#2F3E46] p-6 text-white">
            <p className="text-xs font-semibold text-[#F5A623]">Overlap Intersection</p>
            <h4 className="mt-1 text-2xl font-bold text-white">Your First Targets</h4>
            <p className="mt-2 text-sm text-[#D5DFE4] leading-relaxed">
              Websites that link to <strong>both</strong> Competitor A and Competitor B, but not to
              you yet.
            </p>
            <p className="mt-4 pt-3 border-t border-white/15 font-mono text-xs text-[#F5A623] tabular-nums">
              {bothCount} shared domains detected · Filter every target with the 5-point checklist
            </p>
          </div>
        </div>
      </section>

      {/* Hands-On Exercise 4: Competitor Check Lab (Slide 22) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E6ECEF]">
          <div>
            <p className="text-xs font-semibold text-[#B87409]">
              Exercise 4 <span aria-hidden="true">·</span> 10 minutes <span aria-hidden="true">·</span>{' '}
              Demo and Hands-On
            </p>
            <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-[#2F3E46]">
              Competitor Link-Gap Check
            </h3>
          </div>
          <span className="text-xs text-[#52646D] tabular-nums">
            Clean Targets Kept: <strong className="text-[#2F3E46]">{keptCleanCount}</strong>{' '}
            <span aria-hidden="true">·</span> Low-Quality Remaining:{' '}
            <strong className={unremovedSpam.length > 0 ? 'text-[#B91C1C]' : 'text-[#15803D]'}>
              {unremovedSpam.length}
            </strong>
          </span>
        </div>

        {/* Keyword Selector & View Filter */}
        <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52646D]">
              <Search className="h-3.5 w-3.5" />
              Main Search Term:
            </span>
            {COMPETITOR_PRESETS.map((p, idx) => (
              <button
                key={p.keyword}
                type="button"
                onClick={() => handleSelectPreset(idx)}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  presetIdx === idx
                    ? 'border-[#2F3E46] bg-[#2F3E46] text-white'
                    : 'border-[#CBD5DC] bg-[#F7F9FA] text-[#2F3E46] hover:bg-[#EBEEF0]'
                }`}
              >
                “{p.keyword}”
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EBEEF0] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewFilter === 'all' ? 'bg-white text-[#2F3E46] font-semibold shadow-sm' : 'text-[#52646D]'
              }`}
            >
              All ({preset.candidates.length})
            </button>
            <button
              type="button"
              onClick={() => setViewFilter('both')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewFilter === 'both' ? 'bg-white text-[#2F3E46] font-semibold shadow-sm' : 'text-[#52646D]'
              }`}
            >
              Links to Both ({bothCount})
            </button>
            <button
              type="button"
              onClick={() => setViewFilter('kept')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewFilter === 'kept' ? 'bg-white text-[#2F3E46] font-semibold shadow-sm' : 'text-[#52646D]'
              }`}
            >
              Kept ({keptCandidates.length})
            </button>
          </div>
        </div>

        {/* Checklist Warning Banner if spam domains are still kept */}
        {unremovedSpam.length > 0 ? (
          <div className="mt-4 rounded-lg border border-[#F5C2C7] bg-[#FEF2F2] p-3.5 flex items-start gap-2.5 text-xs text-[#991B1B]">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              <strong>Apply Step 5 (5-Point Checklist):</strong> {unremovedSpam.length} low-quality
              referring {unremovedSpam.length === 1 ? 'domain is' : 'domains are'} still in your
              kept list. Inspect the topic & placement columns below and click{' '}
              <strong>Remove</strong> on spammy or unrelated sites before exporting.
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-[#BBF7D0] bg-[#F2FBF5] p-3.5 flex items-start gap-2.5 text-xs text-[#15803D]">
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              <strong>Checklist Filter Clean:</strong> All low-quality link farms have been removed.
              You have {keptCleanCount} vetted competitor opportunities ready for your Backlink
              Tracker.
            </p>
          </div>
        )}

        {/* Competitor Referring Domains Table */}
        <div className="mt-4 overflow-x-auto rounded-lg border border-[#D8E0E4]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2F3E46] text-white text-xs font-semibold">
                <th className="py-3 px-4">Referring Domain</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">DR</th>
                <th className="py-3 px-4 whitespace-nowrap">Links To</th>
                <th className="py-3 px-4">Topic & Placement Inspection</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">5-Point Filter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6ECEF] text-sm">
              {visibleCandidates.map((item) => {
                const isRemoved = Boolean(removedIds[item.id]);
                const isBoth = item.linksToCompA && item.linksToCompB;
                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isRemoved ? 'bg-[#F7F9FA] opacity-55' : 'bg-white hover:bg-[#F7F9FA]/70'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <p
                        className={`font-mono text-xs font-semibold ${
                          isRemoved ? 'line-through text-[#6B7D86]' : 'text-[#1E292E]'
                        }`}
                      >
                        {item.domain}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#52646D]">
                        {item.isLowQuality ? 'Flag: Low-Quality Signal' : 'Quality Candidate'}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-right text-[#2F3E46] tabular-nums">
                      {item.domainRating}
                    </td>
                    <td className="py-3.5 px-4 text-xs whitespace-nowrap">
                      {isBoth ? (
                        <span className="font-semibold text-[#B87409]">Both A & B</span>
                      ) : item.linksToCompA ? (
                        <span className="text-[#52646D]">Comp A only</span>
                      ) : (
                        <span className="text-[#52646D]">Comp B only</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <p className="font-medium text-[#1E292E]">{item.topic}</p>
                      <p className="mt-0.5 text-[#52646D]">
                        {item.placement} · {item.qualityReason}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => toggleRemove(item.id)}
                        className={`inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                          isRemoved
                            ? 'border-[#CBD5DC] bg-white text-[#2F3E46] hover:bg-[#EBEEF0]'
                            : item.isLowQuality
                            ? 'border-[#B91C1C] bg-[#FEF2F2] text-[#B91C1C] hover:bg-[#B91C1C] hover:text-white'
                            : 'border-[#CBD5DC] bg-white text-[#52646D] hover:text-[#B91C1C] hover:border-[#B91C1C]'
                        }`}
                      >
                        {isRemoved ? (
                          <>
                            <Undo2 className="h-3.5 w-3.5" />
                            Restore
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleExportToTracker}
            disabled={keptCandidates.length === 0}
            className="inline-flex items-center gap-2 rounded-md bg-[#F5A623] px-5 py-2.5 text-sm font-semibold text-[#1E292E] transition-colors hover:bg-[#E09519] disabled:opacity-45 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Filter className="h-4 w-4" />
            Save {keptCandidates.length} Checked Opportunities to Tracker
          </button>

          {exportedMessage && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D]">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {exportedMessage}
            </span>
          )}
        </div>

        {/* Expected Output */}
        <div className="mt-6 rounded-lg border border-[#D8E0E4] bg-[#EEF2F4] px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-[#2F3E46]">
            <strong>Expected output:</strong> A list of 5 to 10 checked opportunities.
          </p>
          <span
            className={`text-xs font-semibold tabular-nums ${
              savedOpportunities.length >= 5 ? 'text-[#15803D]' : 'text-[#52646D]'
            }`}
          >
            {savedOpportunities.length >= 5
              ? `${savedOpportunities.length} opportunities saved`
              : 'Filter & save to tracker'}
          </span>
        </div>
      </section>

      {/* Seven Key Takeaways (Slide 24) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white p-6 sm:p-7">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-[#2F3E46]">Seven Key Takeaways</h3>
          <div className="mt-1.5 h-[3px] w-10 bg-[#F5A623]" />
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#2F3E46]">
          {KEY_TAKEAWAYS.map((point, index) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-lg bg-[#F7F9FA] border border-[#E6ECEF] p-3.5"
            >
              <span className="font-display-heading text-lg font-bold text-[#B87409] tabular-nums leading-none mt-0.5">
                0{index + 1}
              </span>
              <span className="leading-snug">{point}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 pt-5 border-t border-[#E6ECEF] flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#52646D]">
            Ready to review your filled deliverables and claim your Elysium Academy e-certificate?
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('tracker')}
              className="rounded-md border border-[#CBD5DC] bg-white px-4 py-2 text-xs font-semibold text-[#2F3E46] hover:bg-[#F7F9FA] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Review Backlink Tracker
            </button>
            <button
              type="button"
              onClick={() => onNavigate('plan')}
              className="rounded-md border border-[#CBD5DC] bg-white px-4 py-2 text-xs font-semibold text-[#2F3E46] hover:bg-[#F7F9FA] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Build 30-Day Plan
            </button>
            <button
              type="button"
              onClick={() => onNavigate('certificate')}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#2F3E46] px-4 py-2 text-xs font-semibold text-white hover:bg-[#243138] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Assessment & Certificate
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
