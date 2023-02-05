







let SHEET_ID = "1yDfCGLJOB8VSFb-0gM-HRK8oDHwbyAE-2q7je6-RwDA";
let SHEET_TITLE = "Sheet1";
let SHEET_TITLE2 = "Sheet2";
let SHEET_RANGE = "A2:B1000";
let SHEET_RANGE1 = "C2:E1000";
let SHEET_RANGE2 = "A2:F1000";
let ar1 = ["-"];
let ar2 = ["-"];
let ar3 = ["-"];
let reflist = [];


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
        console.log(ar1);

        for (let i = 0; i < ar1.length; i++) {
            // b1.innerHTML += data.table.rows[i].c[1].v +"<br>";
            var x = document.getElementById("list");
            var option = document.createElement("option");
            option.text = ar1[i];
            x.add(option);

        }

        for (let i = 0; i < data.table.rows.length; i++) {
            if (!ar2.includes(data.table.rows[i].c[0].v)) {
                ar2.push(data.table.rows[i].c[0].v);
            }
        }
        ar2.sort();


        for (let i = 0; i < ar2.length; i++) {
            // b1.innerHTML += data.table.rows[i].c[1].v +"<br>";
            var x = document.getElementById("list1");
            var option = document.createElement("option");
            option.text = ar2[i];
            x.add(option);

        }




    })

fetch(FULL_URL1)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));


        for (let i = 0; i < data.table.rows.length; i++) {
            if (!ar3.includes(data.table.rows[i].c[1].v)) {
                ar3.push(data.table.rows[i].c[1].v);
            }
        }


        for (let i = 0; i < ar3.length; i++) {
            // b1.innerHTML += data.table.rows[i].c[1].v +"<br>";
            var x = document.getElementById("list2");
            var option = document.createElement("option");
            option.text = ar3[i];
            x.add(option);

        }



    })

fetch(FULL_URL2)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));


        for (let i = 0; i < data.table.rows.length; i++) {

            reflist.push(data.table.rows[i].c[4].v);

        }
        console.log(reflist)
    })

function getRandomNumber(exclude) {
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    while (exclude.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 10) + 1;
    }
    return randomNumber;
}


//   console.log(getRandomNumber(exclude));




function handleSubmit(event) {
    event.preventDefault();
    const scenarioInput = document.getElementById("list2").value;
    // console.log(document.getElementById("list").options[document.getElementById("list").selectedIndex].text);
    // document.getElementById("op-text").innerHTML = scenarioInput;
    let phno = document.getElementById("textInput").value;
    let batch = document.getElementById("list").options[document.getElementById("list").selectedIndex].text;

    let agentid = document.getElementById("list1").options[document.getElementById("list1").selectedIndex].text;
    let scenarioip = scenarioInput

    fetch(FULL_URL1)
        .then(res => res.text())
        .then(rep => {
            let data = JSON.parse(rep.substr(47).slice(0, -2));
            let randomNumber = Math.floor(Math.random() * 105) + 1;
            let exclude = [];
            let inputcheck = agentid+"_"+batch+"-"+scenarioip;

            let filteredData = reflist.filter(item => item.startsWith(inputcheck));
            let numbers = filteredData.map(item => parseInt(item.split("-")[1]));
            numbers.sort(function (a, b) { return a - b });
            console.log(numbers)
            
            // for (let i = 1; i < data.table.rows.length; i++) {

            // }



            for (let i = 0; i < data.table.rows.length; i++) {
                if (scenarioip == data.table.rows[i].c[1].v) {
                    document.getElementById("op-text").innerHTML = data.table.rows[i].c[2].v + "<br>"
                    document.getElementById("op-text").innerHTML += document.getElementById("list").options[document.getElementById("list").selectedIndex].text;
                }
            }




        })
    fetch("https://drab-erin-ladybug-vest.cyclic.app/" + phno+"/"+agentid + "/" + batch, {
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
