/* Global Variables */
const baseURL = "https://home.openweathermap.org/api_keys";
const ApiKey = "&appid=0558fc06f83b6f4d467b2e9cdaedd05f&units=imperial"; // Personal API Key for OpenWeatherMap API
// Create a new date instance dynamically with JS
let d = new Date(); 
let newDate =  d.getMonth() +1+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function called by event listener */
function generateData(){
    const Feelings = document.getElementById('feelings').value;
    const ZipCode = document.getElementById('zip').value;
    weatherData(baseURL, ZipCode , ApiKey)
    .then(function(data) {
        console.log(data);
        postData('/addData' , {date:newDate , temp:data.main.temp , content:Feelings})
        UpdateUI();
    })
};

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click' , generateData);

/* Function to GET Web API Data*/
const weatherData = async (baseURL, zip, key)=> {
    const res = await fetch(baseURL+zip+key)
    try{
        const data = await res.json();
        return data;
    }catch(error) {
        console.log("Error in system" , error)
    }
}

/* Function to POST data */
const postData = async (url = '' , data = {})=>{
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin' ,
        headers: {
            'Content-Type' : 'application/json' ,
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await res.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log('Error in system' , error)
    }
}

/* Function to GET Project Data */
const UpdateUI = async ()=> {
    const request = await fetch('/getData');
    try{
        const alldata = await request.json();
        document.getElementById('date').innerHTML =alldata.date;
        document.getElementById('temp').innerHTML = alldata.temp;
        document.getElementById('content').innerHTML =alldata.content;
    }catch(error) {
        console.log('Error in system' , error)
    }
}