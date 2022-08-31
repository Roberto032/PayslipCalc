
port=4000;

const subButton = document.getElementById('get')  //fetching button from html


const baseUrl = 'http://localhost:'+port+"/"

subButton.addEventListener('click', calculatePaySlip(userAge, userSalary))
async function getInfo(e){
    e.preventDefault();
    const res = await fetch(baseUrl,
    {
        method:'GET'
    })
    console.log(res)
    


}


const fork_you = function (name) {
    console.log(`Fork ${(name.find('louis')? 'you': name )}`);
}

fork_you(`louis`);



// var age = 60;

// var annualAmount = 92500.00;


function calcRebate(age) {   //calculating age dependant rebate 
    rebate = 0.0;
    if (age < 65) {
        rebate = 16425.00;
    } else if (age >= 65 && age < 75) {
        rebate = 16425.00 + 9000.00;
    } else if (age >= 75) {
        rebate = 16425.00 + 9000.00 + 2997.00;
    }


    return rebate;
}



function calcUIF(annualAmount) {   //calculating rebate on annual earning and dividing by 12 to get monthly amount
    UIF = 0.0;
    if (annualAmount > 212544.00) {
        UIF = 212544.00 * 0.01
    } else {
        UIF = annualAmount * 0.01
    }
    monthlyUIF = UIF / 12
    return monthlyUIF;
}

function calcPAYE(annualAmount,rebate) { //calculating PAYE Based on tax bracket
    var paye = 0.0;
    let taxBracketTable = [
        //min           max              rate             %
        [0.0,           226000.00,       0.0,           0.18],
        [226000.00,     353100.00,       40680.00,      0.26],
        [353100.00,     488700.00,       73726.00,      0.31],
        [488700.00,     641400.00,       115762.00,     0.36],
        [641400.00,     817600.00,       170734.00,     0.39],
        [817600.00,     1731600.00,      239452.00,     0.41],
        [1731600.00,    -1.0,            614192.00,     0.45]

    ]


    for (let i = 0; i < taxBracketTable.length; i++) {  //if annual amount does not include the largest tax bracket caluclation
        
        if (taxBracketTable[i][1] != -1) {
            if (annualAmount >= taxBracketTable[i][0] && annualAmount <= taxBracketTable[i][1]) {

                paye = (taxBracketTable[i][2] + ((taxBracketTable[i][3] * (annualAmount - taxBracketTable[i][0])) - rebate)) / 12;
                // console.log(paye)
                
            }
        } else {
            if (annualAmount >= taxBracketTable[i][0]) {  //if annual amount includes the largest tax bracket caluclation

                paye = (taxBracketTable[i][2] + ((taxBracketTable[i][3] * (annualAmount - taxBracketTable[i][0])) - rebate)) / 12;
                // console.log(paye)
                
            }
        }

    }

    return paye
}


function calcAgeThreshold(age) { // calculating age dependant threshold for PAYE
    threshold = 0.0;
    if (age <= 64) {
        threshold = 91250;
    } else {
        if (age >= 65 && age <= 74) {
            threshold = 141250;
        } else {
            if (age >= 75) {
                threshold = 157900;
            }
        }
    }
 return threshold
}


 function calculatePaySlip() { 
    
    var userAge = document.getElementById('userAge').value; //fetching elements from html
    var userSalary = document.getElementById('userSalary').value;

    userSalary =userSalary*12  //multiplying user input of montly salary to get annual ammount

    var finalThreshold = (calcAgeThreshold(userAge))
    var finalRebate = calcRebate(userAge)
    var finalPaye =calcPAYE(userSalary,finalRebate)*12
    var finalAnnualUIF = calcUIF(userSalary)*12
    var finalTakeHome = 0

    if (userSalary>finalThreshold){
        finalTakeHome= userSalary-(finalAnnualUIF + finalPaye)  //if the user input is more than PAYE threshold, Pay PAYE else exempt from PAYE
    }else{
        finalPaye=0.0
        finalTakeHome= userSalary-(finalAnnualUIF + finalPaye)
    }

   
   document.querySelector('input[name="op"]').value = finalTakeHome/12+"";
   document.querySelector('input[name="op2"]').value = finalAnnualUIF/12+"";  //Dividing inputs for monthly result to show on html
   document.querySelector('input[name="op3"]').value = finalPaye/12+"";

   
   

   
    // console.log(finalTakeHome,finalAnnualUIF,finalPaye)

    
    
}

























//     function calculateTax(taxAmount, taxPercentage){
//         return taxAmount*taxPercentage;

//     }


//     document.querySelector('#taxedAmount').innerHTML = calculateTax(taxAmount,taxPercentage);

// })


