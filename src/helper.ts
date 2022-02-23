
interface Condition {
  fileType?: string[];
  size?: number;
}

type Error = 'type' | 'size' | null

export function beforeUploadCheck(file: File, condition: Condition) {
  let error: Error = null;
  if (condition.fileType) {
    if (!condition.fileType.includes(file.type)) {
      error = 'type'
    }
  }
  if (condition.size) {
    if (file.size / 1024 / 1024 > condition.size) {
      error = 'size'
    }
  }
  return {
    passed: error === null,
    error
  }
}