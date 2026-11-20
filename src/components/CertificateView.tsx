import { useState } from 'react';
import {
  Award,
  Briefcase,
  CheckCircle2,
  Download,
  Printer,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS, WORKSHOP_META } from '../data/workshopData';
import { WorkshopState } from '../types/workshop';
import { BrandLogo } from './BrandLogo';

interface CertificateViewProps {
  state: WorkshopState;
  onUpdateName: (name: string) => void;
  onSelectAssessmentAnswer: (questionId: string, optionIdx: number) => void;
  onSubmitAssessment: () => void;
  onResetAssessment: () => void;
}

export function CertificateView({
  state,
  onUpdateName,
  onSelectAssessmentAnswer,
  onSubmitAssessment,
  onResetAssessment,
}: CertificateViewProps) {
  const [downloadStatus, setDownloadStatus] = useState('');

  const answeredCount = Object.keys(state.assessmentAnswers).length;
  const score = ASSESSMENT_QUESTIONS.reduce((acc, q) => {
    return acc + (state.assessmentAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const milestones = [
    {
      label: 'Full Name Entered for Attendance',
      done: state.participantName.trim().length >= 2,
    },
    {
      label: 'Warm-Up Poll Submitted',
      done: Boolean(state.pollChoice),
    },
    {
      label: 'Exercise 1: Judge 5 Links',
      done: Object.keys(state.exercise1Responses).length >= 5,
    },
    {
      label: 'Exercise 2: Profile Snapshot & 5 Anchors',
      done: Boolean(
        state.profileSnapshot &&
          state.profileSnapshot.anchors.every((a) => a.selectedType !== '')
      ),
    },
    {
      label: 'Exercise 3: Two Submissions Logged',
      done: state.submissions.length >= 2,
    },
    {
      label: 'Exercise 4: Competitor Opportunities Checked',
      done: state.competitorOpportunities.length >= 5,
    },
    {
      label: 'Workshop Knowledge Assessment Submitted',
      done: state.assessmentSubmitted,
    },
  ];

  const completedMilestones = milestones.filter((m) => m.done).length;
  const displayName = state.participantName.trim() || 'Workshop Participant';

  const handleDownloadCertificatePng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 960;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const finishRender = (logoImg?: HTMLImageElement) => {
      // Background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Outer deep slate frame
      ctx.strokeStyle = '#2F3E46';
      ctx.lineWidth = 18;
      ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

      // Inner amber hairline accent
      ctx.strokeStyle = '#F5A623';
      ctx.lineWidth = 3;
      ctx.strokeRect(62, 62, canvas.width - 124, canvas.height - 124);

      // Header band
      ctx.fillStyle = '#2F3E46';
      ctx.fillRect(62, 62, canvas.width - 124, 150);

      if (logoImg) {
        const targetH = 74;
        const ratio = logoImg.width / logoImg.height || 3.4;
        const targetW = targetH * ratio;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(102, 100, targetW + 20, targetH + 14);
        ctx.drawImage(logoImg, 112, 107, targetW, targetH);
      } else {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '700 34px sans-serif';
        ctx.fillText('ELYSIUM ACADEMY', 110, 150);
      }

      ctx.fillStyle = '#F5A623';
      ctx.font = '600 18px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`CERTIFICATE ID: ${state.certificateId}`, canvas.width - 110, 144);

      // Body
      ctx.textAlign = 'center';
      ctx.fillStyle = '#52646D';
      ctx.font = '600 22px sans-serif';
      ctx.fillText('CERTIFICATE OF PARTICIPATION', canvas.width / 2, 305);

      ctx.fillStyle = '#1E292E';
      ctx.font = '400 22px sans-serif';
      ctx.fillText('This certifies that', canvas.width / 2, 370);

      ctx.fillStyle = '#2F3E46';
      ctx.font = '700 60px sans-serif';
      ctx.fillText(displayName, canvas.width / 2, 455);

      // Amber divider under name
      ctx.fillStyle = '#F5A623';
      ctx.fillRect(canvas.width / 2 - 90, 482, 180, 5);

      ctx.fillStyle = '#3E5059';
      ctx.font = '400 23px sans-serif';
      ctx.fillText(
        'has actively participated in the online workshop training',
        canvas.width / 2,
        545
      );

      ctx.fillStyle = '#2F3E46';
      ctx.font = '700 36px sans-serif';
      ctx.fillText(
        'DOMINATE SEARCH ENGINE RANKINGS: BACKLINK BUILDING FOR BEGINNERS',
        canvas.width / 2,
        605
      );

      ctx.fillStyle = '#52646D';
      ctx.font = '400 20px sans-serif';
      ctx.fillText(
        `${WORKSHOP_META.date}  ·  ${WORKSHOP_META.time}  ·  ${WORKSHOP_META.platform}`,
        canvas.width / 2,
        655
      );

      // Footer signatures
      ctx.textAlign = 'left';
      ctx.strokeStyle = '#CBD5DC';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(150, 785);
      ctx.lineTo(470, 785);
      ctx.stroke();

      ctx.fillStyle = '#2F3E46';
      ctx.font = '700 22px sans-serif';
      ctx.fillText(WORKSHOP_META.speaker, 150, 818);
      ctx.fillStyle = '#52646D';
      ctx.font = '400 17px sans-serif';
      ctx.fillText(WORKSHOP_META.speakerRole, 150, 845);

      ctx.textAlign = 'right';
      ctx.beginPath();
      ctx.moveTo(canvas.width - 470, 785);
      ctx.lineTo(canvas.width - 150, 785);
      ctx.stroke();

      ctx.fillStyle = '#2F3E46';
      ctx.font = '700 22px sans-serif';
      ctx.fillText('Elysium Academy', canvas.width - 150, 818);
      ctx.fillStyle = '#52646D';
      ctx.font = '400 17px sans-serif';
      ctx.fillText(`${WORKSHOP_META.website} · Madurai`, canvas.width - 150, 845);

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `Elysium-Academy-Certificate-${displayName.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadStatus('Certificate PNG downloaded.');
      window.setTimeout(() => setDownloadStatus(''), 3000);
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => finishRender(img);
    img.onerror = () => finishRender();
    img.src = '/assets/aistudio/ElysiumAcadmemy_a81d78c3.png';
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-[#D8E0E4] no-print">
        <p className="text-xs font-semibold text-[#B87409]">
          Closing · Questions, Assessment & Next Steps
        </p>
        <h1 className="mt-1 text-4xl font-bold text-[#2F3E46]">
          Assessment, Mini Project & E-Certificate
        </h1>
        <p className="mt-1 text-sm text-[#52646D]">
          Complete the quick 5-question workshop check, verify your mini-project deliverables, and
          download your Elysium Academy Certificate of Participation.
        </p>
      </div>

      {/* Top Row: Mini Project + Completion Checklist + Knowledge Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start no-print">
        {/* Left: Mini Project & Progress */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-xl border border-[#D8E0E4] bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#2F3E46]">Workshop Progress</h2>
              <span className="font-mono text-xs font-semibold text-[#2F3E46] tabular-nums">
                {completedMilestones}/{milestones.length} complete
              </span>
            </div>

            <ul className="mt-4 space-y-2.5 text-sm">
              {milestones.map((m) => (
                <li key={m.label} className="flex items-center gap-2.5">
                  <CheckCircle2
                    className={`h-4 w-4 shrink-0 ${
                      m.done ? 'text-[#15803D]' : 'text-[#CBD5DC]'
                    }`}
                  />
                  <span className={m.done ? 'text-[#1E292E] font-medium' : 'text-[#6B7D86]'}>
                    {m.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-[#D8E0E4] bg-[#F7F9FA] p-6">
            <div className="flex items-center gap-2 text-[#2F3E46]">
              <Briefcase className="h-4 w-4" />
              <h3 className="text-xl font-bold">Mini Project Brief (Submit within 7 Days)</h3>
            </div>
            <p className="mt-2 text-xs text-[#3E5059] leading-relaxed">
              Combine your downloaded <strong>Backlink Tracker CSV</strong> (Profile Snapshot, 2+
              NAP-consistent submissions, and 5–10 checked competitor opportunities) with your{' '}
              <strong>One-Page 30-Day Backlink Plan</strong> and submit them through the Elysium
              Academy workshop portal within 7 days.
            </p>
          </div>
        </div>

        {/* Right: 5-Question Workshop Assessment */}
        <div className="lg:col-span-7 rounded-xl border border-[#D8E0E4] bg-white p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E6ECEF]">
            <div>
              <h2 className="text-2xl font-bold text-[#2F3E46]">Quick Workshop Assessment</h2>
              <p className="text-xs text-[#52646D]">
                Five questions covering Modules 1 through 4.
              </p>
            </div>
            {state.assessmentSubmitted && (
              <span className="font-mono text-sm font-bold text-[#15803D] tabular-nums">
                Score: {score} / {ASSESSMENT_QUESTIONS.length}
              </span>
            )}
          </div>

          <div className="space-y-5">
            {ASSESSMENT_QUESTIONS.map((q, qIdx) => {
              const selected = state.assessmentAnswers[q.id];
              return (
                <div key={q.id} className="space-y-2">
                  <p className="text-sm font-semibold text-[#2F3E46]">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isPicked = selected === optIdx;
                      const isRight = q.correctIndex === optIdx;

                      let style = 'border-[#DCE3E7] bg-[#F7F9FA] text-[#2F3E46] hover:bg-[#EEF2F4]';
                      if (state.assessmentSubmitted) {
                        if (isRight) {
                          style = 'border-[#15803D] bg-[#F2FBF5] text-[#15803D] font-semibold';
                        } else if (isPicked && !isRight) {
                          style = 'border-[#B91C1C] bg-[#FEF2F2] text-[#B91C1C]';
                        }
                      } else if (isPicked) {
                        style = 'border-[#2F3E46] bg-[#2F3E46] text-white font-semibold';
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={state.assessmentSubmitted}
                          onClick={() => onSelectAssessmentAnswer(q.id, optIdx)}
                          className={`w-full text-left rounded-md border px-3.5 py-2.5 text-xs transition-colors cursor-pointer disabled:cursor-default ${style}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {state.assessmentSubmitted && (
                    <p className="text-xs text-[#3E5059] flex items-start gap-1.5 pt-1">
                      {selected === q.correctIndex ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D] shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-[#B91C1C] shrink-0 mt-0.5" />
                      )}
                      <span>{q.explanation}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E6ECEF] flex items-center justify-between gap-3">
            {!state.assessmentSubmitted ? (
              <button
                type="button"
                disabled={answeredCount < ASSESSMENT_QUESTIONS.length}
                onClick={onSubmitAssessment}
                className="rounded-md bg-[#2F3E46] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#243138] disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
              >
                Submit Assessment ({answeredCount}/{ASSESSMENT_QUESTIONS.length} answered)
              </button>
            ) : (
              <button
                type="button"
                onClick={onResetAssessment}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52646D] hover:text-[#2F3E46] cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Retake Assessment
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Live Certificate Preview & Download */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 no-print">
          <div className="flex-1 max-w-md">
            <label htmlFor="cert-name-edit" className="block text-xs font-semibold text-[#2F3E46]">
              Participant Full Name on Certificate
            </label>
            <input
              id="cert-name-edit"
              type="text"
              value={state.participantName}
              onChange={(e) => onUpdateName(e.target.value)}
              placeholder="Enter your full name..."
              className="mt-1.5 w-full rounded-md border border-[#CBD5DC] bg-white px-3.5 py-2 text-sm text-[#1E292E] focus:border-[#2F3E46] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadCertificatePng}
              className="inline-flex items-center gap-2 rounded-md bg-[#F5A623] px-5 py-2.5 text-sm font-semibold text-[#1E292E] hover:bg-[#E09519] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Download Certificate PNG
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-md bg-[#2F3E46] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#243138] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              Print Certificate
            </button>
          </div>
        </div>

        {downloadStatus && (
          <p className="text-xs font-semibold text-[#15803D] no-print">{downloadStatus}</p>
        )}

        {/* High-Craft Certificate Sheet */}
        <div className="print-only-full mx-auto max-w-4xl rounded-xl border-[6px] border-[#2F3E46] bg-white p-3 sm:p-5">
          <div className="rounded-lg border border-[#F5A623] overflow-hidden">
            {/* Certificate Top Header */}
            <div className="bg-[#2F3E46] px-6 py-5 sm:px-10 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="inline-flex rounded bg-white px-3 py-1.5 w-fit">
                <BrandLogo className="h-9 sm:h-10" />
              </div>
              <div className="text-left sm:text-right">
                <p className="font-mono text-xs font-semibold text-[#F5A623] tabular-nums">
                  ID: {state.certificateId}
                </p>
                <p className="text-xs text-[#CBD5DC] mt-0.5">{WORKSHOP_META.website}</p>
              </div>
            </div>

            {/* Certificate Center Content */}
            <div className="px-6 py-10 sm:px-12 sm:py-14 text-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#52646D]">
                <Award className="h-4 w-4 text-[#B87409]" />
                <span>CERTIFICATE OF PARTICIPATION</span>
              </div>

              <p className="mt-5 text-sm text-[#52646D]">This certifies that</p>

              <p className="mt-2 font-display-heading text-4xl sm:text-5xl font-bold text-[#2F3E46]">
                {displayName}
              </p>

              <div className="mx-auto mt-4 h-[3px] w-24 bg-[#F5A623]" />

              <p className="mt-6 text-sm text-[#3E5059]">
                has actively participated in the Elysium Academy online training workshop
              </p>

              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-[#2F3E46]">
                Dominate Search Engine Rankings: Backlink Building for Beginners
              </h3>

              <p className="mt-3 text-xs text-[#52646D]">
                {WORKSHOP_META.date} <span aria-hidden="true">·</span> {WORKSHOP_META.time}{' '}
                <span aria-hidden="true">·</span> {WORKSHOP_META.platform}
              </p>

              {/* Signatures */}
              <div className="mt-12 pt-6 border-t border-[#E6ECEF] grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                <div>
                  <p className="font-display-heading text-xl font-bold text-[#2F3E46]">
                    {WORKSHOP_META.speaker}
                  </p>
                  <p className="text-xs text-[#52646D]">{WORKSHOP_META.speakerRole}</p>
                </div>
                <div className="sm:text-right">
                  <p className="font-display-heading text-xl font-bold text-[#2F3E46]">
                    Elysium Academy
                  </p>
                  <p className="text-xs text-[#52646D]">{WORKSHOP_META.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
