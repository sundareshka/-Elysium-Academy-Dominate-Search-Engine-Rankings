import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Coffee,
  ShieldAlert,
} from 'lucide-react';
import { OPPORTUNITY_TYPES, SUBMISSION_PLATFORMS } from '../../data/workshopData';
import { BrandKit, SubmissionRecord } from '../../types/workshop';

interface Module3SubmissionsProps {
  brandKit: BrandKit;
  submissions: SubmissionRecord[];
  onUpdateBrandKit: (kit: BrandKit) => void;
  onAddSubmission: (record: SubmissionRecord) => void;
  onNextModule: () => void;
}

function normalizeNap(val: string): string {
  return val.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function Module3Submissions({
  brandKit,
  submissions,
  onUpdateBrandKit,
  onAddSubmission,
  onNextModule,
}: Module3SubmissionsProps) {
  const [selectedOppIdx, setSelectedOppIdx] = useState(0);
  const [strategyMode, setStrategyMode] = useState<'do' | 'avoid'>('do');

  // Exercise 3 form state
  const [submissionSlot, setSubmissionSlot] = useState<'profile' | 'listing'>('profile');
  const [selectedPlatformName, setSelectedPlatformName] = useState(
    SUBMISSION_PLATFORMS.profiles[0].name
  );
  const [formName, setFormName] = useState(brandKit.businessName);
  const [formWebsite, setFormWebsite] = useState(brandKit.websiteUrl);
  const [formAddress, setFormAddress] = useState(brandKit.address);
  const [formPhone, setFormPhone] = useState(brandKit.phone);
  const [formBio, setFormBio] = useState(brandKit.shortBio);
  const [lastLoggedMsg, setLastLoggedMsg] = useState('');

  const availablePlatforms =
    submissionSlot === 'profile' ? SUBMISSION_PLATFORMS.profiles : SUBMISSION_PLATFORMS.listings;
  const currentPlatform =
    availablePlatforms.find((p) => p.name === selectedPlatformName) ?? availablePlatforms[0];

  const nameMatches = normalizeNap(formName) === normalizeNap(brandKit.businessName);
  const addressMatches = normalizeNap(formAddress) === normalizeNap(brandKit.address);
  const phoneMatches = normalizeNap(formPhone) === normalizeNap(brandKit.phone);
  const isNapConsistent = nameMatches && addressMatches && phoneMatches;

  const isFormComplete =
    formName.trim().length > 1 &&
    formWebsite.trim().length > 4 &&
    formAddress.trim().length > 5 &&
    formPhone.trim().length > 6 &&
    formBio.trim().length > 10;

  const handleSwitchSlot = (slot: 'profile' | 'listing') => {
    setSubmissionSlot(slot);
    const list = slot === 'profile' ? SUBMISSION_PLATFORMS.profiles : SUBMISSION_PLATFORMS.listings;
    setSelectedPlatformName(list[0].name);
    setLastLoggedMsg('');
  };

  const handleSyncFromBrandKit = () => {
    setFormName(brandKit.businessName);
    setFormWebsite(brandKit.websiteUrl);
    setFormAddress(brandKit.address);
    setFormPhone(brandKit.phone);
    setFormBio(brandKit.shortBio);
  };

  const handleRecordSubmission = () => {
    if (!isFormComplete) return;
    const slug = formName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const record: SubmissionRecord = {
      id: `sub-${Date.now()}`,
      platform: currentPlatform.name,
      opportunityType: currentPlatform.type,
      profileUrl: `${currentPlatform.urlPrefix}${slug || 'profile'}`,
      submittedName: formName.trim(),
      submittedAddress: formAddress.trim(),
      submittedPhone: formPhone.trim(),
      submittedWebsite: formWebsite.trim(),
      status: currentPlatform.instantLive ? 'Live' : 'Pending',
      napConsistent: isNapConsistent,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onAddSubmission(record);
    setLastLoggedMsg(
      `${currentPlatform.name} submission recorded (${record.status}) in your Backlink Tracker.`
    );

    if (submissionSlot === 'profile' && submissions.length === 0) {
      setSubmissionSlot('listing');
      setSelectedPlatformName(SUBMISSION_PLATFORMS.listings[0].name);
    }
  };

  return (
    <div className="space-y-10">
      {/* 5-Minute Break & Brand Kit Prep Card (Slide 15) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-[#EEF2F4] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Coffee className="h-5 w-5 text-[#B87409] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#B87409]">
                5-Minute Break Prep <span aria-hidden="true">·</span> Back at 11:50 AM
              </p>
              <h3 className="text-xl font-bold text-[#2F3E46]">
                Your Master Brand Kit (NAP Reference)
              </h3>
              <p className="mt-0.5 text-xs text-[#3E5059]">
                Keep your short bio, website URL, and exact Name, Address, and Phone (NAP) ready
                here. Every listing you submit in Exercise 3 will be checked against these details.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label htmlFor="kit-name" className="block text-xs font-semibold text-[#2F3E46]">
              Business / Brand Name
            </label>
            <input
              id="kit-name"
              type="text"
              value={brandKit.businessName}
              onChange={(e) => onUpdateBrandKit({ ...brandKit, businessName: e.target.value })}
              className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-white px-3 py-2 text-xs text-[#1E292E] focus:border-[#2F3E46] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="kit-url" className="block text-xs font-semibold text-[#2F3E46]">
              Website URL
            </label>
            <input
              id="kit-url"
              type="text"
              value={brandKit.websiteUrl}
              onChange={(e) => onUpdateBrandKit({ ...brandKit, websiteUrl: e.target.value })}
              className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-white px-3 py-2 font-mono text-xs text-[#1E292E] focus:border-[#2F3E46] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="kit-address" className="block text-xs font-semibold text-[#2F3E46]">
              Street Address
            </label>
            <input
              id="kit-address"
              type="text"
              value={brandKit.address}
              onChange={(e) => onUpdateBrandKit({ ...brandKit, address: e.target.value })}
              className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-white px-3 py-2 text-xs text-[#1E292E] focus:border-[#2F3E46] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="kit-phone" className="block text-xs font-semibold text-[#2F3E46]">
              Phone Number
            </label>
            <input
              id="kit-phone"
              type="text"
              value={brandKit.phone}
              onChange={(e) => onUpdateBrandKit({ ...brandKit, phone: e.target.value })}
              className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-white px-3 py-2 font-mono text-xs text-[#1E292E] focus:border-[#2F3E46] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Module 3 Banner (Slide 16) */}
      <div className="rounded-xl bg-[#2F3E46] p-6 sm:p-8 text-white">
        <p className="text-xs font-semibold tracking-wide text-[#F5A623]">
          Module 03 <span aria-hidden="true">·</span> 20 minutes
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
          Opportunities and Submissions
        </h2>
        <div className="mt-3 h-[3px] w-12 bg-[#F5A623]" />
        <p className="mt-3 max-w-2xl text-sm text-[#C8D4DA] leading-relaxed">
          Profile and directory links build a reliable foundation. Focus on genuine, relevant
          platforms with identical details—and avoid mass automated submissions.
        </p>
      </div>

      {/* Where to Find Opportunities (Slide 17) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white p-6 sm:p-7">
        <h3 className="text-2xl font-bold text-[#2F3E46]">Where to Find Opportunities</h3>
        <p className="mt-1 text-sm text-[#52646D]">
          Click any opportunity type to inspect its role in your backlink foundation.
        </p>

        <div className="mt-4 overflow-x-auto rounded-lg border border-[#D8E0E4]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2F3E46] text-white text-xs font-semibold">
                <th className="py-3 px-4">Opportunity type</th>
                <th className="py-3 px-4">Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6ECEF] text-sm">
              {OPPORTUNITY_TYPES.map((opp, idx) => (
                <tr
                  key={opp.type}
                  onClick={() => setSelectedOppIdx(idx)}
                  className={`cursor-pointer transition-colors ${
                    selectedOppIdx === idx ? 'bg-[#EEF2F4]' : 'bg-white hover:bg-[#F7F9FA]'
                  }`}
                >
                  <td className="py-3 px-4 font-semibold text-[#2F3E46] whitespace-nowrap">
                    {opp.type}
                  </td>
                  <td className="py-3 px-4 text-[#3E5059]">{opp.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border border-[#DCE3E7] bg-[#F7F9FA] p-4 text-xs">
          <div>
            <p className="font-semibold text-[#2F3E46]">Best For</p>
            <p className="mt-1 text-[#3E5059] leading-relaxed">
              {OPPORTUNITY_TYPES[selectedOppIdx].bestFor}
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#2F3E46]">SEO Role</p>
            <p className="mt-1 text-[#3E5059] leading-relaxed">
              {OPPORTUNITY_TYPES[selectedOppIdx].foundationRole}
            </p>
          </div>
        </div>
      </section>

      {/* Be Realistic: Do vs Avoid (Slide 18) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-[#2F3E46]">Be Realistic About Directory Links</h3>
            <p className="mt-1 text-sm text-[#52646D]">
              Profile and directory links build a foundation. They will not lift rankings on their
              own.
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EBEEF0] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setStrategyMode('do')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                strategyMode === 'do'
                  ? 'bg-white text-[#15803D] shadow-sm'
                  : 'text-[#52646D] hover:text-[#2F3E46]'
              }`}
            >
              DO: Curated Foundation
            </button>
            <button
              type="button"
              onClick={() => setStrategyMode('avoid')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                strategyMode === 'avoid'
                  ? 'bg-white text-[#B91C1C] shadow-sm'
                  : 'text-[#52646D] hover:text-[#2F3E46]'
              }`}
            >
              AVOID: Mass Submission
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`rounded-lg border p-5 transition-colors ${
              strategyMode === 'do'
                ? 'border-[#15803D] bg-[#F2FBF5]'
                : 'border-[#DCE3E7] bg-[#F7F9FA] opacity-75'
            }`}
          >
            <div className="flex items-center gap-2 text-[#15803D] font-bold">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span className="font-display-heading text-xl">DO</span>
            </div>
            <p className="mt-2 text-sm text-[#1E292E] leading-relaxed">
              Use genuine, relevant platforms. Keep details complete and consistent across LinkedIn,
              Google Business Profile, Justdial, and curated industry listings.
            </p>
            <p className="mt-3 text-xs font-medium text-[#15803D]">
              Outcome: Clean brand verification, local map visibility, and referral visits.
            </p>
          </div>

          <div
            className={`rounded-lg border p-5 transition-colors ${
              strategyMode === 'avoid'
                ? 'border-[#B91C1C] bg-[#FEF2F2]'
                : 'border-[#DCE3E7] bg-[#F7F9FA] opacity-75'
            }`}
          >
            <div className="flex items-center gap-2 text-[#B91C1C] font-bold">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <span className="font-display-heading text-xl">AVOID</span>
            </div>
            <p className="mt-2 text-sm text-[#1E292E] leading-relaxed">
              Mass submission to hundreds of low-quality directories. Automated blasts create thin
              footprints that search engines treat as link spam.
            </p>
            <p className="mt-3 text-xs font-medium text-[#B91C1C]">
              Outcome: Wasted effort, ignored links, and heightened manual-action risk.
            </p>
          </div>
        </div>
      </section>

      {/* Hands-On Exercise 3: Two Submissions Workbench (Slide 19) */}
      <section className="rounded-xl border border-[#D8E0E4] bg-white p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E6ECEF]">
          <div>
            <p className="text-xs font-semibold text-[#B87409]">
              Exercise 3 <span aria-hidden="true">·</span> 15 minutes <span aria-hidden="true">·</span>{' '}
              Hands-On
            </p>
            <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-[#2F3E46]">
              Two Submissions Sandbox
            </h3>
          </div>
          <span className="text-xs font-semibold text-[#2F3E46] tabular-nums">
            Recorded: {submissions.length} / 2 required
          </span>
        </div>

        {/* Slot Switcher */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#EBEEF0]">
            <button
              type="button"
              onClick={() => handleSwitchSlot('profile')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                submissionSlot === 'profile'
                  ? 'bg-white text-[#2F3E46] shadow-sm'
                  : 'text-[#52646D] hover:text-[#2F3E46]'
              }`}
            >
              1. Professional Profile
            </button>
            <button
              type="button"
              onClick={() => handleSwitchSlot('listing')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                submissionSlot === 'listing'
                  ? 'bg-white text-[#2F3E46] shadow-sm'
                  : 'text-[#52646D] hover:text-[#2F3E46]'
              }`}
            >
              2. Business Listing
            </button>
          </div>

          <button
            type="button"
            onClick={handleSyncFromBrandKit}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2F3E46] hover:text-[#B87409] underline underline-offset-4 cursor-pointer"
          >
            <ClipboardCheck className="h-3.5 w-3.5" />
            Copy exact NAP from Brand Kit
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Submission Form */}
          <div className="lg:col-span-7 rounded-lg border border-[#DCE3E7] bg-[#F7F9FA] p-5 space-y-4">
            <div>
              <label
                htmlFor="submission-platform"
                className="block text-xs font-semibold text-[#2F3E46]"
              >
                Choose Genuine Platform
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {availablePlatforms.map((plat) => (
                  <button
                    key={plat.name}
                    type="button"
                    onClick={() => setSelectedPlatformName(plat.name)}
                    className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      currentPlatform.name === plat.name
                        ? 'border-[#2F3E46] bg-[#2F3E46] text-white'
                        : 'border-[#CBD5DC] bg-white text-[#2F3E46] hover:bg-[#EBEEF0]'
                    }`}
                  >
                    {plat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sub-name" className="block text-xs font-semibold text-[#2F3E46]">
                  Official Name
                </label>
                <input
                  id="sub-name"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-white px-3 py-2 text-sm text-[#1E292E] focus:border-[#2F3E46] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="sub-website" className="block text-xs font-semibold text-[#2F3E46]">
                  Website URL
                </label>
                <input
                  id="sub-website"
                  type="text"
                  value={formWebsite}
                  onChange={(e) => setFormWebsite(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-white px-3 py-2 font-mono text-xs text-[#1E292E] focus:border-[#2F3E46] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="sub-address" className="block text-xs font-semibold text-[#2F3E46]">
                  Address
                </label>
                <input
                  id="sub-address"
                  type="text"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-white px-3 py-2 text-xs text-[#1E292E] focus:border-[#2F3E46] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="sub-phone" className="block text-xs font-semibold text-[#2F3E46]">
                  Phone Number
                </label>
                <input
                  id="sub-phone"
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-white px-3 py-2 font-mono text-xs text-[#1E292E] focus:border-[#2F3E46] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="sub-bio" className="block text-xs font-semibold text-[#2F3E46]">
                Complete Bio / Business Description
              </label>
              <textarea
                id="sub-bio"
                rows={3}
                value={formBio}
                onChange={(e) => setFormBio(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#CBD5DC] bg-white px-3 py-2 text-xs text-[#1E292E] focus:border-[#2F3E46] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={handleRecordSubmission}
                disabled={!isFormComplete}
                className="rounded-md bg-[#F5A623] px-5 py-2.5 text-sm font-semibold text-[#1E292E] transition-colors hover:bg-[#E09519] disabled:opacity-45 disabled:cursor-not-allowed whitespace-nowrap shrink-0 cursor-pointer"
              >
                Submit to {currentPlatform.name} & Record in Tracker
              </button>
              <span className="text-xs text-[#52646D]">
                Expected status: <strong>{currentPlatform.instantLive ? 'Live' : 'Pending'}</strong>
              </span>
            </div>

            {lastLoggedMsg && (
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D]">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {lastLoggedMsg}
              </p>
            )}
          </div>

          {/* Right Live NAP Consistency Audit & Recorded Log */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-lg border border-[#D8E0E4] bg-white p-5">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-[#2F3E46]">Live NAP Consistency Check</h4>
                {isNapConsistent ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803D]">
                    <CheckCircle2 className="h-4 w-4" />
                    Identical
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B45309]">
                    <AlertTriangle className="h-4 w-4" />
                    Mismatch Detected
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-xs text-[#52646D]">
                Search engines cross-check your Name, Address, and Phone across every listing.
              </p>

              <ul className="mt-3 space-y-2 text-xs">
                <li className="flex items-center justify-between py-1.5 border-b border-[#E6ECEF]">
                  <span className="text-[#52646D]">Name match</span>
                  <span className={nameMatches ? 'font-semibold text-[#15803D]' : 'font-semibold text-[#B91C1C]'}>
                    {nameMatches ? 'Matches Brand Kit' : 'Differs from Brand Kit'}
                  </span>
                </li>
                <li className="flex items-center justify-between py-1.5 border-b border-[#E6ECEF]">
                  <span className="text-[#52646D]">Address match</span>
                  <span className={addressMatches ? 'font-semibold text-[#15803D]' : 'font-semibold text-[#B91C1C]'}>
                    {addressMatches ? 'Matches Brand Kit' : 'Differs from Brand Kit'}
                  </span>
                </li>
                <li className="flex items-center justify-between py-1.5">
                  <span className="text-[#52646D]">Phone match</span>
                  <span className={phoneMatches ? 'font-semibold text-[#15803D]' : 'font-semibold text-[#B91C1C]'}>
                    {phoneMatches ? 'Matches Brand Kit' : 'Differs from Brand Kit'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-[#D8E0E4] bg-[#F7F9FA] p-5">
              <h4 className="text-sm font-bold text-[#2F3E46]">
                Recorded Submissions ({submissions.length})
              </h4>
              {submissions.length === 0 ? (
                <p className="mt-2 text-xs text-[#6B7D86]">
                  No submissions recorded yet. Complete one profile and one business listing to
                  finish Exercise 3.
                </p>
              ) : (
                <ul className="mt-3 space-y-2.5">
                  {submissions.map((sub) => (
                    <li
                      key={sub.id}
                      className="rounded-md border border-[#DCE3E7] bg-white p-3 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-[#2F3E46]">{sub.platform}</span>
                        <span
                          className={`font-semibold ${
                            sub.status === 'Live' ? 'text-[#15803D]' : 'text-[#B45309]'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-[#52646D] truncate">
                        {sub.profileUrl}
                      </p>
                      <p className="mt-1 text-[11px] text-[#52646D]">
                        {sub.opportunityType} · NAP {sub.napConsistent ? 'Consistent' : 'Needs Review'}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Expected Output */}
        <div className="mt-6 rounded-lg border border-[#D8E0E4] bg-[#EEF2F4] px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-[#2F3E46]">
            <strong>Expected output:</strong> Two submissions recorded, live or pending.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`text-xs font-semibold tabular-nums ${
                submissions.length >= 2 ? 'text-[#15803D]' : 'text-[#52646D]'
              }`}
            >
              {submissions.length >= 2 ? 'Output Complete' : `${submissions.length}/2 recorded`}
            </span>
            <button
              type="button"
              onClick={onNextModule}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#2F3E46] px-4 py-2 text-xs font-semibold text-white hover:bg-[#243138] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Continue to Module 4
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
