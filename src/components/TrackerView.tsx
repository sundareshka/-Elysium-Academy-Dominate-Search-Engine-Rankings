import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import {
  CompetitorOpportunity,
  ModuleId,
  SubmissionRecord,
  WorkshopState,
} from '../types/workshop';

interface TrackerViewProps {
  state: WorkshopState;
  onAddManualSubmission: (record: SubmissionRecord) => void;
  onToggleSubmissionStatus: (id: string) => void;
  onDeleteSubmission: (id: string) => void;
  onUpdateOpportunityStatus: (id: string, status: CompetitorOpportunity['status']) => void;
  onDeleteOpportunity: (id: string) => void;
  onOpenModule: (moduleId: ModuleId) => void;
}

type TrackerTab = 'snapshot' | 'submissions' | 'opportunities';

export function TrackerView({
  state,
  onAddManualSubmission,
  onToggleSubmissionStatus,
  onDeleteSubmission,
  onUpdateOpportunityStatus,
  onDeleteOpportunity,
  onOpenModule,
}: TrackerViewProps) {
  const [activeTab, setActiveTab] = useState<TrackerTab>('submissions');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddRow, setShowAddRow] = useState(false);

  const [newPlatform, setNewPlatform] = useState('');
  const [newType, setNewType] =
    useState<SubmissionRecord['opportunityType']>('Relevant directory');
  const [newUrl, setNewUrl] = useState('');
  const [newStatus, setNewStatus] = useState<'Live' | 'Pending'>('Pending');

  const handleAddCustomSubmission = () => {
    if (!newPlatform.trim()) return;
    onAddManualSubmission({
      id: `manual-${Date.now()}`,
      platform: newPlatform.trim(),
      opportunityType: newType,
      profileUrl: newUrl.trim() || `https://${newPlatform.trim().toLowerCase().replace(/\s+/g, '')}.com`,
      submittedName: state.brandKit.businessName,
      submittedAddress: state.brandKit.address,
      submittedPhone: state.brandKit.phone,
      submittedWebsite: state.brandKit.websiteUrl,
      status: newStatus,
      napConsistent: true,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setNewPlatform('');
    setNewUrl('');
    setShowAddRow(false);
  };

  const handleExportCsv = () => {
    const lines: string[] = [];
    lines.push('SECTION,ITEM,TYPE_OR_TOPIC,URL_OR_ANCHOR,METRIC_OR_NAP,STATUS');

    if (state.profileSnapshot) {
      lines.push(
        `Profile Snapshot,"${state.profileSnapshot.domain}",Authority Score ${state.profileSnapshot.authorityScore},Backlinks ${state.profileSnapshot.totalBacklinks},Referring Domains ${state.profileSnapshot.referringDomains},Captured`
      );
      state.profileSnapshot.anchors.forEach((a) => {
        lines.push(
          `Anchor Text,"${a.anchorText.replace(/"/g, '""')}","${a.selectedType || 'Unclassified'}","${a.referringDomains} domains","${a.percentShare}% share",${a.isVerified ? 'Verified' : 'Review'}`
        );
      });
    }

    state.submissions.forEach((s) => {
      lines.push(
        `Submission,"${s.platform}","${s.opportunityType}","${s.profileUrl}","NAP ${s.napConsistent ? 'Consistent' : 'Mismatch'}",${s.status}`
      );
    });

    state.competitorOpportunities.forEach((o) => {
      lines.push(
        `Competitor Opportunity,"${o.domain}","${o.topic.replace(/"/g, '""')}","${o.isBoth ? 'Both Competitors' : 'Single Competitor'}","DR ${o.domainRating}",${o.status}`
      );
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'backlink-tracker-elysium-academy.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredSubmissions = state.submissions.filter(
    (s) =>
      s.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.opportunityType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.profileUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOpportunities = state.competitorOpportunities.filter(
    (o) =>
      o.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#D8E0E4]">
        <div>
          <p className="text-xs font-semibold text-[#B87409]">Takeaway 01 · Live Workshop Sheet</p>
          <h1 className="mt-1 text-4xl font-bold text-[#2F3E46]">Backlink Tracker</h1>
          <p className="mt-1 text-sm text-[#52646D]">
            Automatically synced with Exercises 2, 3, and 4. Export as CSV to continue tracking
            after the workshop.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 rounded-md bg-[#2F3E46] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#243138] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
        >
          <Download className="h-4 w-4" />
          Download CSV
        </button>
      </div>

      {/* Summary Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#D8E0E4] bg-white p-5">
          <p className="text-xs text-[#52646D]">Audited Domain</p>
          <p className="mt-1 font-mono text-base font-bold text-[#2F3E46] truncate">
            {state.profileSnapshot?.domain || state.practiceWebsite || 'Not audited'}
          </p>
        </div>
        <div className="rounded-xl border border-[#D8E0E4] bg-white p-5">
          <p className="text-xs text-[#52646D]">Classified Anchors</p>
          <p className="mt-1 font-mono text-2xl font-bold text-[#2F3E46] tabular-nums">
            {state.profileSnapshot
              ? state.profileSnapshot.anchors.filter((a) => a.selectedType !== '').length
              : 0}
            <span className="text-sm font-normal text-[#6B7D86]"> / 5</span>
          </p>
        </div>
        <div className="rounded-xl border border-[#D8E0E4] bg-white p-5">
          <p className="text-xs text-[#52646D]">Submissions Logged</p>
          <p className="mt-1 font-mono text-2xl font-bold text-[#2F3E46] tabular-nums">
            {state.submissions.length}
          </p>
        </div>
        <div className="rounded-xl border border-[#D8E0E4] bg-white p-5">
          <p className="text-xs text-[#52646D]">Competitor Opportunities</p>
          <p className="mt-1 font-mono text-2xl font-bold text-[#2F3E46] tabular-nums">
            {state.competitorOpportunities.length}
          </p>
        </div>
      </div>

      {/* Tab Controls & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EBEEF0] overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('snapshot')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'snapshot'
                ? 'bg-white text-[#2F3E46] shadow-sm'
                : 'text-[#52646D] hover:text-[#2F3E46]'
            }`}
          >
            Profile Snapshot ({state.profileSnapshot ? 5 : 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'submissions'
                ? 'bg-white text-[#2F3E46] shadow-sm'
                : 'text-[#52646D] hover:text-[#2F3E46]'
            }`}
          >
            Submissions ({state.submissions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('opportunities')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'opportunities'
                ? 'bg-white text-[#2F3E46] shadow-sm'
                : 'text-[#52646D] hover:text-[#2F3E46]'
            }`}
          >
            Opportunities ({state.competitorOpportunities.length})
          </button>
        </div>

        {activeTab !== 'snapshot' && (
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7D86]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter rows..."
                className="w-full rounded-md border border-[#CBD5DC] bg-white pl-9 pr-3 py-2 text-xs text-[#1E292E] focus:border-[#2F3E46] focus:outline-none"
              />
            </div>

            {activeTab === 'submissions' && (
              <button
                type="button"
                onClick={() => setShowAddRow((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#CBD5DC] bg-white px-3.5 py-2 text-xs font-semibold text-[#2F3E46] hover:bg-[#F7F9FA] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Row
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tab 1: Profile Snapshot */}
      {activeTab === 'snapshot' && (
        <div className="rounded-xl border border-[#D8E0E4] bg-white p-6">
          {!state.profileSnapshot ? (
            <div className="py-10 text-center space-y-3">
              <p className="text-base font-bold text-[#2F3E46]">No profile snapshot recorded yet</p>
              <p className="text-sm text-[#52646D] max-w-md mx-auto">
                Run Exercise 2 in Module 2 to inspect a website’s Authority Score, Referring
                Domains, and classify its five most common anchor texts.
              </p>
              <button
                type="button"
                onClick={() => onOpenModule('module2')}
                className="inline-flex items-center gap-1.5 rounded-md bg-[#2F3E46] px-4 py-2 text-xs font-semibold text-white hover:bg-[#243138] cursor-pointer"
              >
                Go to Module 2 (Exercise 2)
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E6ECEF]">
                <div>
                  <p className="text-xs text-[#52646D]">Domain Snapshot</p>
                  <p className="font-mono text-lg font-bold text-[#2F3E46]">
                    {state.profileSnapshot.domain}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-xs tabular-nums">
                  <div>
                    <span className="text-[#52646D]">Authority Score: </span>
                    <strong className="font-mono text-[#2F3E46]">
                      {state.profileSnapshot.authorityScore}/100
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#52646D]">Backlinks: </span>
                    <strong className="font-mono text-[#2F3E46]">
                      {state.profileSnapshot.totalBacklinks.toLocaleString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#52646D]">Referring Domains: </span>
                    <strong className="font-mono text-[#2F3E46]">
                      {state.profileSnapshot.referringDomains.toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-[#D8E0E4]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#2F3E46] text-white text-xs font-semibold">
                      <th className="py-3 px-4">Anchor Text</th>
                      <th className="py-3 px-4 text-right whitespace-nowrap">Ref. Domains</th>
                      <th className="py-3 px-4 text-right whitespace-nowrap">Share</th>
                      <th className="py-3 px-4 whitespace-nowrap">Classified Type</th>
                      <th className="py-3 px-4 whitespace-nowrap">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6ECEF] text-sm">
                    {state.profileSnapshot.anchors.map((a) => (
                      <tr key={a.id} className="bg-white">
                        <td className="py-3 px-4 font-mono text-xs text-[#1E292E]">
                          {a.anchorText}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-right tabular-nums text-[#3E5059]">
                          {a.referringDomains}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-right tabular-nums text-[#3E5059]">
                          {a.percentShare}%
                        </td>
                        <td className="py-3 px-4 text-xs font-semibold text-[#2F3E46]">
                          {a.selectedType || 'Not classified'}
                        </td>
                        <td className="py-3 px-4 text-xs">
                          {a.isVerified ? (
                            <span className="inline-flex items-center gap-1 font-semibold text-[#15803D]">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Accurate
                            </span>
                          ) : (
                            <span className="text-[#B45309] font-medium">
                              Expected: {a.correctType}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Submissions */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          {showAddRow && (
            <div className="rounded-xl border border-[#D8E0E4] bg-white p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <div className="md:col-span-3">
                <label htmlFor="manual-plat" className="block text-xs font-semibold text-[#2F3E46]">
                  Platform Name
                </label>
                <input
                  id="manual-plat"
                  type="text"
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  placeholder="e.g., Shiksha, Behance"
                  className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-3 py-2 text-xs focus:border-[#2F3E46] focus:bg-white focus:outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <label htmlFor="manual-type" className="block text-xs font-semibold text-[#2F3E46]">
                  Opportunity Type
                </label>
                <select
                  id="manual-type"
                  value={newType}
                  onChange={(e) =>
                    setNewType(e.target.value as SubmissionRecord['opportunityType'])
                  }
                  className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-3 py-2 text-xs focus:border-[#2F3E46] focus:bg-white focus:outline-none"
                >
                  <option value="Professional profile">Professional profile</option>
                  <option value="Business listing">Business listing</option>
                  <option value="Relevant directory">Relevant directory</option>
                  <option value="Institutional page">Institutional page</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label htmlFor="manual-url" className="block text-xs font-semibold text-[#2F3E46]">
                  Profile / Listing URL
                </label>
                <input
                  id="manual-url"
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://..."
                  className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-3 py-2 font-mono text-xs focus:border-[#2F3E46] focus:bg-white focus:outline-none"
                />
              </div>
              <div className="md:col-span-3 flex items-center gap-2">
                <select
                  value={newStatus}
                  aria-label="Submission status"
                  onChange={(e) => setNewStatus(e.target.value as 'Live' | 'Pending')}
                  className="rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-2.5 py-2 text-xs focus:border-[#2F3E46] focus:outline-none"
                >
                  <option value="Live">Live</option>
                  <option value="Pending">Pending</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddCustomSubmission}
                  className="flex-1 rounded-md bg-[#2F3E46] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#243138] whitespace-nowrap cursor-pointer"
                >
                  Save Row
                </button>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-[#D8E0E4] bg-white overflow-hidden">
            {filteredSubmissions.length === 0 ? (
              <div className="p-10 text-center space-y-3">
                <p className="text-base font-bold text-[#2F3E46]">No submissions logged yet</p>
                <p className="text-sm text-[#52646D] max-w-md mx-auto">
                  Complete Exercise 3 in Module 3 to record your first profile and business listing
                  with verified NAP consistency, or click “Add Row” above.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenModule('module3')}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#2F3E46] px-4 py-2 text-xs font-semibold text-white hover:bg-[#243138] cursor-pointer"
                >
                  Go to Module 3 (Exercise 3)
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#2F3E46] text-white text-xs font-semibold">
                      <th className="py-3 px-4">Platform</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Profile / Listing URL</th>
                      <th className="py-3 px-4 whitespace-nowrap">NAP Check</th>
                      <th className="py-3 px-4 whitespace-nowrap">Status</th>
                      <th className="py-3 px-4 text-right whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6ECEF] text-sm">
                    {filteredSubmissions.map((sub) => (
                      <tr key={sub.id} className="bg-white hover:bg-[#F7F9FA]">
                        <td className="py-3 px-4 font-semibold text-[#2F3E46] whitespace-nowrap">
                          {sub.platform}
                        </td>
                        <td className="py-3 px-4 text-xs text-[#52646D] whitespace-nowrap">
                          {sub.opportunityType}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-[#3E5059] max-w-[260px] truncate">
                          {sub.profileUrl}
                        </td>
                        <td className="py-3 px-4 text-xs whitespace-nowrap">
                          <span
                            className={`font-semibold ${
                              sub.napConsistent ? 'text-[#15803D]' : 'text-[#B45309]'
                            }`}
                          >
                            {sub.napConsistent ? 'Consistent' : 'Check NAP'}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => onToggleSubmissionStatus(sub.id)}
                            className={`text-xs font-semibold underline underline-offset-4 cursor-pointer ${
                              sub.status === 'Live' ? 'text-[#15803D]' : 'text-[#B45309]'
                            }`}
                            title="Click to toggle Live / Pending status"
                          >
                            {sub.status}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => onDeleteSubmission(sub.id)}
                            aria-label={`Remove ${sub.platform}`}
                            className="inline-flex items-center justify-center rounded p-1.5 text-[#6B7D86] hover:bg-[#FEF2F2] hover:text-[#B91C1C] cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Competitor Opportunities */}
      {activeTab === 'opportunities' && (
        <div className="rounded-xl border border-[#D8E0E4] bg-white overflow-hidden">
          {filteredOpportunities.length === 0 ? (
            <div className="p-10 text-center space-y-3">
              <p className="text-base font-bold text-[#2F3E46]">
                No competitor opportunities saved yet
              </p>
              <p className="text-sm text-[#52646D] max-w-md mx-auto">
                Run Exercise 4 in Module 4 to find domains linking to both competitors, filter out
                low-quality link farms, and send 5–10 vetted targets here.
              </p>
              <button
                type="button"
                onClick={() => onOpenModule('module4')}
                className="inline-flex items-center gap-1.5 rounded-md bg-[#2F3E46] px-4 py-2 text-xs font-semibold text-white hover:bg-[#243138] cursor-pointer"
              >
                Go to Module 4 (Exercise 4)
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#2F3E46] text-white text-xs font-semibold">
                    <th className="py-3 px-4">Referring Domain</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">DR</th>
                    <th className="py-3 px-4 whitespace-nowrap">Overlap</th>
                    <th className="py-3 px-4">Topic & Placement</th>
                    <th className="py-3 px-4 whitespace-nowrap">Status</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6ECEF] text-sm">
                  {filteredOpportunities.map((opp) => (
                    <tr key={opp.id} className="bg-white hover:bg-[#F7F9FA]">
                      <td className="py-3 px-4 font-mono text-xs font-semibold text-[#1E292E] whitespace-nowrap">
                        {opp.domain}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs font-semibold text-right tabular-nums text-[#2F3E46]">
                        {opp.domainRating}
                      </td>
                      <td className="py-3 px-4 text-xs whitespace-nowrap">
                        <span className={opp.isBoth ? 'font-semibold text-[#B87409]' : 'text-[#52646D]'}>
                          {opp.isBoth ? 'Both Competitors' : 'Single Competitor'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-[#3E5059]">
                        <span className="font-medium text-[#1E292E]">{opp.topic}</span> ·{' '}
                        {opp.placement}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <select
                          value={opp.status}
                          aria-label={`Status for ${opp.domain}`}
                          onChange={(e) =>
                            onUpdateOpportunityStatus(
                              opp.id,
                              e.target.value as CompetitorOpportunity['status']
                            )
                          }
                          className="rounded-md border border-[#CBD5DC] bg-[#F7F9FA] px-2.5 py-1 text-xs font-medium text-[#1E292E] focus:border-[#2F3E46] focus:outline-none"
                        >
                          <option value="Target">Target</option>
                          <option value="Outreach Sent">Outreach Sent</option>
                          <option value="Acquired">Acquired</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onDeleteOpportunity(opp.id)}
                          aria-label={`Delete ${opp.domain}`}
                          className="inline-flex items-center justify-center rounded p-1.5 text-[#6B7D86] hover:bg-[#FEF2F2] hover:text-[#B91C1C] cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
