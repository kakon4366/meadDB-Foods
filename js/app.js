//spinner
const spinner = display => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = display;
}
//clear all meals
const clearMeals = display => {
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.style.display = display;
}

// load all meals in api
fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then(res => res.json())
    .then(data => displayMeal(data.meals))

//display all meal in html
const displayMeal = meals => {
    spinner('none');
    const mealsContainer = document.getElementById('meals-container');
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="col">
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 120)}</p>
                        <button 
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal" 
                            onclick="showMeal('${meal.idMeal}')" 
                            class="btn btn-warning ">Details
                        </button>
                    </div>
                </div>
            </div>
        `;
        mealsContainer.appendChild(div);
    })
}

//searching same cetagory meals
const searchMeal = () => {
    const searchTextBox = document.getElementById('search-text');
    const searchText = searchTextBox.value;
    searchTextBox.value = '';
    if(!searchText){
        searchTextBox.style.borderWidth = '2px';
        searchTextBox.style.borderColor = 'red';     
    }else{
        spinner('block');
        clearMeals('none');
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySameMeals(data.meals))

        searchTextBox.style.borderWidth = 'none';
        searchTextBox.style.borderColor = ''; 
    }
}

//display same cetagory meals
const displaySameMeals = meals => {
    spinner('none');
    clearMeals('');
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.textContent = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="col">
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 120)}</p>
                        <button 
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal" 
                            onclick="showMeal('${meal.idMeal}')" 
                            class="btn btn-warning">Details
                        </button>
                    </div>
                </div>
            </div>
        `;
        mealsContainer.appendChild(div);
    })
}

// load single meal in api 
const showMeal = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySingleMeal(data.meals[0]))
    const modalContainer = document.getElementById('modal-container');
    modalContainer.textContent = '';
}

//show single meal in modal
const displaySingleMeal = singleMeal => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${singleMeal.strMeal}</h5>
            <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
            <img width="100%" src="${singleMeal.strMealThumb}" />
            <p class="my-4">${singleMeal.strInstructions}</p>
            <p>Tags: ${singleMeal.strTags ? `<span class="bg-dark text-white py-2 px-3 rounded"> ${singleMeal.strTags} </span>` : ''}
            </p>
        </div>
        <div class="modal-footer">
            <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            >
            Close
            </button>
            <button type="button" class="btn btn-warning">
            Save changes
            </button>
        </div>
    `;
}