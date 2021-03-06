const taginator = require('./taginate.js');
    
var aid, tag_names, price_floor, file_name, efp;

function validateForm(){
    let validForm = true;

//grab values from DOM
    aid = document.getElementById("affiliate_id").value;
    tag_names = document.getElementById("tag_names").value;
    price_floor = document.getElementById("price_floor").value;
    file_name = document.getElementById("file_name").value;

//validate affiliate ID -- only numbers
    if(aid.length === 0){
        errorMessage("affiliate_id_help", "Please input affiliate ID");
        validForm = false;
    }
    else if(isNaN(aid)){
        errorMessage("affiliate_id_help", "Affiliate ID should only be numbers");
        validForm = false;
    }
    else {
        successMessage("affiliate_id_help", "Affiliate ID Valid" )
    }

//validate tagNames -- each tag name has valid size
    let tagNameArray = tag_names.split("\n");
    tagNameArray = filterBlanks(tagNameArray);

    if(tagNameArray.length === 0){
        errorMessage("tag_name_help", "Please paste tags above");
        validForm = false;
    }
    else if(!tagsHaveSizes(tagNameArray)){
        errorMessage("tag_name_help", buildErrorMessage(tagNameArray, "missing"))
        validForm = false;
    }
    else if(!tagSizesValid(tagNameArray)){
        errorMessage("tag_name_help", buildErrorMessage(tagNameArray, "invalid"))
        validForm = false;
    }
    else {
        successMessage("tag_name_help", "Tag Names Valid");
    }
    
//validate pricefloor -- just a number
    if(isNaN(price_floor) || price_floor > 5 || price_floor < 0 || price_floor === ""){
        errorMessage("price_floor_help", "Price floor should be a number between 0 - 5");
        validForm = false;
    }
    else {
        successMessage("price_floor_help", "Price Floor Valid");
    }

//validate file name -- no spaces
    if(file_name.length === 0){
        errorMessage("file_name_help", "Please input file name");
        validForm = false;

    }

    else if(file_name.indexOf(" ") != -1){
        errorMessage("file_name_help", "File name should contain no spaces");
        validForm = false;
    }
    else {
        successMessage("file_name_help", "File Name Valid");
    }

    return validForm;
}

function startTaginator(){
    alert("Put code information here to confirm");
    let data = {};
    data.aid = document.getElementById("affiliate_id").value;
    data.tag_names =  createTagObjectsArray(filterBlanks(document.getElementById("tag_names").value.split("\n")));
    data.price_floor = document.getElementById("price_floor").value;
    data.file_name = document.getElementById("file_name").value;
    data.efp = document.getElementById("efp").checked;
    data.header_tags = document.getElementById("header_tags").checked;
    console.log(data);
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

function errorMessage(id, message){
    let element = document.getElementById(id);
        element.classList.remove("text-muted");
        element.classList.remove("input_valid");
        element.classList.add("validation_error");
        element.innerHTML = message;
}

function successMessage(id, message){
    let element = document.getElementById(id);
        element.classList.remove("validation_error");
        element.classList.remove("text-muted");
        element.classList.add("input_valid");
        element.innerHTML = message;
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

function createTagObjectsArray(tagNames){
    let tagObjectArray = [];
    for(let i = 0; i < tagNames.length; i++){
        let currentObj = {};
        currentObj.name = tagNames[i];
        currentObj.size = tagNames[i].match(/\d+[xX]\d+/)[0];
        currentObj.size_code = getSizeId(tagNames[i].match(/\d+[xX]\d+/)[0]);
        tagObjectArray.push(currentObj);
    }
    return tagObjectArray;
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
        if(getSizeId(currentSize) === undefined){
            return false;
        }
        else continue;
    }
    return true;
}


function getSizeId(size){
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