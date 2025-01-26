// Markdown 적용 함수
function applyMarkdown(type) {
  const editor = document.getElementById("editor");
  const selectionStart = editor.selectionStart;
  const selectionEnd = editor.selectionEnd;
  const selectedText = editor.value.substring(selectionStart, selectionEnd);

  let markdownText = "";
  switch (type) {
    case "bold":
      markdownText = `**${selectedText || "bold text"}**`;
      break;
    case "italic":
      markdownText = `_${selectedText || "italic text"}_`;
      break;
    case "link":
      markdownText = `[${selectedText || "link text"}](http://example.com)`;
      break;
    default:
      return;
  }

  // 텍스트 영역 업데이트
  editor.value =
    editor.value.substring(0, selectionStart) +
    markdownText +
    editor.value.substring(selectionEnd);
  editor.focus(); // 에디터에 포커스 유지
  updatePreview();
}

// Markdown 미리보기 업데이트
function updatePreview() {
  const editor = document.getElementById("editor");
  const preview = document.getElementById("preview");
  const markdownText = editor.value;

  try {
    // marked.js를 사용해 Markdown을 HTML로 변환
    preview.innerHTML = marked.parse(markdownText);
  } catch (error) {
    console.error("Error rendering Markdown:", error);
    preview.innerHTML = "<p>Failed to render preview.</p>";
  }
}

// 줄바꿈 이벤트 처리
document.getElementById("editor").addEventListener("keydown", (event) => {
  const editor = document.getElementById("editor");
  if (event.key === "Enter") {
    event.preventDefault(); // 기본 Enter 동작 방지
    const selectionStart = editor.selectionStart;
    const selectionEnd = editor.selectionEnd;

    // 현재 커서 위치에 줄바꿈 문법 추가
    const valueBefore = editor.value.substring(0, selectionStart);
    const valueAfter = editor.value.substring(selectionEnd);
    editor.value = `${valueBefore}  \n${valueAfter}`; // 스페이스 두 개 + 줄바꿈
    editor.setSelectionRange(selectionStart + 3, selectionStart + 3); // 커서 위치 조정
    updatePreview();
  }
});

// 텍스트 영역의 입력 이벤트 리스너 추가
document.getElementById("editor").addEventListener("input", updatePreview);

// 페이지 로드 시 초기 미리보기 설정
document.addEventListener("DOMContentLoaded", updatePreview);
