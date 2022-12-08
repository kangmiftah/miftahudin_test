
import fetch from 'node-fetch';
let APIKey = "";
let lat = "6.2088&";
let lng = "106.8456";

let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

async function main(){
  
   try {
      const rsp = await fetch(
         `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${APIKey}`
      )
      if (!rsp.ok) return console.log(`Error : ${rsp.status} - ${rsp.statusText}`)
      rsp = await rsp.json()

      console.log("Weather Forecast:")
      (rsp.list || []).forEach(function(data, i){
         let dateNow = new Date();
         console.log(`
            ${dateNow.getDate()+1} ${dateNow.getMonth()} ${dateNow.getFullYear()} : ${data?.temp?.day}
            `)
      })
   } catch (error) {
      console.log(error)
   }
}

main()