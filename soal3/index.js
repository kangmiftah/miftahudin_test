import mysql from "mysql";

var con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "test2",
});
con.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");
});

async function main() {
   con.query(
      `
      select ct2 .id , ct2.title as task_title , ct2.description as task_description, b.labels from crm_tasks ct2  join (
         select
            case 
               when cl.id is null then cast( '[]' as json )
               else JSON_ARRAYAGG(JSON_OBJECT(
                  'id',cl.id, 'title', cl.title, 'color', cl.color
               ))
            end as labels, ct.id 
            from crm_tasks ct 
            left join crm_labels cl 
            on cl.title = ct.labels group by ct.id  
         ) 
      as b on b.id = ct2 .id ;
   `,
      function (err, result) {
         if (err) throw err
         console.log(result);
      }
   );
   con.end((err)=> {
      if(err) throw err;
      console.log("\n")
      console.log("Thanks for test")
   })
}

main();
