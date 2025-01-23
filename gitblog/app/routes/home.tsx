import type { Route } from "./+types/home";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// Post 타입 정의
interface Post {
  id: number;
  filename: string;
  title: string;
  summary: string;
  date: string;
}

export default function Home() {
  // posts 상태의 타입 명시
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/posts/posts.json");
        if (!response.ok) {
          throw new Error("Failed to fetch posts.json");
        }
        const data: Post[] = await response.json();
        setPosts(data); // 상태 업데이트
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {/* 클릭 시 해당 filename으로 이동 */}
            <Link to={`/post/${post.filename.replace(".md", "")}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
