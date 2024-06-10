document.querySelectorAll(".allPaths").forEach(e => {
    e.setAttribute('class', `allPaths ${e.id}`);

    e.addEventListener("mouseover", function () {
        const classes = e.className.baseVal.replace(/ /g, '.');

        //console.log(classes);

        document.querySelectorAll(`.${classes}`).forEach(country => {
            country.style.fill = "#354B9C";
        })
    })

    e.addEventListener("mouseleave", function () {
        const classes = e.className.baseVal.replace(/ /g, '.')
        document.querySelectorAll(`.${classes}`).forEach(country => {
            country.style.fill = "#D2D2D0";
        })
    })

    e.addEventListener("click", function () {
        var openModalBtn = document.getElementById('openModalBtn');
        const classes = e.className.baseVal.replace(/ /g, '.');
        const city = classes.split('.')[1];

        const existCity = availableCities.find(c => c.name === city);

        if (existCity) {
            loadImageByCity(existCity.name, existCity.sliders);
            openModalBtn.click();
        } else {
            showAlert();
        }
    });
});

function loadImageByCity(city, sliders) {
    var carouselInner = document.getElementById("carouselInner");

    const cityInformation = document.getElementById("city-info");
    cityInformation.src = `./assets/images/cities/${city}/information.png`;

    carouselInner.innerHTML = '';
    for (let i = 0; i < sliders; i++) {
        var carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");

        if (i === 0) {
            carouselItem.classList.add("active");
        }

        var image = document.createElement("img");
        image.classList.add("d-block", "w-100", "img-fluid");
        image.src = `./assets/images/cities/${city}/slider-${i + 1}.png`;
        image.alt = "Slide " + (i + 1);
        
        carouselItem.appendChild(image);
        carouselInner.appendChild(carouselItem);
    }

    const cityPlacesVisit = document.getElementById("city-places-visit");
    cityPlacesVisit.src = `./assets/images/cities/${city}/places-visit.png`;
}

function showAlert() {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'));
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
    });
    toastList.forEach(function (toast) { toast.show(); });
}