const BASE_URL = 'http://localhost:3000/pups/'


// When the page loads fetch all pups
 // Take the div with id: dogbar and and make a span
 // (ex: `<span>Mr. Bonkers</span>`)
 // After the spans are made append to the dogBar

// When I click on a pupSpan I can see that pups info
// in the dog-info div

document.addEventListener('DOMContentLoaded', function(){
    getPupList()
})

function getPupList(){
    fetch(BASE_URL)
        .then(r => r.json())
        .then(dogData => dogData.forEach(pup => makePupSpan(pup)))     
}

function makePupSpan(pup){
    let pupBar = document.getElementById('dog-bar')
    
    let pupSpan = document.createElement('span')
        pupSpan.innerText = pup.name

        pupSpan.addEventListener('click', () => {
            showPupInfo(pup)
        })

    pupBar.append(pupSpan)
}

function showPupInfo(dog){

    let dogInfoDiv = document.querySelector('#dog-info')

        let dogImg = document.createElement('img')
            dogImg.src = dog.image

        let dogName = document.createElement('h2')
            dogName.innerText = dog.name

        let dogButton = document.createElement('button')
            if(dog.isGoodDog){
                dogButton.innerText = "Good Dog!"
            }else {
                dogButton.innerText = "Bad Dog!"
        }
            dogButton.addEventListener('click', () => {
                toggleGoodDog(dog)
            })

    dogInfoDiv.innerHTML = ""
    dogInfoDiv.append(dogImg, dogName, dogButton)

}

function toggleGoodDog(dog){


    let newToggle = {
        isGoodDog: !dog.isGoodDog
    }

    let reqPack = {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify(newToggle)
    }

    fetch(BASE_URL + dog.id, {method: "DELETE"})
        .then(res => res.json())
        .then(updatedDog => showPupInfo(updatedDog))


    
    // DELETE FUNCTIONALITY
    // fetch(BASE_URL + dog.id, {method: "DELETE"}),
    // document.querySelector('#dog-info').innerHTML = ""
    
}

