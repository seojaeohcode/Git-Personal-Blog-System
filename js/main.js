document.addEventListener("DOMContentLoaded", () => {
  // Fetch JSON 데이터를 불러옵니다.
  fetch("../public/posts.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch posts.json");
      }
      return response.json();
    })
    .then((data) => {
      // 데이터를 콘솔에 출력합니다.
      console.log("Posts Data:", data);

      // Title 속성만 출력
      data.forEach((post) => {
        console.log("Title:", post.title);
      });

      // HTML에 title 출력
      const body = document.querySelector("body"); // body 태그 선택
      const listContainer = document.createElement("ul"); // 목록을 담을 컨테이너 생성

      data.forEach((post) => {
        const listItem = document.createElement("li"); // 각 제목을 담을 리스트 아이템 생성
        listItem.textContent = post.title; // 제목 텍스트 설정
        listContainer.appendChild(listItem); // 컨테이너에 리스트 아이템 추가
      });

      body.appendChild(listContainer); // body에 컨테이너 추가
    })
    .catch((error) => {
      console.error("Error fetching posts.json:", error);
    });
});
