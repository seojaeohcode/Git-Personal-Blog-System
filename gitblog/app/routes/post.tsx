import ReactMarkdown from "react-markdown";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

export default function PostView() {
  const { filename } = useParams(); // URL 파라미터에서 filename 추출
  const [content, setContent] = useState("");

  useEffect(() => {
    // md 파일 로드
    const fetchPost = async () => {
      try {
        const response = await fetch(`/posts/${filename}.md`); // public/posts/<filename>.md
        if (!response.ok) throw new Error("Failed to fetch post");

        const text = await response.text(); // Markdown 파일 내용
        setContent(text); // 상태에 저장
      } catch (error) {
        console.error("Error fetching post:", error);
        setContent("Error loading post content.");
      }
    };

    if (filename) {
      fetchPost();
    }
  }, [filename]);

  return (
    <div>
      <h1>Post Content</h1>
        {/* ReactMarkdown으로 md 파일 내용 렌더링 */}
          <ReactMarkdown>{content}</ReactMarkdown>
          <Link to="/">Back to Home</Link>
    </div>
  );
}