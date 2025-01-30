    function postComment() {
        const commentText = document.getElementById("comment-input").value;

        if (commentText.trim() !== "") {
            // Retrieve existing comments from localStorage
            let comments = JSON.parse(localStorage.getItem('comments')) || [];

            // Add the new comment
            comments.push(commentText);

            // Store updated comments back in localStorage
            localStorage.setItem('comments', JSON.stringify(comments));

            // Update the UI with the new comment
            const newCommentDiv = document.createElement("div");
            newCommentDiv.classList.add("comment");
            newCommentDiv.textContent = commentText;
            document.getElementById("comment-list").appendChild(newCommentDiv);

            // Clear the input field
            document.getElementById("comment-input").value = "";
        } else {
            alert("Please write something before posting.");
        }
    }

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];

        const commentList = document.getElementById("comment-list");
        commentList.innerHTML = ''; // Clear existing comments

        comments.forEach(comment => {
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
            commentDiv.textContent = comment;
            commentList.appendChild(commentDiv);
        });
    }
    //localStorage.clear('comments');
    // Automatically load comments when the page loads
    window.onload = loadComments;
