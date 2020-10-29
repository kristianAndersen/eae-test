
/*Because it is easy, and it is not somthing for production
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
 

   /*create unique array*/
    let uniqueArr = []; 
    let purwed=unique(purchased,viewed,uniqueArr) 
   
    let hasviewed =[];
    let hasviewedkeys =[];
    let hasviewedname =[];

    let isviewing=[]
    let isviewingkey=[]
    let isviewingname=[]

    for (i = 0; i < purwed.length; i++) { 
    
        hasviewed = products.filter((hv) => hv.id == purwed[i]);      
        hasviewedkeys.push(...hasviewed[0].keywords)
        hasviewedname.push(hasviewed[0].name)
      
    }
    //clean up array of empty stuff
    hasviewedkeys=hasviewedkeys.filter(n => n)


    isviewing = products.filter((iv) => iv.id == viewing); 
    isviewingkey.push(isviewing[0].keywords)
    isviewingname.push(isviewing[0].name)

    /*Find the most viewed/purchased keyword for each user */
    let mosthasviewed =hasviewedkeys.sort((a,b) => hasviewedkeys.filter(v => v===a).length - hasviewedkeys.filter(v => v===b).length).pop();

    //console.log(name+'\n'+mosthasviewed+'\n'+isviewingkey+'\n'+hasviewedkeys+'\n\n')
 console.log(isviewingkey)
        if(){

        }else{

            
        } 
    
    
    
    //console.log(name+'\n'+mosthasviewed)

    /*
    console.log('-----------------------')
    console.log(name)
    console.log('has viewed')
    console.log(hasviewedname+'\n')
    console.log(hasviewedkeys)

    console.log('-----------------------')
    console.log('Is viewing')
    console.log(isviewingname+'\n')
    console.log(isviewingkey.flat())
    console.log('-----------------------')
    console.log('\n')
    //console.log(viewing)
*/

}

function getkeywords(){






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