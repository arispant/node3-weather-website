const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



document.querySelector('#get-location').addEventListener('click', (e) => {
    e.preventDefault()
    if(!navigator.geolocation){
        messageOne = 'This feature is not supported by your browser!'
    }
    
    navigator.geolocation.getCurrentPosition((position) => {
      var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+position.coords.longitude+','+position.coords.latitude+'.json?access_token=pk.eyJ1IjoiYXJpc3BhbnQiLCJhIjoiY2p2cDU1bG5zMjV3dDRhb2k4N2VxcnBoYiJ9.9apBzez3gvOpJh6pjk9DYw&limit=1';
      fetch(url)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          search.value = data.features[0].properties.address
        }) 
    })
})


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) =>{
            if (data.error) {
              messageOne.textContent = data.error
            } else {
              messageOne.textContent = data.location
              messageTwo.textContent = data.forecast
            }  
        })
    })
})