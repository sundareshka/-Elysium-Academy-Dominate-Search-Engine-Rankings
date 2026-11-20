export type MainView = 'overview' | 'modules' | 'tracker' | 'plan' | 'certificate';

export type ModuleId = 'module1' | 'module2' | 'module3' | 'module4';

export type PollOptionId = 'yes_regularly' | 'once_or_twice' | 'heard_never' | 'first_time';

export type LinkVerdict = 'Q' | 'L';

export type AnchorType = 'Branded' | 'Naked URL' | 'Generic' | 'Partial match' | 'Exact match';

export interface Exercise1Response {
  scenarioId: string;
  verdict: LinkVerdict;
  reason: string;
  isCorrect: boolean;
  timestamp: string;
}

export interface ProfileAnchorEntry {
  id: string;
  anchorText: string;
  percentShare: number;
  referringDomains: number;
  correctType: AnchorType;
  selectedType: AnchorType | '';
  isVerified: boolean;
}

export interface BacklinkProfileSnapshot {
  domain: string;
  authorityScore: number;
  totalBacklinks: number;
  referringDomains: number;
  dofollowPercent: number;
  capturedAt: string;
  anchors: ProfileAnchorEntry[];
}

export interface BrandKit {
  businessName: string;
  websiteUrl: string;
  shortBio: string;
  address: string;
  phone: string;
  category: string;
}

export interface SubmissionRecord {
  id: string;
  platform: string;
  opportunityType: 'Professional profile' | 'Business listing' | 'Relevant directory' | 'Institutional page';
  profileUrl: string;
  submittedName: string;
  submittedAddress: string;
  submittedPhone: string;
  submittedWebsite: string;
  status: 'Live' | 'Pending';
  napConsistent: boolean;
  createdAt: string;
}

export interface CompetitorOpportunity {
  id: string;
  domain: string;
  domainRating: number;
  topic: string;
  linksToCompA: boolean;
  linksToCompB: boolean;
  isBoth: boolean;
  placement: string;
  qualityPass: boolean;
  checklistNotes: string;
  status: 'Target' | 'Outreach Sent' | 'Acquired' | 'Removed';
}

export interface PlanWeekTask {
  id: string;
  week: 1 | 2 | 3 | 4;
  title: string;
  detail: string;
  completed: boolean;
}

export interface LinkableAssetDraft {
  format: 'Guide' | 'Checklist' | 'Case Study';
  title: string;
  targetAudience: string;
  keyHook: string;
}

export interface OutreachDraft {
  recipientDomain: string;
  contactName: string;
  subject: string;
  message: string;
  sentCount: number;
}

export interface WorkshopState {
  participantName: string;
  practiceWebsite: string;
  pollChoice: PollOptionId | null;
  activeModule: ModuleId;
  exercise1Responses: Record<string, Exercise1Response>;
  profileSnapshot: BacklinkProfileSnapshot | null;
  brandKit: BrandKit;
  submissions: SubmissionRecord[];
  competitorKeyword: string;
  competitorOpportunities: CompetitorOpportunity[];
  planTasks: PlanWeekTask[];
  assetDraft: LinkableAssetDraft;
  outreachDraft: OutreachDraft;
  assessmentAnswers: Record<string, number>;
  assessmentSubmitted: boolean;
  certificateId: string;
}
