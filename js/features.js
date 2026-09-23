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

const removeActiveBtn = () => {
    const btns = document.getElementsByClassName('category-btn') ;
    for(let btn of btns){
        btn.classList.remove('active');
    }
}

// Fetch Pets by Category
const loadPetByCateg = (categoryName) =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    .then(res => res.json())
    .then(dat =>{
        removeActiveBtn();
        const activeBtn = document.getElementById(`btn-${categoryName}`);
        activeBtn.classList.add('active', 'sm:w-32', 'lg:w-56', 'p-2');
        showAllPets(dat.data);
    })
}

const loadDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    const res = await fetch(url)
    const data =await res.json()
    showDetails(data.petData)
    
}
const showDetails = (petData) =>{
    console.log(petData);
    const modalContent = document.getElementById('modal-content')
    modalContent.innerHTML =`
                    <img class="w-full" src="${petData.image}" alt="">
                    <h3 class="text-2xl font-bold">${petData.pet_name}</h3>
                    
                    <div class="flex">
                    <div>
                        
                        <p>Bread : ${petData.breed? petData.breed: "Not availabe"}</p>
                        <p>Gender : ${petData.gender ? petData.gender: 'Not available'}</p>
                        <p>vaccinated_status : ${petData.vaccinated_status ? petData.vaccinated_status : "No"}</p>
                    </div>
                    <div>
                        <p>Birth :${petData.date_of_birth ? petData.date_of_birth.split('-')[0] : 'Not Available'}</p>
                        <p>Price : ${petData.price? petData.price + '$' : 'Not Available'}</p>
                        

                    </div>                    
                    </div>                    

                    <hr>

                    <h4 class="text-xl font-bold">Details Information</h4>
                    <p>${petData.pet_details}</p>
                </div>
    `
    document.getElementById('customModal').showModal();
}


const showcategories = (categories) =>{
    console.log(categories)
    const categoryContainer = document.getElementById('category-container'); 
    categoryContainer.classList.add('grid' , 'grid-cols-2', 'md:flex' , 'md:justify-between' ,'gap-4', )    

    for(const category of categories){

        const div = document.createElement('div');
        // div.classList.add ( );
        div.innerHTML = 
        `
        <button id="btn-${category.category}" onclick="loadPetByCateg('${category.category}')" class="btn btn-outline border border-pink-400 w-32 lg:w-56 p-2 h-auto category-btn ">
        <img src="${category.category_icon}" class="w-10">
        <p class="font-bold text-xl"> ${category.category}</p>
        </button>

        `;
        categoryContainer.appendChild(div);
            
    }

}

const likeRecord =(likeImg) =>{
    const imageDiv = document.getElementById('like-img');
    const childImg = document.createElement('div');
    childImg.innerHTML=`
    <img class="rounded-lg" src="${likeImg}">
    `
    imageDiv.appendChild(childImg);
}

const showAllPets = (pets) =>{
    console.log(pets);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML ='';

    cardContainer.classList.add('grid' , 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-4','gap-4', 'items-start');
        const divLeftContainer = document.createElement('div');
        const divRightContainer = document.createElement('div');
        // divRightContainer.classList.add( 'h-full')
        // some other works

        divLeftContainer.classList.add( 'grid','grid-cols-1','col-span-1' ,'md:grid-cols-2' ,'lg:grid-cols-3' ,'md:col-span-3', 'gap-4') ;
        divRightContainer.classList.add( 'grid','grid-cols-1','col-span-1' ) ;

        if(pets.length ===0){
            divLeftContainer.innerHTML=
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
                <h2 class="card-title">${pet.pet_name}</h2>
                <p>Bread : ${pet.breed? pet.breed: "Not availabe"}</p>
                <p>Birth :${pet.date_of_birth ? pet.date_of_birth.split('-')[0] : 'Not Available'}</p>
                <p>Gender : ${pet.gender ? pet.gender: 'Not available'}</p>
                <p>Price : ${pet.price? pet.price + '$' : 'Not Available'}</p>
                <div class=" flex item-center justify-between gap-2">
                
                <button onclick="likeRecord('${pet.image}')"  class="btn btn-outline w-1/3 ">
                <img class="w-8 md:w-12 " src="https://img.icons8.com/?size=96&id=SkbzwdwhI2sy&format=png">
                </button>
               
                <button class="btn  btn-outline w-1/3 ">Adopt</button>
                <button onclick="loadDetails(${pet.petId})" class="btn  btn-outline  w-1/3">Details</button>
                
                </div>
            </div>
            </div>        
        `
        divLeftContainer.appendChild(divLeft);

    }

    divRightContainer.innerHTML= `
        <div class="rounded-lg border border-pink-500 min-h-[500px]">
        <div id="like-img" class=" grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">

        
    </div>
    </div>
    `
    cardContainer.appendChild(divLeftContainer);
    cardContainer.appendChild(divRightContainer);
}

loadcategories()
loadAllPets()