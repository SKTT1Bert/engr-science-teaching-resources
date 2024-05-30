"use client";

import { CommentFileData } from "@/utils/types";
import { Button, Textarea } from "@mantine/core";
import React, { useState } from "react";
import Comment from "../comment";

type CommentFileThreadProps = {
  commentThread: CommentFileData[] | undefined;
};

/**
 * Renders a comment file thread.
 *
 * @param {CommentFileThreadProps} props - The props of the component.
 * @returns {JSX.Element} - The rendered CommentFileThread component.
 */
const CommentFileThread = ({ commentThread }: CommentFileThreadProps) => {
  const [viewCount, setViewCount] = useState(6);

  const handleViewMore = () => {
    setViewCount((prev) => prev + 6);
  };

  if (commentThread?.length === 0) {
    return <div>No comments</div>;
  }

  return (
    <div>
      {commentThread
        ?.slice(0, viewCount)
        .map((comment) => (
          <Comment
            key={comment.id}
            authorId={comment.userId}
            authorName={comment.name}
            commentText={comment.commentText}
            uploadDate={comment.uploadDate as string}
          />
        ))}

      {commentThread && viewCount < commentThread?.length && (
        <Button onClick={handleViewMore}> View more </Button>
      )}
    </div>
  );
};

export default CommentFileThread;
