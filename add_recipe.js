document.getElementById("addRecipeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const ingredients = document.getElementById("ingredients").value.split("\n");
    const instructions = document.getElementById("instructions").value;
    const image = document.getElementById("image").files[0]; // Get the image file

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageSrc = event.target.result;

        // Create new recipe object
        const newRecipe = { name, ingredients, instructions, image: imageSrc };

        // Retrieve recipes from local storage
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

        // Add new recipe to recipes array
        storedRecipes.push(newRecipe);

        // Save updated recipes array to local storage
        localStorage.setItem("recipes", JSON.stringify(storedRecipes));

        // Redirect to home page
        window.location.href = "index.html";
    };

    // Read the image file as data URL
    reader.readAsDataURL(image);
});
