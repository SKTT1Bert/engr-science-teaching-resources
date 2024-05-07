"use server"

import { getUserById } from "@/database/data/user";
import dbConnect from "@/database/dbConnector";
import { CommentSchema } from "@/schemas";
import z from "zod"

type uploadFileCommentProps = {
  values: z.infer<typeof CommentSchema>;
  userId: string;
  fileId: string;
}

export const uploadFileComment =  async({ values, userId, fileId }: uploadFileCommentProps) => {
  try {
    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return { failure: "User not found" };
    }

    const validatedFields = CommentSchema.safeParse(values);

    if (!validatedFields.success) {
      return { failure: "Invalid comment!" };
    }
  
    const { commentText } = validatedFields.data;

    const uploadDate = new Date();
    console.log("uploadDate: ", uploadDate);
  
    const uploadQuery = `
      INSERT INTO FileComments_v2 (fileId, userId, commentText, uploadDate) VALUES (?, ?, ?, ?)`;
  
    const { results, error } = await dbConnect(uploadQuery, [fileId, userId, commentText, uploadDate]);
  
    if (error) {
      console.error("An error occurred while fetching data:", error);
      return {
        failure: "Internal server error, error uploading comment to db",
      };
    }
  
    if (results[0].insertId ) {
      return { success: true };
    }

  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return {
      failure: "Internal server error, error uploading comment",
    }
  }
}