const products = require("./assets/json/Products.json");
const users = require("./assets/json/Users.json");
const currentUserSession = require("./assets/json/CurrentUserSession.json");


//welocm greeting
function greetings() {
  obr = overallbedstrating();

  let movie1 = obr[0].name;
  let movie2 = obr[1].name;
  let movie3 = obr[2].name;

  let rate1 = obr[0].rating;
  let rate2 = obr[1].rating;
  let rate3 = obr[2].rating;

let topgreeting = `-------------------------------------------------
Our Top 3 Rated Movies this week is\n
${movie1} with a super rating of ${rate1}
${movie2} with a splendid rating of ${rate2}
${movie3} with a nice rating of ${rate3}
-------------------------------------------------`;
  console.log(topgreeting);

  currentUserSession.forEach((cuser) => {
    let theuser = getuser(cuser.userid);

    let name = theuser.name;
    let recommended = theuser.recommended;
    let keys = theuser.keywords;

    function recommovies(){
        let rrname=[];
  
        recommended.forEach((r) => {
        rrname.push(r.name+' Rated:'+r.rating+'\n');
   
        });
        rrname=rrname.join(' ')
       
        return rrname;

    }
let greeting = `=================================================
Hi there ${name}
We see you like '${keys.join(' ')}\n
So we have these recommendations for you \n${ recommovies()}
=================================================`;

    console.log(greeting);
  });
}

greetings();

/*get  user by id and get the info we need */
function getuser(id) {
  const user = users.find((object) => object.id === id);
  const curuser = currentUserSession.find((object) => object.userid === id);

  //let viewedAry = makearray(user.viewed);
  let purchasedAry = makearray(user.purchased);
  let keywords = getkeywords(purchasedAry);
  //let viewingkey = currentviewing(curuser.productid);
  let recommended = notpurchased(purchasedAry, keywords);

  let userinfo = {
    id: user.id,
    name: user.name,
    recommended: recommended,
    keywords: keywords,
  };

  return userinfo;
}

function overallbedstrating() {
  let bedstrating;

  bedstrating = products.sort((a, b) => Number(b.rating) - Number(a.rating));
  bedstrating = bedstrating.filter((notpurchasedmovies, i) => i < 3);

  return bedstrating;
}

function getkeywords(idforkeys) {
  let haspurchased = [];
  let haspurchasedkeys = [];

  idforkeys.forEach((key) => {
    haspurchased = products.filter((hv) => hv.id == key);
    haspurchasedkeys.push(...haspurchased[0].keywords);
  });

  haspurchasedkeys = haspurchasedkeys.filter((n) => n);
  haspurchasedkeys=haspurchasedkeys.sort()

  return getMostCommon(haspurchasedkeys);
}

//filetr out what user has purchased
function notpurchased(pary, vkey) {
  let notpurchasedmovies = [];
  products.forEach(function (a) {
    //get all movies that is not alredy in the purchasedAry
    if (!pary.includes(a.id)) {
      //get only the movies that include users top keywords
      if (vkey.some((i) => a.keywords.includes(i))) {
        notpurchasedmovies.push(a);
      }
    }
  });
  //sort on ratings
  notpurchasedmovies.sort((a, b) => Number(b.rating) - Number(a.rating));

  //get the three highest rated movies
  notpurchasedmovies = notpurchasedmovies.filter(
    (notpurchasedmovies, i) => i < 3
  );

  return notpurchasedmovies;
}

//current user product id
function currentviewing(id) {
  let curkey = products.filter((hv) => hv.id == id);
  let keys = curkey[0].keywords;

  return keys;
}

/*helper function to convert a string to array of numbers*/
function makearray(str) {
  let strnumbers = str.split(";").map(Number);
  return strnumbers;
}

/*
helper function to get most common keywords
of generes the user has viewed but not purchased
*/
function getMostCommon(array) {
  var count = {};
  array.forEach(function (a) {
    count[a] = (count[a] || 0) + 1;
  });
  return Object.keys(count).reduce(function (r, k, i) {
    if (!i || count[k] > count[r[0]]) {
      return [k];
    }
    if (count[k] === count[r[0]]) {
      r.push(k);
    }
    return r;
  }, []);
}
