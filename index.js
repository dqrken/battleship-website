let currentWindow = 0
let mode = "place"
nextShipHappy = false
guideVisible = false;


document.addEventListener('click', (e) => {
      element = e.target
      elementNode = null
      if (element.parentNode.classList.contains('HMChild') | element.classList.contains('HMChild')) {
        if (element.parentNode.classList.contains('HMChild')) {
            elementNode = element
        } else {
            elementNode = element.lastChild
        };
        elementNode.parentNode.classList.toggle("rightClicked", false);
        elementNode.parentNode.classList.toggle("leftClicked");
        if (elementNode.parentNode.classList.contains('leftClicked')) {
            elementNode.textContent = "X"
        } else {
            elementNode.textContent = ""
            
        };
      };

      if (mode === "play") { // shipUpNS, shipMidNS, shipDownNS, shipLeftEW, shipMidEW, shipRightEW
      if (element.parentNode.classList.contains('SPChild') | element.classList.contains('SPChild')) {
        if (element.parentNode.classList.contains('SPChild')) {
            elementNode = element
        } else {
            elementNode = element.lastChild
        };
        if (
        elementNode.parentNode.classList.contains("shipUpNS") |
        elementNode.parentNode.classList.contains("shipMidNS") |
        elementNode.parentNode.classList.contains("shipDownNS") |
        elementNode.parentNode.classList.contains("shipLeftEW") |
        elementNode.parentNode.classList.contains("shipMidEW") |
        elementNode.parentNode.classList.contains("shipRightEW")
        ) {
            elementNode.parentNode.classList.toggle("rightClickedSP", false);
            elementNode.parentNode.classList.toggle("leftClickedSP");
        }
        
      };};
    //   document.getElementById('id').lastChild
});

document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      element = e.target
      elementNode = null
      if (element.parentNode.classList.contains('HMChild') | element.classList.contains('HMChild')) {
        if (element.parentNode.classList.contains('HMChild')) {
            elementNode = element
        } else {
            elementNode = element.lastChild
        };

        elementNode.parentNode.classList.toggle("rightClicked");
        elementNode.parentNode.classList.toggle("leftClicked", false);
        if (elementNode.parentNode.classList.contains('rightClicked')) {
            elementNode.textContent = "O"
        } else {
            elementNode.textContent = ""
            
        };
      };
    //   document.getElementById('id').lastChild
});

function writeToast(text, color='#cdd6f4') {
    document.getElementById('toastItem').innerText = text;
    document.getElementById('toastItem').style.color = color;
}

function switchVeiw() {
    if (currentWindow == 1) {
        document.getElementById('HMGridContainer').style.display = "none"
        document.getElementById('SPGridContainer').style.display = "grid"
        writeToast("Your ship locations.")
    };
    if (currentWindow == 0) {
        document.getElementById('HMGridContainer').style.display = "grid"
        document.getElementById('SPGridContainer').style.display = "none"
        writeToast("Mark your shots.")
    };


    currentWindow = (currentWindow + 1) % 2

};


// async function waitForChange(fn, val) {
//   while (fn() === val) await new Promise(r => setTimeout(r, 50));
// }

// let shipNumber = 0;
// nextShipHappy = true;
// shipLengths = [2, 2, 3, 4, 5]


// function watchChange(fn, onChange) {
//   let last = fn();
//   let active = true;

//   const stop = () => { active = false; };

//   (async () => {
//     while (active) {
//       await new Promise(r => setTimeout(r, 50));
//       const current = fn();
//       if (current !== last) {
//         last = current;
//         onChange(current);
//       }
//     }
//   })();

//   return stop; // caller can stop watching
// }

// const stopWatching = watchChange(() => shipNumber, (val) => {
//   console.log("shipLengths changed to:", val);
//   if (val === shipLengths.length) {
//     stopWatching();             // stop watching   // stop updating shipLengths
//     console.log("Stopped watching.");
    
//   }
// });



shipsPlaceOn = []; // An array to keep track of which squares have ships placed on them
shipLengths = [2, 2, 3, 4, 5];
shipNumber = 0;
currentPlacements = [];

document.addEventListener('DOMContentLoaded', function() {
    writeToast("Place a " + shipLengths[shipNumber] + " node ship.");
});
    
// Writes the toast before they click the button, repeated inside


function nextShip() { // Gets called only on button press

    let shipGoesDirection = null; // Set this to NE or EW

    currentShip = shipLengths[shipNumber];

    writeToast("Place a " + currentShip + " node ship.")

    // console.log("Ship Length", currentShip)

    // Check if configuration of ship nodes is correct
    if (shipNumber <= shipLengths.length) {

    numArray = [];
    for (each in currentPlacements) {
        numArray.push(Number(String(currentPlacements[each].parentNode.id).slice(2)))
        // console.log(String(currentPlacements[each].parentNode.id).slice(2))
    }

    
    checks = []; // Nothing sets this value to true only updated to false. Meaning it is transfered to the nextShipHappy var. 
    numArray.sort((a, b) => a - b)


    if (numArray.length === shipLengths[shipNumber]) { checks.push(true) } else { checks.push(false) };
    last = numArray[0] - 1;
    // console.log("last", last)
    lateralCheck = true; // Stays true, turned false if false.
    for (i in numArray) {
        if ((numArray[i] - 1) !== last) {
            // console.log("Array", numArray[i - 1], "I", i, "Last", last)
            lateralCheck = false;
        }
        last = numArray[i];
    };
    checks.push(lateralCheck) // Adds the lateral check to the checks list
    
    last = numArray[0] - 10;

    verticalCheck = true; // Stays true, turned false if false.
    for (i in numArray) {
        // console.log(i, numArray, last)
        if ((numArray[i] - 10) !== last) {
            // console.log("Array", numArray[i - 1], "I", i, "Last", last)
            verticalCheck = false;
        }
        last = numArray[i];

    
    };
    checks.push(verticalCheck)
    

    // console.log((checks[0] & (checks[1] | checks[2])));

    // console.log(checks)

    if (checks[0] & (checks[1] | checks[2]) === 1) { nextShipHappy = true} 

    if (((lateralCheck && verticalCheck) === false) && checks[0]) { // Checks if ship is in valid config before determining orientation.
        

        placementsNumberArray = []

        for (each in currentPlacements) {
        placementsNumberArray.push([Number(String(currentPlacements[each].parentNode.id).slice(2)), currentPlacements[each]])
        // console.log(String(currentPlacements[each].parentNode.id).slice(2))
        }

        placementsNumberArray.sort((a, b) => a[0] - b[0]) // Sorts based on number ID found in for loop above


        currentPlacements = [];

        for (each in placementsNumberArray) {
            currentPlacements.push(placementsNumberArray[each][1])
        }

        // console.log("CP", currentPlacements)


        
        if (lateralCheck) {
            for (each in currentPlacements) {
            if (Number(each) === 0) {
                currentPlacements[each].parentNode.classList.toggle('shipLeftEW')
            } else if (Number(each) === (currentPlacements.length - 1)) {
                currentPlacements[each].parentNode.classList.toggle('shipRightEW')
            } else {
                currentPlacements[each].parentNode.classList.toggle('shipMidEW')
            }
            };
        };
        if (verticalCheck) {
            for (each in currentPlacements) {
                // console.log('each', each)
                // console.log("currentPlacements", currentPlacements)
            if (Number(each) === 0) {
                currentPlacements[each].parentNode.classList.toggle('shipUpNS')
            } else if (Number(each) === (currentPlacements.length - 1)) {
                currentPlacements[each].parentNode.classList.toggle('shipDownNS')
            } else {
                currentPlacements[each].parentNode.classList.toggle('shipMidNS')
            }
        // console.log(String(currentPlacements[each].parentNode.id).slice(2))
        };
        };
    }

    if (nextShipHappy == true) {
        shipNumber++;

        for (each in currentPlacements) {
            // console.log(each)
            currentPlacements[each].parentNode.classList.toggle('shipUnknown')
            shipsPlaceOn.push(currentPlacements[each].parentNode) // Keeps track of ship squares
        }

        currentPlacements = [];
    }
    nextShipHappy = false;
    if (shipNumber === shipLengths.length) {
        mode = "play";
        document.getElementById('showMe1').style.visibility = "visible";
        document.getElementById('hideMe1').style.visibility = "hidden";
        writeToast("Placement done, switch tabs.")
        
    } else {
        writeToast("Place a " + shipLengths[shipNumber] + " node ship.")
    }
    };
};
// document.getElementById('as').id

function cycleGuide() {
    if (guideVisible) {
        document.getElementById("guideContainer").style.visibility = "hidden";
        guideVisible = false;
    } else {
        document.getElementById("guideContainer").style.visibility = "visible";
        guideVisible = true;
    }
}



document.addEventListener('click', (e) => {
      element = e.target
      elementNode = null
      if (mode === "place") {

      if (element.parentNode.classList.contains('SPChild') | element.classList.contains('SPChild')) {
        if (element.parentNode.classList.contains('SPChild')) {
            elementNode = element
        } else {
            elementNode = element.lastChild
        };

        if (shipsPlaceOn.indexOf(elementNode.parentNode) === -1) {

        

        elementNode.parentNode.classList.toggle("shipUnknown"); // Note this occurs before the if statement
        if (elementNode.parentNode.classList.contains("shipUnknown")) {
            currentPlacements.push(elementNode)
        } else {
            // stole from SO, it removes an item by finding it (why doesn't .pop take arguments??)
            
            const index = currentPlacements.indexOf(elementNode);
            if (index > -1) { // only splice array when item is found
            currentPlacements.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
       };
      };
    }
    //   document.getElementById('id').lastChild
});