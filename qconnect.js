let SHEET_ID = "1yDfCGLJOB8VSFb-0gM-HRK8oDHwbyAE-2q7je6-RwDA";
let SHEET_TITLE = "Scenario_and_Team_Data";
let SHEET_TITLE2 = "Data";
let SHEET_RANGE = "T2:U5000";
let SHEET_RANGE1 = "C108:E279";
let SHEET_RANGE2 = "A3592:G6000";
let ar1 = ["-"];
let ar2 = ["-"];
let ar3 = [];
let reflist = [];
let scenariono = [];
let exclude = [];
let namelist = '';
let agent_id = '';

// email select dropdown element
const emailSelect = document.getElementById('namelist');

// batch select dropdown element
const batchSelect = document.getElementById('list1');
let dropdownselect = ''


let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);
let FULL_URL1 = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE1);
let FULL_URL2 = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE2 + '&range=' + SHEET_RANGE2);


fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));
        // console.log(rep)
        // console.log(data.table.rows[0].c[1].v);
        // console.log(data.table.rows[1].c[1].v);
        // console.log(data.table.rows.length);

        for (let i = 0; i < data.table.rows.length; i++) {
            if (!ar1.includes(data.table.rows[i].c[1].v)) {
                ar1.push(data.table.rows[i].c[1].v);
            }
        }
        ar1.sort();
        // console.log(ar1.length);

        for (let i = 0; i < ar1.length; i++) {
            namelist += '<option value="' + ar1[i] + '" />';

        }
        let x = document.getElementById("list");
        x.innerHTML = namelist;

        // for (let i = 0; i < data.table.rows.length; i++) {
        //     if (!ar2.includes(data.table.rows[i].c[0].v)) {
        //         ar2.push(data.table.rows[i].c[0].v);
        //     }
        // }
        // ar2.sort();


        // for (let i = 0; i < ar2.length; i++) {
        //     // b1.innerHTML += data.table.rows[i].c[1].v +"<br>";
        //     var x = document.getElementById("list1");
        //     var option = document.createElement("option");
        //     option.text = ar2[i];
        //     x.add(option);

        // }




    })

fetch(FULL_URL1)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));


        for (let i = 0; i < data.table.rows.length; i++) {
            if (!ar3.includes(data.table.rows[i].c[0].v)) {
                ar3.push(data.table.rows[i].c[0].v);
            }
        }
        // console.log(ar3)

        // for (let i = 0; i < ar3.length; i++) {
        //     // b1.innerHTML += data.table.rows[i].c[1].v +"<br>";
        //     var x = document.getElementById("list2");
        //     var option = document.createElement("option");
        //     option.text = ar3[i];
        //     x.add(option);

        // }



    })

fetch(FULL_URL2)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));


        for (let i = 0; i < data.table.rows.length; i++) {

            reflist.push(data.table.rows[i].c[4].v);

        }
        // console.log(reflist)
    })
//Phone number check if blank
const phoneNumberField = document.getElementById("textInput");

phoneNumberField.addEventListener('blur', function () {
    const phoneNumber = this.value.trim();

    if (phoneNumber.length === 0) {
        alert('Please enter a phone number');
    } else if (phoneNumber.length !== 10) {
        alert('Please enter a 10-digit phone number');
    }
});



//*******************test*/
async function updateBatchSelect(email1) {
    let response2 = await fetch(FULL_URL);
    let rep2 = await response2.text();
    let data2 = JSON.parse(rep2.substr(47).slice(0, -2));

    for (let i = 0; i < data2.table.rows.length; i++) {
        if (email1 === data2.table.rows[i].c[1].v) {
            dropdownselect = data2.table.rows[i].c[0].v
        }
    }

    // update the batch select dropdown
    batchSelect.options.length = 0
    let option = document.createElement("option");
    option.text = dropdownselect;
    batchSelect.add(option);

    // batchSelect.value = dropdownselect;
    // console.log(dropdownselect)
}

// event listener for the email select dropdown
emailSelect.addEventListener('change', (event) => {
    let email1 = event.target.value;
    updateBatchSelect(email1);
});

//********************test end*/






//   console.log(getRandomNumber(exclude));




async function handleSubmit(event) {
    event.preventDefault();
    let submitBtn = document.getElementById("submit");
    submitBtn.disabled = true; // disable the submit button
    submitBtn.style.backgroundColor = "#ccc"; // change the background color of the button
    submitBtn.style.cursor = "not-allowed"; // set the cursor to "not-allowed"
    submitBtn.innerText = "Submitting..."; // change the text on the button
    
    setTimeout(function() {
      submitBtn.disabled = false; // enable the submit button
      submitBtn.style.backgroundColor = ""; // reset the background color of the button
      submitBtn.style.cursor = ""; // reset the cursor to default
      submitBtn.innerText = "Submit"; // change the text on the button back to original
    }, 2500); // 5000 milliseconds = 5 seconds


    // console.log(document.getElementById("list").options[document.getElementById("list").selectedIndex].text);
    // document.getElementById("op-text").innerHTML = scenarioInput;
    let phno = document.getElementById("textInput").value;
    agent_id = document.getElementById("namelist").value;
    const phoneNumber = document.getElementById("textInput");
    // console.log(agent_id)

    let batch = document.getElementById("list1").options[document.getElementById("list1").selectedIndex].text;


    let responseidk = await fetch(FULL_URL1);
    let repidk = await responseidk.text();
    let dataidk = JSON.parse(repidk.substr(47).slice(0, -2));
    // console.log(dataidk)

    //for scenario->scenario number


    // let randomNumber = Math.floor(Math.random() * data.table.rows.length) + 1;
    // console.log(randomNumber)

    // scenariono = data.table.rows[randomNumber].c[0].v;


    let response1 = await fetch(FULL_URL2);
    let rep1 = await response1.text();
    let data1 = JSON.parse(rep1.substr(47).slice(0, -2));
    reflist = []
    exclude = []
    for (let i = 0; i < data1.table.rows.length; i++) {

        reflist.push(data1.table.rows[i].c[4].v);

    }

    // console.log(reflist.length)
    for (let i = 0; i < reflist.length; i++) {
        if (reflist[i].startsWith(agent_id)) {
            exclude.push(reflist[i])
        }

    }
    // console.log(phoneNumber.length)
    //check if phone number is empty or email id is not in the list
    if (phoneNumber.value == '' || ar1.indexOf(agent_id) == -1) {
        alert('Please enter a phone number/email address');
    }
    else {
        let temparray=[];
        for (let i=0;i<dataidk.table.rows.length; i++){
            temparray[i]=agent_id+"*"+dataidk.table.rows[i].c[0].v;
        }
        console.log(temparray);
        console.log(exclude);
        // console.log(exclude.length)
        if (temparray.every(element => exclude.includes(element))) {
            let result = "List completed";
            document.getElementById("op-text").innerHTML = result
            console.log(result)
        }
        else {

            let result = Math.floor(Math.random() * ar3.length + 1);
            let result1 = agent_id + "*" + (result+ar3[0]-1);
            // console.log(exclude)
            while (exclude.includes(result1)) {
                result = Math.floor(Math.random() * ar3.length + 1);
                result1 = agent_id + "*" + (result+ar3[0]-1);
            }
            console.log(result1)
            scenariono = result+ar3[0]-1;
            console.log(scenariono)
            console.log(dataidk.table.rows[result - 1].c[2].v)
            document.getElementById("op-text").innerHTML = dataidk.table.rows[result - 1].c[2].v
            // document.getElementById("op-text").innerHTML += document.getElementById("list").options[document.getElementById("list").selectedIndex].text;





            fetch("https://drab-erin-ladybug-vest.cyclic.app/" + phno + "/" + agent_id + "/" + batch + "/" + scenariono, {
                "method": "GET"
            })
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

}

const copyBtn = document.querySelector("#copy-btn");
const opText = document.querySelector("#op-text");

copyBtn.addEventListener("click", function () {
    const range = document.createRange();
    range.selectNode(opText);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
});
