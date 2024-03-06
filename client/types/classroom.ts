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
