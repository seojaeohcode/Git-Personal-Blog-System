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
  fetch(`../public/posts/${filename}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch the Markdown file.");
      }
      return response.text();
    })
    .then((markdown) => {
      // 마크다운을 HTML로 변환해 표시
      // marked.parse() → HTML 문자열로 변환
      const htmlContent = marked.parse(markdown);
      contentDiv.innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error("Error loading Markdown file:", error);
      contentDiv.innerHTML = "<p>Failed to load content.</p>";
    });
});
