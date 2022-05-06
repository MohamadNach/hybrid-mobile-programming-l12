import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  EN: {
    translation: {
      Finnish: 'Finnish',
      English: 'English',
      home: 'Home',
      mynotes: 'My Note',
      noteEditor: 'Note Editor',
      createNote: 'Create Note',
      dev: 'Dev',
      loading: 'Loading',
      triggerLoading: 'Trigger Loading',
      settings: 'Settings',
      title: 'Title',
      content: 'Content',
      save: 'Save',
      saving: 'Saving',
      Increment: 'Increment',
      Decrement: 'Decrement',
      'We are Developing this section.': 'We are Developing this section.',
      count: 'Count',
      delete: 'Delete',
      deleting: 'Deleting',
      'click on the file to edit': 'Click on the file to edit',
    },
  },
  FI: {
    translation: {
      Finnish: 'Suomi',
      English: 'Englanti',
      home: 'Koti',
      mynotes: 'Muistiinpanoni',
      noteEditor: 'Muistiinpano Editori',
      createNote: 'Luo Muistiinpano',
      dev: 'Kehittäjä',
      loading: 'Ladataan',
      triggerLoading: 'Laukaisu Lataus',
      settings: 'Asetukset',
      title: 'Otsikko',
      content: 'Sisältö',
      save: 'Tallentaa',
      saving: 'Tallennetaan',
      Increment: 'Lisäys',
      Decrement: 'Vähennä',
      'We are Developing this section.': 'Kehitämme tätä osiota.',
      count: 'Määrä',
      delete: 'Poistaa',
      deleting: 'Poistetaan',
      'click on the file to edit': 'Napsauta tiedostoa muokataksesi sitä',
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'EN',
  interpolation: {
    escapeValue: false,
  },
});
