/*
todo :
✔️ load json
✔️ current session
✔️ what is current user watching, have watched and purchased
✔️ mosthasviewed
✔️ match what current user is viewing with what current user has viewed most 

functions for
    highest rated recomandations
    matches most viewed not purchased recomandations
    not matches most viewed not purchased recomandations

greeting template with:    
    name
    highest rated recomandations    
    matches most viewed not purchased recomandations
    or
    not matches most viewed not purchased recomandations
*/ 


/*Because it is easy, and it is not something for production
i'll just require the json files */

let products = require("./assets/json/Products.json");
let users = require("./assets/json/Users.json");
let cus = require("./assets/json/CurrentUserSession.json");


/*get the current session */
function getcursession(){
    
   cus.forEach((obj) => {
        
        let uid=obj.userid
        let viewing=obj.productid

        const curentusers = users.filter((cu) => cu.id === uid);
       
        let id=curentusers[0].id;
        let name=curentusers[0].name;
        let purchased=curentusers[0].purchased;
        let viewed=curentusers[0].viewed; 
        
            purchased=purchased.split(";")
            viewed=viewed.split(";")

        curentuserslist(id,name,purchased,viewed,viewing)

    })


}
getcursession()



/*what is our current user watching, have watched and purchased */
function curentuserslist(id,name,purchased,viewed,viewing){
 
   /*create unique array from purchased & viewed of only viewed not purchased*/
    let uniqueArr = []; 
    let viewedNotPurchased=unique(purchased,viewed,uniqueArr) 

    let hasviewed =[];
    let hasviewedkeys =[];
    let hasviewedname =[];

    let isviewing=[]
    let isviewingkey=[]
    let isviewingname=[]

    /*what has been */
    for (i = 0; i < viewedNotPurchased.length; i++) { 
    
        hasviewed = products.filter((hv) => hv.id == viewedNotPurchased[i]);      
        hasviewedkeys.push(...hasviewed[0].keywords)
        hasviewedname.push(hasviewed[0].name)
      
    }
    //clean uot array of empty slots looks neat
    hasviewedkeys=hasviewedkeys.filter(n => n)

    //create  array from what current user is viewing*/
    isviewing = products.filter((iv) => iv.id == viewing); 
    isviewingkey.push(...isviewing[0].keywords)
    isviewingname.push(isviewing[0].name)

    /*Find the most viewed/purchased keyword for each user */
    mosthasviewed=hasviewedkeys.sort((a,b) => hasviewedkeys.filter(v => v===a).length - hasviewedkeys.filter(v => v===b).length).pop();
    

    for (i = 0; i < isviewingkey.length; i++) {    
      
        /* if what current user is viewing matches most viewed not purchased */
        if(isviewingkey[i]===mosthasviewed){
                console.log(name+'\n'+isviewingkey[i]+'--'+mosthasviewed)
        }

        /* if what current user is viewing do not matches most viewed not purchased */
        if(isviewingkey[i]!==mosthasviewed){
            console.log(name+'\n'+mosthasviewed)
            return
        }
    }

}



/*
helper function to create a unique arry from 
purchased and viewed to prevent recomadations on 
already purchased movies.
*/ 
function unique(arr1,arr2,uniqueArr) { 
    for(var i=0; i<arr1.length; i++) { 
        flag = 0; 
        for(var j=0; j<arr2.length; j++) { 
            if(arr1[i] === arr2[j]) { 
                arr2.splice(j,1); 
                j--; 
                flag = 1; 
            } 
        } 
  
        if(flag == 0) { 
            uniqueArr.push(arr1[i]); 
        } 
    } 
    uniqueArr.push(arr2); 
  
    return uniqueArr.flat(); 
}
