"use server";

import axios from "axios";

export const uploadFile = async (file: any) => {
  try {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(
        `${process.env.BACKEND_API}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fileUrl = data.url;

      return fileUrl;
    }
  } catch (error) {
    console.log("An error occurred while uploading the file:", error);
    return null;
  }
};
