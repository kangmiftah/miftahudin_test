import readline from 'readline';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function getArray(length, page){
   let arr = []
   let maxData = page*10;
   if(length <10){
      maxData = length;
   } else if(maxData >= length){
      maxData = 100;
   }
   let first = ((page-1)*10)+1
   
   for(let i = first; i<= maxData; i++){
      let str = "";
      if(i%3 === 0) str = `${str}apa`;
      if(i%5 === 0) str = `${str}bole`;
      if(str === "") str = i
      arr = [...arr, str]
   }
   return {isNextPage: maxData >= length, arr, page, maxData, first};
}
function main(){
   rl.question("masukan jumlah array = ", function(length){
      let page = 1;
      let {isNextPage, arr,first, maxData} = getArray(length, page)
      console.log(`Array result in page ${page} [ ${first} - ${maxData} ]`)
      console.log(arr)
      if(isNextPage) rl.close();
      rl.setPrompt("next page ? (Y/N) ");
      rl.prompt();
      rl.on("line", (nextPage)=>{
         if(nextPage.toLowerCase() === "y".toLowerCase()){
            page++;
            let { isNextPage, arr, first, maxData } = getArray(length, page);
            console.log(`Array result in page ${page} [ ${first} - ${maxData} ]`)
            console.log(arr);
            console.log("\n");
            console.log("next page ? (Y/N) ");
            if(isNextPage) rl.close();
         }else{
            rl.close()
         }
      })
      // rl.question("next page ? (Y/N) ", function(ans){
      //    if(ans.toLowerCase() == ("Y").toLowerCase()){
      //       page++;
      //       arr = getArray(length, page);
      //    }else {
      //      rl.close()
      //    }
      // })
   })
   rl.on('close', function () {
      console.log('');
      process.exit(0);
   });
}

main()