document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const recipeId = parseInt(params.get("id"));

    // Retrieve recipe from local storage
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipe = recipes[recipeId];

    // Display recipe details
    document.getElementById("recipeName").textContent = recipe.name;
    const recipeDetails = document.getElementById("recipeDetails");
    recipeDetails.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <h2>Ingredients:</h2>
        <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
        </ul>
        <h2>Instructions:</h2>
        <p>${recipe.instructions}</p>
    `;

    // Retrieve comments from local storage
    const comments = JSON.parse(localStorage.getItem(`comments_${recipeId}`)) || [];
    const commentsContainer = document.getElementById("comments");

    // Filter out duplicate comments
    const uniqueComments = [];
    comments.forEach(comment => {
        if (!uniqueComments.includes(comment)) {
            uniqueComments.push(comment);
        }
    });

    // Display unique comments
    uniqueComments.forEach((comment, index) => {
        const commentDiv = document.createElement("div");
        commentDiv.textContent = comment;
        commentsContainer.appendChild(commentDiv);

        // Add delete button to each comment
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("comment-delete");
        deleteButton.addEventListener("click", function() {
            deleteComment(recipeId, index);
        });
        commentDiv.appendChild(deleteButton);
    });
});

// Add comment
document.getElementById("addCommentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const comment = document.getElementById("comment").value;

    // Retrieve recipe ID from URL
    const params = new URLSearchParams(window.location.search);
    const recipeId = parseInt(params.get("id"));

    const comments = JSON.parse(localStorage.getItem(`comments_${recipeId}`)) || [];

    // Check if the comment already exists
    if (!comments.includes(comment)) {
        comments.push(comment);
        localStorage.setItem(`comments_${recipeId}`, JSON.stringify(comments));
        location.reload(); // Reload the page to display the new comment
    } else {
        alert("This comment already exists!");
    }
});

// Function to delete comment
function deleteComment(recipeId, commentIndex) {
    let comments = JSON.parse(localStorage.getItem(`comments_${recipeId}`)) || [];
    comments.splice(commentIndex, 1);
    localStorage.setItem(`comments_${recipeId}`, JSON.stringify(comments));
    location.reload(); // Reload the page to update the comments
}
