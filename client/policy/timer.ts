import { isE2E } from '@/client/policy';

export const CertificationTimer = {
  DEFAULT: isE2E ? 3 : 600,
  RESEND: isE2E ? 1 : 540,
};
