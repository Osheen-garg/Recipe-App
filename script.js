const searchInput=document.getElementById("search-input");
const searchBtn=document.getElementById("search-btn");
const error=document.querySelector("#error");
const content=document.querySelector(".content");

let recipe="";

async function getRecipe(recipe){

    recipe=searchInput.value;
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`;
    const response=await fetch(url);
    if(response.status==404){
        content.innerHTML='<div id="error"><p class="error-show">No Recipe Found</p></div>'
    }
    else{
        let data=await response.json();
        console.log(data);
        if(data.meals==null)
        {
            console.log("meal");
            content.innerHTML='<div id="error"><p class="error-show">No Recipe Found</p></div>'
        }
        else
        {
            content.innerHTML="";
            data.meals.forEach(meal => {
            const div1=document.createElement("div");
            div1.classList.add("recipe-content");

            div1.innerHTML=`
            <div class="img-div"><img class="recipe-image" src="${meal.strMealThumb}"></div>
            <h2 class="recipe-name">${meal.strMeal}</h2>
            <h3 class="recipe-area">${meal.strArea} Dish</h3>
            <h3 class="recipe-category">${meal.strCategory}</h3>
            <div class="recipe-details"><span>Instructions: </span>${meal.strInstructions}</div>`

            content.appendChild(div1);
            
        }); 
        }
    }
}

searchBtn.addEventListener("click",()=>{
    getRecipe(recipe);
});

