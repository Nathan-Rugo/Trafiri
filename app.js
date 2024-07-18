const search = () => {
const searchbox = document.getElementById("search-item").value.toUpperCase()
const allPlaces = document.getElementById("places-list")
const places = document.querySelectorAll(".destination")
const placename = document.getElementsByTagName("h4")

for (var i = 0; i<placename.length; i++){
    let match = places[i].getElementsByTagName('h4')[0];

    if (match){
        let textvalue = match.textContent || match.innerHTML
        
        if(textvalue.toUpperCase().indexOf(searchbox)> -1){
            places[i].style.display="";
        } 
        else{
            places[i].style.display="none";

        }
    }
}
}

