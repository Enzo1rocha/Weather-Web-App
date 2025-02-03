// Variaveis

const errorView404 = window.document.getElementById('div-error-404');

const ReloadLocationSearch = window.document.getElementById('location-search')

const ClearInput = window.document.getElementById('button-delete')

const containerInformações = window.document.querySelector('.container-more-informations')
const containerInformaçõesVisuais = window.document.querySelector('.container-datas')

const SearchForm = window.document.getElementById('search')
const SearchInput = window.document.getElementById('search-input')

const apiKey = 'c58f05df6f8303cd7c6dec1a9de9f47b'

// Funções

async function pegarDados(City) {
    let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&lang=pt_br&appid=c58f05df6f8303cd7c6dec1a9de9f47b`)
    
    if (resp.status == 200) {
        if (errorView404.style.display != 'none') {
            errorView404.style.display = 'none'
        }

        let data = await resp.json();  

        RenderizarDados(
            {
                city: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                tempMax: data.main.temp_max,
                tempMin: data.main.temp_min,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                windSpeed: data.wind.speed,
                humidity: data.main.humidity,
            }
            )
    } else {
        errorView404.style.display = 'block'

        if (containerInformações.style.display != 'none' && containerInformaçõesVisuais.style.display != 'none') {
            containerInformações.style.display = 'none'
            containerInformaçõesVisuais.style.display = 'none'
        }
        
    }
    
}

function RenderizarDados(json) {

    containerInformações.style.display = 'grid'
    containerInformaçõesVisuais.style.display = 'grid'
    
    const CityTitle = window.document.getElementById('city-title')
    const Temperature = window.document.querySelector('#temperature')
    const sky = window.document.getElementById('sky')
    const skyimg = window.document.getElementById('img-wn')
    const maxTemp = window.document.getElementById('maxTemp')
    const minTemp = window.document.getElementById('minTemp')
    const humidity = window.document.getElementById('humidity')
    const wind = window.document.getElementById('wind-value')

    CityTitle.textContent = `${json.city}, ${json.country}`
    Temperature.textContent = `${Math.ceil(json.temp)} C°`
    sky.textContent = `${json.description}`
    skyimg.src = `https://openweathermap.org/img/wn/${json.icon}@2x.png`
    maxTemp.textContent = `${Math.ceil(json.tempMax)} C°`
    minTemp.textContent = `${Math.ceil(json.tempMin)} C°`
    humidity.textContent = `${json.humidity}%`
    wind.textContent = `${json.windSpeed} km/h`
    
}


// Eventos

SearchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let City = SearchInput.value
    pegarDados(City)
})

ReloadLocationSearch.addEventListener('click', function (e) {
    location.reload()
})

SearchInput.addEventListener('input', function(e) {
    if (SearchInput.value.trim() !== "") {
        ClearInput.style.display = 'block';
        ClearInput.addEventListener('click', () => {
            SearchInput.value = ''
            ClearInput.style.display = 'none';
        })
    } else {
        ClearInput.style.display = 'none'
        console.log("O input está vazio!");
    }
})