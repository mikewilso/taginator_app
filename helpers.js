require('./taginate.js');
    
var aid, tag_names, price_floor, efp;

function validateForm(){

    //grab values from DOM
    aid = document.getElementById("affiliate_id").value;
    tag_names = document.getElementById("tag_names").value;
    price_floor = document.getElementById("price_floor").value;
    efp = document.getElementById("efp").value;

    //validate affiliate ID -- only numbers
    if(isNaN(aid) || aid.length === 0){
        let element = document.getElementById("affiliate_id_help");
        element.classList.remove("text-muted");
        element.classList.add("validation_error");
        element.innerHTML = "AFFILIATE ID SHOULD ONLY BE NUMBERS";
        return false;
    }

    //validate tagNames -- each tag name has valid size
    let tagNameArray = tag_names.split("\n");
    tagNameArray = filterBlanks(tagNameArray);

    if(!tagsHaveSizes(tagNameArray) || tagNameArray.length === 0){
        let element = document.getElementById("tag_name_help");
        element.classList.remove("text-muted");
        element.classList.add("validation_error");
        element.innerHTML = buildErrorMessage(tagNameArray, "missing");
        return false;
    }
    else if(!tagSizesValid(tagNameArray)){
        let element = document.getElementById("tag_name_help");
        element.classList.remove("text-muted");
        element.classList.add("validation_error");
        element.innerHTML = buildErrorMessage(tagNameArray, "invalid");
        return false;
    }
    alert("validations passed");
    //changed to false for troubleshooting
    return false;
    
    //validate pricefloor -- just a number
    //validate file name -- no spaces
}


function buildErrorMessage(arr, type){

    if(type === "missing"){
        let errorString = "The following tag names are missing sizes:<br>";
        for(let i = 0; i < arr.length; i++){
            if(!arr[i].match(/\d+[xX]\d+/)){
                errorString += "• " + arr[i] + "<br>";
            }
            else continue;
        }
        return errorString;
    }

    if(type === "invalid"){
        let errorString = "The following tag names have invalid sizes:<br>";
        for(let i = 0; i < arr.length; i++){
            let currentSize = arr[i].match(/\d+[xX]\d+/)[0];
            if(getSizeId(currentSize) === undefined){
                errorString += "• " + arr[i] + "<br>";
            }
            else continue;
        }
        return errorString;
    }
}


function filterBlanks(arr){
    let blanklessArray = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === ""){
            continue;
        }
        else blanklessArray.push(arr[i]);
    }
    return blanklessArray;
}



function tagsHaveSizes(arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].match(/\d+[xX]\d+/) === null){
            return false;
        }
        else continue;
    }
    return true;
}

function tagSizesValid(arr){
    for(let i = 0; i < arr.length; i++){
        let currentSize = arr[i].match(/\d+[xX]\d+/)[0];
        console.log(currentSize);
        if(getSizeId(currentSize) === undefined){
            return false;
        }
        else continue;
    }
    return true;
}


function getSizeId(size){
    console.log(size);
    console.log(typeof(size));
    //toLowerCase() is the issue right now.  TypeError... BUT WHYYYYY
    let standardizedSize = size.toLowerCase();
    const sizeIdKey = {
        "120x600": 42,
        "160x90": 45,
        "768x640": 44,
        "468x60": 38,
        "970x250": 33,
        "300x600": 22,
        "336x280": 40,
        "728x90": 20,
        "300x250": 9,
        "300x1050": 39,
        "250x250": 37,
        "970x90": 34,
        "160x600": 8,
        "320x100": 35,
        "320x50": 25,
        "300x50": 36,
        "320x480": 43
    };
    return sizeIdKey[standardizedSize];
}


function hasValidSize(tagName){
    if(tagName.match(/\d+[xX]\d+/)){
        alert("Tag name " + tagName + " does not contain a size.");
    }
    else if (getSizeId(tagName.match(/\d+[xX]\d+/)) == null){
        alert("Tag name " + tagName + "does not contain a valid size.")
    }
    else continue;
}