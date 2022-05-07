import CreateNote from './createNote';
import Home from './home';
import MyNotes from './mynotes';
import NoteEditor from './noteEditor';
import Dev from './dev';
import Loading from './loading';
import TriggerLoading from './triggerLoading';
import Settings from './settings';
import Sensor from './sensor';

export const screenkeys = [
  'home',
  'mynotes',
  'noteEditor',
  'createNote',
  'loading',
  'triggerLoading',
  'settings',
  'dev',
  'sensor',
];

export const screencomponents = [
  Home,
  MyNotes,
  NoteEditor,
  CreateNote,
  Loading,
  TriggerLoading,
  Settings,
  Dev,
  Sensor,
];

export default screenkeys.map((skey, i) => {
  const screen = {
    key: skey,
    component: screencomponents[i],
  };
  return screen;
});
