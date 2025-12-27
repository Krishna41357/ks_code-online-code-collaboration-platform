import FileStorage from "../models/Files.js";

export const autoSaveFileService = async ({ fileId, code, userId }) => {
  const file = await FileStorage.findById(fileId);
  if (!file) return;

  const hasEditAccess =
    file.owner.toString() === userId ||
    file.collaborators.some(id => id.toString() === userId);

  if (!hasEditAccess) return;
  if (file.code === code) return;

  file.code = code;
  file.version += 1;
  await file.save();
};
