const writeForm = document.getElementsByClassName('write-form')[0];
writeForm.addEventListener('submit', (e) => {
    if (!writeForm.title.value) {
        alert("제목을 입력해 주세요.");
        e.preventDefault();
        return false;
    }
    if (!writeForm.content.value.trim()) {
        alert("내용을 입력해 주세요.");
        e.preventDefault();
        return false;
    }
        
});