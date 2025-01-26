document.addEventListener("DOMContentLoaded", () => {
  // Fetch JSON 데이터를 불러옵니다.
  fetch("../public/posts.json") // 지정한 ../public/posts.json 경로 유지
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch posts.json");
      }
      return response.json();
    })
    .then((data) => {
      // 데이터를 콘솔에 출력합니다.
      console.log("Posts Data (Original):", data);

      // 최신순으로 정렬 (역순)
      const reversedData = data.reverse(); // 배열을 역순으로 정렬
      console.log("Posts Data (Reversed):", reversedData);

      // HTML 요소 생성 및 데이터 출력
      const body = document.querySelector("body"); // body 태그 선택
      const listContainer = document.createElement("ul"); // 목록을 담을 컨테이너 생성

      reversedData.forEach((post) => {
        const listItem = document.createElement("li"); // 각 제목을 담을 리스트 아이템 생성
        const link = document.createElement("a"); // 제목을 클릭할 수 있도록 링크 생성

        // viewer.html로 이동하며 filename 파라미터 전달
        link.href = `./html/viewer.html?filename=${post.filename}`;
        link.textContent = post.title; // 제목 텍스트 설정
        listItem.appendChild(link); // 링크를 리스트 아이템에 추가
        listContainer.appendChild(listItem); // 컨테이너에 리스트 아이템 추가
      });

      body.appendChild(listContainer); // body에 컨테이너 추가
    })
    .catch((error) => {
      console.error("Error fetching posts.json:", error);
    });
});
