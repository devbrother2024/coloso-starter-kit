import { TypeCourse } from '@/types/course';

export interface TypeEnrollment {
  acquisitionChannel: string | null;
  classroomEnteredAt: string | null;
  completedAt: string;
  completedClipCount: number;
  courseId: number | null;
  customerId: number | null;
  organizationId: number | null;
  productId: number | null;
  transactionId: number | null;
  userId: number | null;
  createdAt: string;
  email: string;
  flags: number;
  id: number;
  jobTitle: string;
  medium: string | null;
  name: string;
  objectives: string | null;
  organization: string;
  paymentAt: string | null;
  periodBeginAt: string | null;
  periodEndAt: string | null;
  phone: string;
  receiveMarketingEmail: string;
  revenue: string | null;
  site: string;
  state: string;
  type: string;
  updatedAt: string;
  extras: Record<string, unknown>;
  course?: TypeCourse | null;
}

export interface TypeApplyEnrollment {
  productId: number;
  electiveProductIds: number[];
}
