// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // Initialize stored recipes or set an empty array
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // Display recipes in the list
    const recipesList = document.getElementById("recipes");
    recipes.forEach((recipe, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<span onclick="viewRecipe(${index})">${recipe.name}</span><button class="recipe-delete" onclick="deleteRecipe(${index})">Delete</button>`;
        recipesList.appendChild(listItem);
    });
});

function viewRecipe(index) {
    window.location.href = `recipe.html?id=${index}`;
}

function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    location.reload(); // Reload the page to update the recipe list
}
