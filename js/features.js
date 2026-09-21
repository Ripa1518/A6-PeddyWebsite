const loadcategories = () =>{
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => showcategories(data.categories))
}
const loadAllPets = () =>{
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => showAllPets(data.pets))
}

// Fetch Pets by Category
const loadPetByCateg = (categoryName) =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    .then(res => res.json())
    .then(dat => showAllPets(dat.data))
}


const showcategories = (categories) =>{
    console.log(categories)
    const categoryContainer = document.getElementById('category-container'); 
    categoryContainer.classList.add('flex' , 'justify-between' )    

    for(const category of categories){

        const div = document.createElement('div');
        // div.classList.add ( );
        div.innerHTML = 
        `
        <button onclick="loadPetByCateg('${category.category}')" class="btn btn-outline sm:w-32 lg:w-56 p-2 h-auto ">
        <img src="${category.category_icon}" class="w-10">
        <p class="font-bold text-xl"> ${category.category}</p>
        </button>

        `;
        categoryContainer.appendChild(div);
            
    }

}

const showAllPets = (pets) =>{
    console.log(pets);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML ='';

    cardContainer.classList.add('grid', 'grid-cols-2', 'md:grid-cols-4','gap-4');
        const divLeftContainer = document.createElement('div');
        const divRightContainer = document.createElement('div');
        divRightContainer.classList.add('border','border-gray-500', 'h-full')
        // some other works

        divLeftContainer.classList.add( 'grid','grid-cols-1','col-span-1','md:grid-cols-3' ,'md:col-span-3', 'gap-4') ;
        divRightContainer.classList.add( 'grid','grid-cols-1','col-span-1') ;

        if(pets.length ===0){
            cardContainer.innerHTML=
            `
            <div class="flex flex-col text-center grid col-span-3">
            <img class="mx-auto  " src="images/error.webp">
            
            <p class="text-3xl font-bold">No Information Available</p>
            <p class="text-sm text-gray-400">Please check again later for updated information. We’re continuously working to keep the information accurate and up to date, <br>
             so new details may become available in the future.</p>
            </div>
            `
        }
        // for loop
        for(const pet of pets){
        const divLeft = document.createElement('div');
        divLeft.innerHTML =
        `
        <div class=" card-compact bg-base-100 shadow-xl border border-gray-300 p-4 rounded-lg ">
            <figure>
                <img class="rounded-lg w-full h-48 object-cover"
                src="${pet.image}"
                alt="pet" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
            </div>        
        `
        divLeftContainer.appendChild(divLeft);

    }
    cardContainer.appendChild(divLeftContainer);
}

loadcategories()
loadAllPets()