import { TypeCourse } from '@/types/course';

export interface TypeClassroomPlayer {
  clips: TypeChapterClip[];
  playingClipIndex?: number;
}

export interface TypeClassroomDialog {
  active?: boolean;
  title?: string | null;
  content: string | null;
  actionType?: string | null;
  label?: string | null;
  responseCallback?: Function | null;
}

export interface TypeClassroomCourse extends Pick<TypeCourse, 'publicTitle'> {
  publicTitle: string;
}

export interface TypeClassroomUi {
  fullscreen: boolean;
  mobile: boolean;
  menu: boolean;
}

export interface TypeChapterClip {
  assetId: number;
  clipGroupId: number;
  courseId: number;
  createdAt: string;
  deletedAt: string;
  flags: number;
  id: number;
  playTime: number;
  limitTime: number;
  progressPlayTime: number;
  poster: string;
  sequence: number;
  state: string;
  title: string;
  type: string;
  updatedAt: string;
  videoType: string;
  uniqueCode?: string;
  userClipProgress?: TypeUserChapterClipProgressList;
  children: TypeChapterClip[];
}

export interface TypeUserChapterClipProgressList {
  clipId: number;
  completedAt: string | null;
  createdAt: string;
  id: number;
  limitTime: number;
  playTime: number;
  position: number;
  progress: number | null;
  state: string;
  updatedAt: string;
  userId: number;
}
