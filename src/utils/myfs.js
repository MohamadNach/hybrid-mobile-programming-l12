import RNFS from 'react-native-fs';
import {Platform} from 'react-native';

const subDir = '/notes/';

export const initPath = () =>
  new Promise(res => {
    RNFS.mkdir(getPath()).finally(() => res());
  });

// only non-promise function
export const getPath = () => {
  if (Platform.OS === 'android') return RNFS.DocumentDirectoryPath + subDir;
  else if (Platform.OS === 'ios') return RNFS.MainBundlePath + subDir;
};

export const writeNote = (title, note, format = '.txt') => {
  return new Promise((res, rej) => {
    // /path/to/notes/title.format
    const notepath = title.includes(format)
      ? getPath() + title
      : getPath() + title + format;
    console.log({title, note, format, notepath});
    RNFS.writeFile(notepath, note)
      .then(() => res())
      .catch(err => {
        console.log('error at writeFile');
        console.log({err});
        rej();
      });
  });
};

export const readNote = filename =>
  new Promise((res, rej) => {
    const filepath = getPath() + filename; // /path/to/notes/filename.txt
    RNFS.readFile(filepath)
      .then(fileContent => res(fileContent))
      .catch(err => {
        console.log('error reading file');
        console.log({err});
      });
  });

export const deleteFiles = filename => {
  const filepath = getPath() + filename;
  RNFS.unlink(filepath);
  console.log('File Deleted');
};

// export function delteFiles(filepath) {
//   let exists = RNFS.exists(filepath);
//   if (exists) {
//     // exists call delete
//     RNFS.unlink(filepath);
//     console.log('File Deleted');
//   } else {
//     console.log('File Not Available');
//   }
// }

export const listNotes = () => {
  return new Promise((res, rej) => {
    RNFS.readDir(getPath())
      .then(items => {
        console.log({items});
        const notesOnly = [];
        for (const item of items) {
          if (item.isFile() && item.name.split('.txt'))
            notesOnly.push(item.name);
        }
        res(notesOnly);
      })
      .catch(err => {
        console.log({err});
        initPath();
        res([]);
      });
  });
};
