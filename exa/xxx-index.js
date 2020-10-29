/*experisacademy.innoflow.io*/

/*Because it is easy, ill just require the json files */
let products = require("./assets/json/Products.json");
let users = require("./assets/json/Users.json");
let cus = require("./assets/json/CurrentUserSession.json");

/*find the highest rated movies */
function hrm() {
  /*filter on ratings no lower than 4.7 to get top 3 movies*/
  const ratings = products.filter((r) => r.rating > 4.7);

  console.log("\n" + "Our highest rated movies of the week" + "\n ");

  
  ratings.forEach((obj) => {
    console.log(
        obj.name +
        "\n" +
        "Have at nice rating of " +
        obj.rating
    );

    console.log("-------------------");
  });
}

hrm();

/*find most purchase movies */
const findmostpurchase = () => {
  let purchased = [];

  //first convert the purchased string to an array 
  users.forEach((obj) => {
    purchased.push(...obj.purchased.split(";"));
  });

  //Sort, find and store the duplicates/most purchased movies
  let sorted_purchased = purchased.slice().sort();

let results = [];
for (let i = 0; i < sorted_purchased.length - 1; i++) {
    if (sorted_purchased[i + 1] == sorted_purchased[i]) {
      results.push(sorted_purchased[i]);
    }
}

console.log("\n" + "You might also be interested in our most purchased movies of the week" + "\n ");

for (var i = 0; i < results.length; i++){
    //filter the most purchased movies   
    let mostPurchase = products.filter((r) => r.id == results[i]);
    
    console.log(mostPurchase[0].name+'\n Only '+mostPurchase[0].price+' Dkk.')
    console.log("-------------------");
}
  
};

findmostpurchase();




/*recomendet movie for each user*/

function getcursession(){


    
    cus.forEach((obj) => {
        
        let uid=obj.userid
        let curpid=obj.productid

        const curentusers = users.filter((cu) => cu.id === uid);
        let name=curentusers[0].name;
        let viewed=curentusers[0].purchased; //edit this to viewed
        
        recomendetmovies(name,viewed,curpid)

    });


}

function recomendetmovies(name,viewed,curpid){
  

    
    console.log(name)+'\n';
    
   
    /* viewed before */
    let vary=viewed.split(";")
    let hasviewed =[];
    let hasviewedkeys =[];
    for (i = 0; i < vary.length; i++) { 
      
        hasviewed = products.filter((hv) => hv.id == vary[i]);      
        hasviewedkeys.push(...hasviewed[0].keywords)
      
    }
   
    hasviewedkeys=hasviewedkeys.filter(n => n)
    compareKeywords(hasviewedkeys,curpid)
   
}

function compareKeywords(hasviewedkeys,curpid){
    
    /*find most viewed keyword*/
    let mosthasviewed =hasviewedkeys.sort((a,b) => hasviewedkeys.filter(v => v===a).length - hasviewedkeys.filter(v => v===b).length).pop();
    


    /* viewing now */
    let viewing = products.find(cv => cv.id === curpid);
    let viewingkeys=viewing["keywords"];

    
    //console.log(viewingkeys)
    //console.log('-----xxxx--------------')
    
  
    for (i = 0; i < viewingkeys.length; i++) {     
        if(viewingkeys[i]==mosthasviewed){
            console.log(viewingkeys[i]+' '+mosthasviewed)
        }else{
            console.log(mosthasviewed)
            return
        }
    }

}
    
getcursession() 

/*
function recomendetmovies(){






    
}



*/