import { Loader } from "@googlemaps/js-api-loader";

export async function googleSuggestions() {
    let input = document.getElementById('search-bar')
    const loader = new Loader({
        apiKey: 'AIzaSyCG2YHIuPJYMOJzS6wSw5eZ0dTYXnhZFLs',
        version: 'weekly'
    });


    loader.load().then(async () => {
        const { Place } = await google.maps.importLibrary("places");

        let autocomplete;
        autocomplete = await new google.maps.places.Autocomplete(((input)), {
            types: ['geocode']
        })


        autocomplete.addListener('place_changed', () => {
            let place = autocomplete.getPlace();

            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();

            input.dataset.lat = lat;
            input.dataset.lng = lng;
        })

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

