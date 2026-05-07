import fs from "fs/promises";
import path from "path";

export const deleteFiles = async (filePaths) => {
  if (!filePaths || filePaths.length === 0) return;

  try {
    await Promise.all(
      filePaths.map(async (filePath) => {
       
        if (filePath.includes('default.png')) return;
        let cleanPath = filePath;
        if (filePath.includes("http")) {
          const parts = filePath.split("/uploads/");
          cleanPath = "uploads/" + parts[1]; 
        }

        const normalizedPath = path.normalize(cleanPath);
        const fullPath = path.resolve(process.cwd(), normalizedPath);

        try {
           
          await fs.access(fullPath);
          await fs.unlink(fullPath);
          console.log(`Successfully deleted: ${fullPath}`);
        } catch (err) {
          console.error(`File not found or inaccessible: ${fullPath}`);
        }
      })
    );
  } catch (error) {
    console.error("Error during file deletion loop:", error.message);
  }
};