import { useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, Search, Sliders, XCircle } from 'lucide-react';
import {
  ANCHOR_TEXT_TYPES,
  generateSimulatedReport,
  SIMULATED_DOMAIN_REPORTS,
} from '../../data/workshopData';
import { AnchorType, BacklinkProfileSnapshot } from '../../types/workshop';

interface Module2DomainsAnchorsProps {
  practiceWebsite: string;
  savedSnapshot: BacklinkProfileSnapshot | null;
  onSaveSnapshot: (snapshot: BacklinkProfileSnapshot) => void;
  onNextModule: () => void;
}

const ANCHOR_OPTIONS: AnchorType[] = [
  'Branded',
  'Naked URL',
  'Generic',
  'Partial match',
  'Exact match',
];

export function Module2DomainsAnchors({
  practiceWebsite,
  savedSnapshot,
  onSaveSnapshot,
  onNextModule,
}: Module2DomainsAnchorsProps) {
  // Simulator 2A: 1 vs 10 Referring Domains
  const [uniqueDomains, setUniqueDomains] = useState(10);

  // Simulator 2B: Anchor Text Naturalness Mixer
  const [anchorMix, setAnchorMix] = useState({
    Branded: 45,
    'Naked URL': 20,
    Generic: 15,
    'Partial match': 15,
    'Exact match': 5,
  });

  // Exercise 2: Simulated Backlink Checker
  const [domainInput, setDomainInput] = useState(
    savedSnapshot?.domain || practiceWebsite || 'www.elysiumacademy.org'
  );
  const [workingReport, setWorkingReport] = useState<BacklinkProfileSnapshot | null>(
    savedSnapshot
  );
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const mixTotal = Object.values(anchorMix).reduce((a, b) => a + b, 0) || 1;
  const exactShare = Math.round((anchorMix['Exact match'] / mixTotal) * 100);
  const brandedShare = Math.round((anchorMix.Branded / mixTotal) * 100);

  const profileHealth =
    exactShare > 15
      ? {
          status: 'Over-Optimized Risk',
          color: 'text-[#B91C1C]',
          advice:
            'Exact-match anchor share exceeds 15%. Search engines may treat repetitive keyword anchors as manipulative.',
        }
      : brandedShare < 25
      ? {
          status: 'Needs More Branded Anchors',
          color: 'text-[#B45309]',
          advice:
            'Branded anchors should hold the largest share of a natural backlink profile (aim for 40%–55%).',
        }
      : {
          status: 'Natural Anchor Profile',
          color: 'text-[#15803D]',
          advice:
            'Strong balance: Branded and Naked URL anchors dominate, with Exact Match kept rare.',
        };

  const handleRunChecker = (targetDomain?: string) => {
    const query = (targetDomain ?? domainInput).trim() || 'www.elysiumacademy.org';
    setDomainInput(query);
    setIsLoadingReport(true);
    setSavedToast(false);
    window.setTimeout(() => {
      const report = generateSimulatedReport(query);
      setWorkingReport(report);
      setIsLoadingReport(false);
    }, 280);
  };

  const handleClassifyAnchor = (anchorId: string, selectedType: AnchorType) => {
    if (!workingReport) return;
    const updatedAnchors = workingReport.anchors.map((item) =>
      item.id === anchorId
        ? {
            ...item,
            selectedType,
            isVerified: selectedType === item.correctType,
          }
        : item
    );
    setWorkingReport({
      ...workingReport,
      anchors: updatedAnchors,
    });
    setSavedToast(false);
  };

  const handleSaveToTracker = () => {
    if (!workingReport) return;
    onSaveSnapshot(workingReport);
    setSavedToast(true);
  };

  const classifiedAnchorsCount = workingReport
    ? workingReport.anchors.filter((a) => a.selectedType !== '').length
    : 0;
  const correctAnchorsCount = workingReport
    ? workingReport.anchors.filter((a) => a.isVerified).length
    : 0;

  return (
    <div className="space-y-10">
      {/* Module Banner */}
      <div className="rounded-xl bg-[#2F3E46] p-6 sm:p-8 text-white">
        <p className="text-xs font-semibold tracking-wide text-[#F5A623]">
          Module 02 <span aria-hidden="true">·</span> 20 minutes
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
          Referring Domains and Anchor Text
        </h2>
        <div className="mt-3 h-[3px] w-12 bg-[#F5A623]" />
        <p className="mt-3 max-w-2xl text-sm text-[#C8D4DA] leading-relaxed">
          Learn why ten independent websites recommending you outweigh ten repeated links from one
          website, and how to read natural anchor text ratios in a real backlink report.
        </p>
      </div>

      {/* Interactive Simulator 2A: Backlinks vs Referring Domains (Slide 12) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-[#2F3E46]">
              Backlinks vs. Referring Domains
            </h3>
            <p className="mt-1 text-sm text-[#52646D]">
              Total backlinks stay fixed at <strong>10</strong>. Drag the slider to compare 1
              referring domain against 10 distinct referring domains.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUniqueDomains(1)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold border transition-colors cursor-pointer ${
                uniqueDomains === 1
                  ? 'border-[#2F3E46] bg-[#2F3E46] text-white'
                  : 'border-[#D8E0E4] bg-[#F7F9FA] text-[#2F3E46]'
              }`}
            >
              1 Domain
            </button>
            <button
              type="button"
              onClick={() => setUniqueDomains(10)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold border transition-colors cursor-pointer ${
                uniqueDomains === 10
                  ? 'border-[#2F3E46] bg-[#2F3E46] text-white'
                  : 'border-[#D8E0E4] bg-[#F7F9FA] text-[#2F3E46]'
              }`}
            >
              10 Domains
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-lg bg-[#F7F9FA] border border-[#E6ECEF] p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[#2F3E46]">
                <label htmlFor="ref-domain-slider">Unique Referring Domains</label>
                <span className="font-mono text-base tabular-nums">{uniqueDomains} / 10</span>
              </div>
              <input
                id="ref-domain-slider"
                type="range"
                min={1}
                max={10}
                step={1}
                value={uniqueDomains}
                onChange={(e) => setUniqueDomains(Number(e.target.value))}
                className="mt-3 w-full accent-[#2F3E46] cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-[11px] font-mono text-[#6B7D86] tabular-nums">
                <span>1 domain (10 links)</span>
                <span>10 domains (1 link each)</span>
              </div>
            </div>

            <div className="rounded-lg border border-[#D8E0E4] bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#52646D]">Profile Assessment</span>
                <span
                  className={`text-xs font-semibold ${
                    uniqueDomains >= 7
                      ? 'text-[#15803D]'
                      : uniqueDomains >= 4
                      ? 'text-[#B45309]'
                      : 'text-[#B91C1C]'
                  }`}
                >
                  {uniqueDomains >= 7
                    ? 'Stronger Profile'
                    : uniqueDomains >= 4
                    ? 'Moderate Diversity'
                    : 'Low Diversity'}
                </span>
              </div>
              <p className="mt-2 text-sm text-[#3E5059] leading-relaxed">
                {uniqueDomains === 1
                  ? '10 backlinks from one website (e.g., a sidebar link repeated on 10 pages) count as only one independent vote of trust.'
                  : uniqueDomains === 10
                  ? '10 backlinks from ten different websites give search engines ten independent editorial recommendations—a much stronger profile.'
                  : `10 total backlinks spread across ${uniqueDomains} unique websites. Adding new referring domains boosts authority faster than adding duplicate links from the same site.`}
              </p>
            </div>
          </div>

          {/* Visual Node Graph */}
          <div className="lg:col-span-7 rounded-lg border border-[#E6ECEF] bg-[#F7F9FA] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-display-heading text-3xl font-bold text-[#2F3E46] tabular-nums">
                  {uniqueDomains} Referring {uniqueDomains === 1 ? 'Domain' : 'Domains'}
                </p>
                <p className="text-xs text-[#52646D] tabular-nums">
                  10 total backlinks · Average {(10 / uniqueDomains).toFixed(1)} links per domain
                </p>
              </div>
              {uniqueDomains >= 8 && (
                <span className="rounded bg-[#F5A623] px-2.5 py-1 text-xs font-bold text-[#1E292E] whitespace-nowrap">
                  Stronger Profile
                </span>
              )}
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5 py-3">
              {Array.from({ length: 10 }).map((_, index) => {
                const isUnique = index < uniqueDomains;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-1.5"
                    title={isUnique ? `Unique Website #${index + 1}` : 'Duplicate link from existing domain'}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center font-mono text-xs font-semibold tabular-nums transition-colors ${
                        isUnique
                          ? 'bg-[#2F3E46] text-white'
                          : 'bg-[#DCE3E7] text-[#6B7D86] border border-dashed border-[#9EB0B9]'
                      }`}
                    >
                      {isUnique ? index + 1 : '×'}
                    </div>
                    <span className="text-[10px] text-[#52646D] tabular-nums">
                      {isUnique ? `Site ${index + 1}` : 'Dup'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator 2B: Anchor Text Types & Distribution Lab (Slide 13) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <h3 className="text-2xl font-bold text-[#2F3E46]">Anchor Text Types & Ratio Lab</h3>
            <p className="mt-1 text-sm text-[#52646D]">
              Review the five anchor text categories and adjust the mix below to test what a natural
              profile looks like.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setAnchorMix({
                Branded: 45,
                'Naked URL': 20,
                Generic: 15,
                'Partial match': 15,
                'Exact match': 5,
              })
            }
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52646D] hover:text-[#2F3E46] cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to Recommended Mix
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#D8E0E4]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2F3E46] text-white text-xs font-semibold">
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Example</th>
                <th className="py-3 px-4 whitespace-nowrap">How much</th>
                <th className="py-3 px-4 whitespace-nowrap text-right">Simulated Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6ECEF] text-sm">
              {ANCHOR_TEXT_TYPES.map((item) => {
                const rawVal = anchorMix[item.type];
                const pct = Math.round((rawVal / mixTotal) * 100);
                return (
                  <tr key={item.type} className="bg-white">
                    <td className="py-3 px-4 font-semibold text-[#2F3E46] whitespace-nowrap">
                      {item.type}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-[#3E5059]">{item.example}</td>
                    <td className="py-3 px-4 text-xs text-[#52646D] whitespace-nowrap">
                      {item.howMuch}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-3">
                        <input
                          type="range"
                          min={0}
                          max={80}
                          value={rawVal}
                          aria-label={`${item.type} anchor weight`}
                          onChange={(e) =>
                            setAnchorMix((prev) => ({
                              ...prev,
                              [item.type]: Number(e.target.value),
                            }))
                          }
                          className="w-24 sm:w-32 accent-[#2F3E46] cursor-pointer"
                        />
                        <span className="w-10 text-right font-mono text-xs font-semibold text-[#2F3E46] tabular-nums">
                          {pct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-lg border border-[#DCE3E7] bg-[#F7F9FA] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Sliders className="h-4 w-4 text-[#2F3E46] mt-0.5 shrink-0" />
            <div>
              <p className={`text-sm font-semibold ${profileHealth.color}`}>
                {profileHealth.status}
              </p>
              <p className="mt-0.5 text-xs text-[#3E5059]">{profileHealth.advice}</p>
            </div>
          </div>
          <p className="font-mono text-xs text-[#52646D] tabular-nums whitespace-nowrap shrink-0">
            Branded {brandedShare}% · Exact {exactShare}%
          </p>
        </div>
      </section>

      {/* Hands-On Exercise 2: Read a Backlink Report (Slide 14) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E6ECEF]">
          <div>
            <p className="text-xs font-semibold text-[#B87409]">
              Exercise 2 <span aria-hidden="true">·</span> 10 minutes <span aria-hidden="true">·</span>{' '}
              Hands-On
            </p>
            <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-[#2F3E46]">
              Read a Backlink Report
            </h3>
          </div>
          <p className="text-xs text-[#52646D]">
            Simulated Backlink Checker · Inspect metrics & classify top 5 anchors
          </p>
        </div>

        {/* Domain Input Bar */}
        <div className="mt-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7D86]" />
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRunChecker();
                }}
                placeholder="Enter practice website domain (e.g., www.elysiumacademy.org)"
                className="w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] pl-10 pr-4 py-2.5 font-mono text-sm text-[#1E292E] focus:border-[#2F3E46] focus:bg-white focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRunChecker()}
              className="rounded-md bg-[#F5A623] px-5 py-2.5 text-sm font-semibold text-[#1E292E] transition-colors hover:bg-[#E09519] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Check Backlinks
            </button>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-[#52646D]">
            <span>Sample domains:</span>
            {Object.keys(SIMULATED_DOMAIN_REPORTS).map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => handleRunChecker(sample)}
                className="font-mono text-[#2F3E46] hover:text-[#B87409] underline underline-offset-4 cursor-pointer"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Empty / Populated Report */}
        {isLoadingReport ? (
          <div className="mt-6 space-y-3 animate-pulse">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-20 rounded-lg bg-[#EBEEF0]" />
              ))}
            </div>
            <div className="h-44 rounded-lg bg-[#EBEEF0]" />
          </div>
        ) : !workingReport ? (
          <div className="mt-6 rounded-lg border border-dashed border-[#CBD5DC] bg-[#F7F9FA] p-8 text-center">
            <p className="text-sm font-semibold text-[#2F3E46]">
              Run the Backlink Checker on your practice website
            </p>
            <p className="mt-1 text-xs text-[#52646D]">
              Click “Check Backlinks” above to inspect Authority Score, Total Backlinks, Referring
              Domains, and the five most common anchor texts.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {/* 4 Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-lg border border-[#DCE3E7] bg-[#F7F9FA] p-4">
                <p className="text-xs text-[#52646D]">Domain Authority Score</p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#2F3E46] tabular-nums">
                  {workingReport.authorityScore}
                  <span className="text-sm font-normal text-[#6B7D86]"> / 100</span>
                </p>
              </div>
              <div className="rounded-lg border border-[#DCE3E7] bg-[#F7F9FA] p-4">
                <p className="text-xs text-[#52646D]">Total Backlinks</p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#2F3E46] tabular-nums">
                  {workingReport.totalBacklinks.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border border-[#DCE3E7] bg-[#F7F9FA] p-4">
                <p className="text-xs text-[#52646D]">Referring Domains</p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#2F3E46] tabular-nums">
                  {workingReport.referringDomains.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border border-[#DCE3E7] bg-[#F7F9FA] p-4">
                <p className="text-xs text-[#52646D]">Dofollow Links</p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#2F3E46] tabular-nums">
                  {workingReport.dofollowPercent}%
                </p>
              </div>
            </div>

            {/* Top 5 Anchors Classification Table */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h4 className="text-lg font-bold text-[#2F3E46]">
                  Top 5 Anchor Texts for <span className="font-mono text-base">{workingReport.domain}</span>
                </h4>
                <span className="text-xs text-[#52646D] tabular-nums">
                  Classified {classifiedAnchorsCount}/5 · Verified {correctAnchorsCount}/5
                </span>
              </div>

              <div className="overflow-x-auto rounded-lg border border-[#D8E0E4]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#2F3E46] text-white text-xs font-semibold">
                      <th className="py-3 px-4">Anchor Text</th>
                      <th className="py-3 px-4 text-right whitespace-nowrap">Ref. Domains</th>
                      <th className="py-3 px-4 text-right whitespace-nowrap">Share</th>
                      <th className="py-3 px-4 whitespace-nowrap">Your Classification</th>
                      <th className="py-3 px-4 whitespace-nowrap">Check</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6ECEF] text-sm">
                    {workingReport.anchors.map((anchor) => {
                      const hasChosen = anchor.selectedType !== '';
                      return (
                        <tr key={anchor.id} className="bg-white">
                          <td className="py-3 px-4 font-mono text-xs font-medium text-[#1E292E]">
                            {anchor.anchorText}
                          </td>
                          <td className="py-3 px-4 font-mono text-xs text-right text-[#3E5059] tabular-nums">
                            {anchor.referringDomains}
                          </td>
                          <td className="py-3 px-4 font-mono text-xs text-right text-[#3E5059] tabular-nums">
                            {anchor.percentShare}%
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={anchor.selectedType}
                              onChange={(e) =>
                                handleClassifyAnchor(anchor.id, e.target.value as AnchorType)
                              }
                              aria-label={`Classify anchor text ${anchor.anchorText}`}
                              className="rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-2.5 py-1.5 text-xs font-medium text-[#1E292E] focus:border-[#2F3E46] focus:bg-white focus:outline-none"
                            >
                              <option value="">Select type...</option>
                              {ANCHOR_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-xs">
                            {!hasChosen ? (
                              <span className="text-[#86969F]">Pending</span>
                            ) : anchor.isVerified ? (
                              <span className="inline-flex items-center gap-1 font-semibold text-[#15803D]">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Correct
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 font-semibold text-[#B91C1C]">
                                <XCircle className="h-3.5 w-3.5" />
                                Try again
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleSaveToTracker}
                  disabled={classifiedAnchorsCount < 5}
                  className="rounded-md bg-[#2F3E46] px-4 py-2 text-sm font-semibold text-white hover:bg-[#243138] disabled:opacity-45 disabled:cursor-not-allowed whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Save Snapshot to Backlink Tracker
                </button>
                {savedToast && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D]">
                    <CheckCircle2 className="h-4 w-4" />
                    Profile snapshot & 5 classified anchors saved to your Backlink Tracker.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Expected Output */}
        <div className="mt-6 rounded-lg border border-[#D8E0E4] bg-[#EEF2F4] px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-[#2F3E46]">
            <strong>Expected output:</strong> A filled profile snapshot with five classified
            anchors.
          </p>
          <button
            type="button"
            onClick={onNextModule}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#2F3E46] px-4 py-2 text-xs font-semibold text-white hover:bg-[#243138] whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
          >
            Continue to Break & Module 3
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}
