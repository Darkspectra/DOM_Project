
const searchMeals = async (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById("search-box").value;

    if (searchTerm) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            const data = await response.json();
            displayMeals(data.meals);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        alert("Please enter a search term.");
    }
};


const displayMeals = (meals) => {
    const showMeals = document.getElementById("show-meals");
    showMeals.innerHTML = ""; // Clear previous results

    if (meals) {
        meals.forEach(meal => {
            const mealDiv = document.createElement("div");
            mealDiv.className = "meal";
            mealDiv.innerHTML = `

            <div class="card" style="width: 18rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.substring(0, 100)}</p>
            <button onclick="mealDetails(${meal.idMeal})" class="btn btn-primary" type="submit">Details</button>
            </div>
            </div>

            `;
            showMeals.appendChild(mealDiv);
        });
    } else {
        showMeals.innerHTML = "<p>No meals found. Try a different search term.</p>";
    }
};


const mealDetails = async (id) =>{
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        console.log(data);

        const meal = data.meals[0];

        const showMealsDetails = document.getElementById("show-meals-details");
        showMealsDetails.innerHTML = "";

        const mealDiv = document.createElement("div");
            mealDiv.className = "meal";
            mealDiv.innerHTML = `

            <div class="card" style="width: 18rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions}</p>
            </div>
            </div>

            `;
            showMealsDetails.appendChild(mealDiv);

        
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

