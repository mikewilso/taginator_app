require('dotenv').config();


const Nightmare = require('nightmare'),
    nightmare = Nightmare({
        show: true,
        typeInterval: 25
});

const Promise = require('bluebird');

const user = process.env.AC_USER;
const pword = process.env.AC_PASS;

const affiliateId = process.argv[2];


module.exports = function(input_data){

    function logIntoAdCenter(){
        return nightmare
            .goto("http://adcenter.lijit.com/")
            .type("input[name=username]", user)
            .type("#passwordInput", pword)
            .click("button[type=submit]")
            .wait(3000)
    }

    function makeTheTag(tagName){

        const pFloor = pFloor;
        const size = 9;
        console.log(tagName)
        return nightmare
            .goto("http://adcenter.lijit.com/adminpublisher/search/zone/new/" + affiliateId)
            .refresh()
            .type("#userzonename", tagName)
            .evaluate(function() {
                document.querySelector('#cpmfloor').value = ''
            })
            .type("#cpmfloor", pFloor)
            .click("input[id=using_efp]")
            .click("input[id=international]")
            .select("#ad_type", size)
            .wait(1000);
    }

    const tag_names = ["testing_taginator_1", "testing_taginator_2", "testing_taginator_3"]

    function kickOffTaginator(){
        logIntoAdCenter()
        .then((()=> {
            return Promise.mapSeries(tag_names, makeTheTag)
                .catch(e => console.log(e))
        }))}

    //kickOffTaginator();
}