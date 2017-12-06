require('./taginate.js');
    
var aid, tag_names, price_floor, file_name, efp;

function validateForm(){
    let validForm = true;

//grab values from DOM
    aid = document.getElementById("affiliate_id").value;
    tag_names = document.getElementById("tag_names").value;
    price_floor = document.getElementById("price_floor").value;
    file_name = document.getElementById("file_name").value;
    efp = document.getElementById("efp").value;

//validate affiliate ID -- only numbers
    if(aid.length === 0){
        let element = document.getElementById("affiliate_id_help");
        element.classList.remove("text-muted");
        element.classList.remove("input_valid");
        element.classList.add("validation_error");
        element.innerHTML = "Please input affiliate ID";
        validForm = false;
    }
    else if(isNaN(aid) || aid.length === 0){
        let element = document.getElementById("affiliate_id_help");
        element.classList.remove("text-muted");
        element.classList.remove("input_valid");
        element.classList.add("validation_error");
        element.innerHTML = "Affiliate ID should only be numbers";
        validForm = false;
    }
    else {
        let element = document.getElementById("affiliate_id_help");
        element.classList.remove("validation_error");
        element.classList.remove("text-muted");
        element.classList.add("input_valid");
        element.innerHTML = "Affiliate ID Valid";
    }

//validate tagNames -- each tag name has valid size
    let tagNameArray = tag_names.split("\n");
    tagNameArray = filterBlanks(tagNameArray);

    if(tagNameArray.length === 0){
        let element = document.getElementById("tag_name_help");
        element.classList.remove("input_valid");
        element.classList.remove("text-muted");
        element.classList.add("validation_error");
        element.innerHTML = "Please paste tags above";
        validForm = false;
    }

    else if(!tagsHaveSizes(tagNameArray)){
        let element = document.getElementById("tag_name_help");
        element.classList.remove("input_valid");
        element.classList.remove("text-muted");
        element.classList.add("validation_error");
        element.innerHTML = buildErrorMessage(tagNameArray, "missing");
        validForm = false;
    }
    else if(!tagSizesValid(tagNameArray)){
        let element = document.getElementById("tag_name_help");
        element.classList.remove("input_valid");
        element.classList.remove("text-muted");
        element.classList.add("validation_error");
        element.innerHTML = buildErrorMessage(tagNameArray, "invalid");
        validForm = false;
    }
    else {
        let element = document.getElementById("tag_name_help");
        element.classList.remove("validation_error");
        element.classList.remove("text-muted");
        element.classList.add("input_valid");
        element.innerHTML = "Tag Names Valid";
    }
    
//validate pricefloor -- just a number
    if(isNaN(price_floor) || price_floor > 5 || price_floor < 0 || price_floor === ""){
        let element = document.getElementById("price_floor_help");
        element.classList.remove("input_valid");
        element.classList.remove("text-muted");
        element.classList.add("validation_error");
        element.innerHTML = "Price floor should be a number between 0 - 5";
        validForm = false;
    }
    else {
        let element = document.getElementById("price_floor_help");
        element.classList.remove("text-muted");
        element.classList.remove("validation_error");
        element.classList.add("input_valid");
        element.innerHTML = "Price Floor Valid";
    }

//validate file name -- no spaces
    if(file_name.length === 0){
        let element = document.getElementById("file_name_help");
        element.classList.remove("input_valid");
        element.classList.remove("text-muted");
        element.classList.add("validation_error");
        element.innerHTML = "Please input file name";
        validForm = false;
    }

    else if(file_name.indexOf(" ") != -1){
        let element = document.getElementById("file_name_help");
        element.classList.remove("input_valid");
        element.classList.remove("text-muted");
        element.classList.add("validation_error");
        element.innerHTML = "File name should contain no spaces";
        validForm = false;
    }
    else {
        let element = document.getElementById("file_name_help");
        element.classList.remove("text-muted");
        element.classList.remove("validation_error");
        element.classList.add("input_valid");
        element.innerHTML = "File Name Valid";
    }

    return validForm;
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