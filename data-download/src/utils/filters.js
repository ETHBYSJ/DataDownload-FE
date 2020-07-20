import time from "./time";
import filesize from 'filesize'

function fileSize(size) {
  return filesize(size)
}

export default {
  unixFormat: time.unixFormat,
  localtime: time.utcToLocal,
  fileSize: fileSize
}
