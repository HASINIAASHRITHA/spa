
interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: 'dopo6gjfq',
  uploadPreset: 'spa1234'
};

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  const data = await response.json();
  return data.secure_url;
};
