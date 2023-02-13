

let SHEET_ID = "1yDfCGLJOB8VSFb-0gM-HRK8oDHwbyAE-2q7je6-RwDA";
let SHEET_TITLE = "Sheet1";
let SHEET_TITLE2 = "Sheet2";
let SHEET_RANGE = "A2:B1000";
let SHEET_RANGE1 = "C2:E1000";
let SHEET_RANGE2 = "A2:F1000";
let ar1 = ["-"];
let ar2 = ["-"];
let ar3 = [];
let reflist = [];
let scenariono = [];
let exclude = [];
// email select dropdown element
const emailSelect = document.getElementById('list');

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
        console.log(data.table.rows[0].c[1].v);
        console.log(data.table.rows[1].c[1].v);
        console.log(data.table.rows.length);

        for (let i = 0; i < data.table.rows.length; i++) {
            if (!ar1.includes(data.table.rows[i].c[1].v)) {
                ar1.push(data.table.rows[i].c[1].v);
            }
        }
        ar1.sort();
        // console.log(ar1);

        for (let i = 0; i < ar1.length; i++) {
            // b1.innerHTML += data.table.rows[i].c[1].v +"<br>";
            var x = document.getElementById("list");
            var option = document.createElement("option");
            option.text = ar1[i];
            x.add(option);

        }

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
        console.log(ar3)

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
    var option = document.createElement("option");
    option.text = dropdownselect;
    batchSelect.add(option);

    // batchSelect.value = dropdownselect;
    console.log(dropdownselect)
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
    // console.log(document.getElementById("list").options[document.getElementById("list").selectedIndex].text);
    // document.getElementById("op-text").innerHTML = scenarioInput;
    let phno = document.getElementById("textInput").value;
    let agent_id = document.getElementById("list").options[document.getElementById("list").selectedIndex].text;

    let batch = document.getElementById("list1").options[document.getElementById("list1").selectedIndex].text;

    //for scenario->scenario number
    let response = await fetch(FULL_URL1);
    let rep = await response.text();
    let data = JSON.parse(rep.substr(47).slice(0, -2));

    let randomNumber = Math.floor(Math.random() * 105) + 1;
    console.log(randomNumber)

    scenariono = data.table.rows[randomNumber].c[0].v;


    let response1 = await fetch(FULL_URL2);
    let rep1 = await response1.text();
    let data1 = JSON.parse(rep1.substr(47).slice(0, -2));

    for (let i = 1; i < reflist.length; i++) {
        if (reflist[i].startsWith(agent_id)) {
            exclude.push(reflist[i])
        }

    }
    if (exclude.length === ar3.length) {
        let result = "List completed";
        console.log(result)
    }
    let result = ar3[Math.floor(Math.random() * ar3.length)];
    while (exclude.includes(result)) {
        result = ar3[Math.floor(Math.random() * ar3.length)];
    }
    console.log(result)
    scenariono=result


    document.getElementById("op-text").innerHTML = data.table.rows[scenariono].c[2].v + "<br>"
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

exclude=[];
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
