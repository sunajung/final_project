const commentForm = document.getElementsByClassName('comment-form')[0];
commentForm.addEventListener('submit', (e) => {
    if (!commentForm.content.value.trim()) {
        alert("내용을 입력해 주세요.");
        e.preventDefault();
        return false;
    }
});

const postid = document.getElementsByClassName('postid')[0].getAttribute('value');
const listButton = document.getElementsByClassName('goto-list')[0];

const deleteURL = "/post/delete";
const postDeleteButton = document.getElementsByClassName('post-delete')[0];
postDeleteButton.addEventListener('click', (e) => {
    if (!confirm("정말 삭제하시겠습니까?\n" +
        "삭제한 게시물은 복구할 수 없습니다.")) {
        e.preventDefault();
        return false;
    }
    const option = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postid }),
    }
    fetch(deleteURL, option)
        .then(res => {
            res.json().then(data => {
                if (data.res) {
                    alert("게시물이 삭제되었습니다.");
                    listButton.click();
                }
                else {
                    alert("게시물 삭제에 실패하였습니다.");
                }
            })
        });
});