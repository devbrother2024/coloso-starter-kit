import http from '@/client/http';
import { TypeApplyEnrollment } from '@/types/enrollment';

export const requestApplyEnrollment = async (data: TypeApplyEnrollment) => {
  return await http.post('/enrollments/apply', data);
};
