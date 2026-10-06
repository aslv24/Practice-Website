interface FilePickerOptions {
  multiple?: boolean
}

declare global {
  interface Window {
    showOpenFilePicker?: (
      options?: FilePickerOptions
    ) => Promise<FileSystemFileHandle[]>
  }
}

export async function openFilePicker(multiple: boolean): Promise<File[]> {
  if (!window.showOpenFilePicker) {
    throw new Error(
      "Your browser does not support opening the file picker without a file input."
    )
  }

  const handles = await window.showOpenFilePicker({ multiple })
  return Promise.all(handles.map((handle) => handle.getFile()))
}
