import FileStorage from '../models/Files.js';

export const autoSaveFileService = async ({ fileId, code, userId }) => {
  try {
    // Try to find by MongoDB _id first
    let file = await FileStorage.findById(fileId).catch(() => null);
    
    // If not found, try to find by roomId
    if (!file) {
      file = await FileStorage.findOne({ roomId: fileId });
    }

    if (!file) {
      console.error('File not found for auto-save:', fileId);
      return;
    }

    // Check if user has edit access
    const hasEditAccess = 
      file.owner.toString() === userId || 
      file.collaborators.some(id => id.toString() === userId);

    if (!hasEditAccess) {
      console.error('User does not have edit access:', userId);
      return;
    }

    // Update code without incrementing version (auto-save)
    file.code = code;
    await file.save();

    console.log(`Auto-saved file: ${file.filename} (${fileId})`);
  } catch (error) {
    console.error('Auto-save service error:', error);
    // Don't throw error - auto-save should fail silently
  }
};

export default {
  autoSaveFileService
};