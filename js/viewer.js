document.addEventListener("DOMContentLoaded", () => {
  // URL에서 filename 파라미터 추출
  const urlParams = new URLSearchParams(window.location.search);
  const filename = urlParams.get("filename");

  const contentDiv = document.getElementById("markdown-content");

  if (!filename) {
    contentDiv.innerHTML = "<p>No file specified.</p>";
    return;
  }

  // Markdown 파일 로드
  fetch(`../public/posts/${filename}`) // 경로 조정
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch the Markdown file.");
      }
      return response.text();
    })
    .then((content) => {
      contentDiv.innerHTML = `<pre>${content}</pre>`; // Markdown 내용을 표시
    })
    .catch((error) => {
      console.error("Error loading Markdown file:", error);
      contentDiv.innerHTML = "<p>Failed to load content.</p>";
    });
});
