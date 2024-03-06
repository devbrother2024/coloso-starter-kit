import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { TypeClassroomPlayer, TypeClassroomDialog, TypeClassroomUi, TypeClassroomCourse } from '@/types/classroom';

interface TypeClassroomStore {
  player: TypeClassroomPlayer;
  ui: TypeClassroomUi;
  dialog: TypeClassroomDialog;
  course: TypeClassroomCourse;
}

interface TypeSetClassroomStore {
  namespace: keyof TypeClassroomStore;
  state: Partial<TypeClassroomStore[keyof TypeClassroomStore]>;
}

const initialClassroomPlayerState: TypeClassroomPlayer = {
  clips: [],
  playingClipIndex: undefined,
};

const initialClassroomDialogState: TypeClassroomDialog = {
  title: null,
  content: null,
  actionType: null,
  label: null,
  responseCallback: null,
};

const initialClassroomUiState: TypeClassroomUi = {
  fullscreen: false,
  mobile: false,
  menu: true,
};

const initialClassroomCourseState: TypeClassroomCourse = {
  publicTitle: '',
};

// TODO: any type 제거
const classroomStore = proxy<TypeClassroomStore | any>({
  player: initialClassroomPlayerState,
  ui: initialClassroomUiState,
  dialog: initialClassroomDialogState,
  course: initialClassroomCourseState,
});

const setClassroomStore = ({ namespace, state }: TypeSetClassroomStore) => {
  classroomStore[namespace] = { ...classroomStore[namespace], ...state };
};

const initialClassroomState = {
  player: initialClassroomPlayerState,
  ui: initialClassroomUiState,
  dialog: initialClassroomDialogState,
  course: initialClassroomCourseState,
};

const initializeClassroomStore = (namespace: keyof TypeClassroomStore) => {
  classroomStore[namespace] = { ...initialClassroomState[namespace] };
};

devtools(classroomStore, { name: 'classroom' });

export { classroomStore, setClassroomStore, initializeClassroomStore };
