document.getElementById("addCommentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const comment = document.getElementById("comment").value;

    // Retrieve recipe ID from URL
    const params = new URLSearchParams(window.location.search);
    const recipeId = parseInt(params.get("id"));

    // Retrieve comments for the specific recipe from local storage
    let comments = JSON.parse(localStorage.getItem(`comments_${recipeId}`)) || [];

    // Check if the comment already exists
    const isDuplicate = comments.includes(comment);

    if (!isDuplicate) {
        // Add new comment to comments array
        comments.push(comment);

        // Save updated comments array to local storage
        localStorage.setItem(`comments_${recipeId}`, JSON.stringify(comments));

        // Reload the page to display the new comment
        location.reload();
    } else {
        alert("This comment already exists!");
    }
});
