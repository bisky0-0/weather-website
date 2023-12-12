import { Loader } from "@googlemaps/js-api-loader";

export async function googleSuggestions() {
    let input = document.getElementById('search-bar')
    const loader = new Loader({
        apiKey: 'AIzaSyC70UWrRF56t2NgwD3iXz7BVx6RWTSQy6k',
        version: 'weekly'
    });


    loader.load().then(async () => {
        const Place = await google.maps.importLibrary("places");



        let autocomplete;


        Place.PlacesServiceStatus.ZERO_RESULTS !== "ZERO_RESULTS" ?
            autocomplete = await new google.maps.places.Autocomplete(((input)), {
                types: ['geocode']
            }) : false




        autocomplete ? autocomplete.addListener('place_changed', () => {
            let place = autocomplete.getPlace();

            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();

            input.dataset.lat = lat;
            input.dataset.lng = lng;
        }) : false




        //prevent default action from the entre button so it won't submit before 
        //puting lat and lng data when the user click on the enter button to 
        //choose option from google adress options 
        input.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
            }
        });
    })
}

