//This variable Keeps track of whose turn it is.
let activePlayer = "X"; 
//This array stores an array of movess. used to determine win conditions
let selectedSquares =[]; 

//This function is for placing x or o in a square
function placeXOrO(squareNumber) {
    //This condition ensures a square hasnnt been selected already
    //the .some() method is used to check each element of square selected
    //to see if it contains the square number clicked on.
    if(!selectedSquares.some(element => element.includes(squareNumber))) {
        //this variable retries the html clicked on
        let select =document.getElementById(squareNumber);
        //this checks who's turn it is.
        if (activePlayer==="X") {
            //if activeplayer is equal to x, the x.png is placed in HTML
            select.style.backgroundImage="url('images/x.png')";
            //active player may only be x or o, so if not x it must be o.
        } else {
            //if activePlayer is equal to o, the o.png is place in HTML
            select.style.backgroundImage="url('images/o.png')"; 
        }
        //squarenumber and active player are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        //This calls a function to check for any win conditions
        checkWinConditions();
        //This conditions is for changing the active player.
        if (activePlayer==="X") { 
            //if activeplayer is "X" change it to "O"
            activePlayer= "O";
            //if active player is anything other than "x"
        } else{
            //change the active player to x
            activePlayer ="X";
        }
        //This function plays palcement sound
        audio("./media/place.mp3");
        //this condition checks if its computer's turn
        if (activePlayer==="O") {
            //this function disables clicking for computer's turn.
            disableClick();
            //this function waits 1 sec before the computer places an image and enables click
            setTimeout(function() {computersTurn();}, 1000);
        }
        //Returning true is needed for computer's turn function to work
        return true;
    }
    //This functions results in a random square being selcted by the computer
    function computersTurn() {
        //This Boolean is needed for the while loop
        let success=false;
        //this variable stores a random number 0-8
        let pickASquare;
        //This condition allows while loop to keep trying if square is slected already
        while (!success) {
            //A random number between 0 and 8 is selected.
            pickASquare= String(Math.floor(Math.random()*9));
            //if a random number evaluated returns true, the square hasnt been selected yet
            if(placeXOrO(pickASquare)) {
                //this line calls the function.
                placeXOrO(pickASquare);
                //This changes our boolean and ends the loop
                success=true;
            };
        }
    }
}

//this function parses the selected squares array to search for win conditions
//Drawline() function is called to draw a line on the screen if the conditions is met.
function checkWinConditions () {
    //X 0,1,2 condition
    if(arrayIncludes("0X", "1X", "2X")) {drawWinLine(50,100,558,100)}
    //X3,4,5 condition
    else if(arrayIncludes("3X","4X", "5X")) {drawWinLine(50,304,558,304)}
    //X 6,7,8 Condition
    else if(arrayIncludes("6X","7X","8X")) {drawWinLine(50,508,558,508)}
    //X 0,3,6 Condition
    else if (arrayIncludes("0X","3X","6X")) {drawWinLine(100,50,100,558)}
    //X 1,4,7 condition
    else if (arrayIncludes("1X","4X","7X")) {drawWinLine(304,50,304,558)}
    //X 2,5,8 Condition
    else if(arrayIncludes("2X","5X","8X")) {drawWinLine(508,50,508,558)}
    // X 6,4, 2 Condition
    else if(arrayIncludes("6X","4X","2X")) {drawWinLine(100,508,510,90)}
    //X 0,4,8 Condition
    else if (arrayIncludes("0X","4X","8X")) {drawWinLine(100,100,520,520)}
    // O 0,1,2 Condition
    else if (arrayIncludes("0O","1O","2O")) {drawWinLine(50,100,558,100)}
    // O 3,4,5 Condition
    else if (arrayIncludes("3O","4O","5O")) {drawWinLine(50,304,558,304)}
    // O 6,7,8 Condition
    else if (arrayIncludes("6O","7O","8O")) {drawWinLine(50,508,558,508)}   
    // O 0,3,6 Condition
    else if (arrayIncludes("0O","3O","6O")) {drawWinLine(100,50,100,558)}
    // O 1,4,7 Condition
    else if (arrayIncludes("1O","4O","7O")) {drawWinLine(304,50,304,558)}
    // O 2,5,8 Condition
    else if (arrayIncludes("2O","5O","8O")) {drawWinLine(508,50,508,558)}
    // O 6,4,2 Condition
    else if (arrayIncludes("6O","4O","2O")) {drawWinLine(100,508,510,90)}
    // O 0,4,8 Condition
    else if (arrayIncludes("0O","4O","8O")) {drawWinLine(100,100,520,520)}
    //This condition checks for a tie. if none of the above instructions are met and
    //9 squares are selected the code executes.
    else if (selectedSquares.length>=9) {
        //this function plays the tie game sound.
        audio("./media/tie.mp3");
        //This function sets a .3 second timer before the resetGame is called
        setTimeout(function() {resetGame();},500);
    }
    //This function checks if any array includes 3 strings. it us used to check for
    //each win condition.
    function arrayIncludes(squareA,squareB,squareC) {
        //these 3 variables will be used to check for 3 in a row.
        const a=selectedSquares.includes(squareA);
        const b=selectedSquares.includes(squareB);
        const c=selectedSquares.includes(squareC);
        //if the 3 variabele we pass are all invluded in our array then
        //true is returned and our else if condition executes the drawline() function.
        if (a===true && b===true && c===true) {return true;}
    }
}

//This function makes our body element temporarily unclickable.
function disableClick() {
    //this makes our body unclickable.
    body.style.pointerEvents="none";
    //This makes our body clickable again after 1 second.
    setTimeout(function(){body.style.pointerEvents="auto";}, 1000);
}

//This function takes a string parameter of the path you set earlier for
//placement sound("./media/place.mp3")
function audio(audioURL) {
    //We create a new audio object and we pass the path as a parameter.
    let audio=new Audio(audioURL);
    //Play method plays our audio sound.
    audio.play();
}

//This function utilizes HTML canvas to draw win lines.
function drawWinLine (coordX1, coordY1, coordX2, coordY2) {
    //this line accesses our HTML canvas element.
    const canvas=document.getElementById("win-lines");
    //This line gives acess to methods and propertiews to use on canvas.
    const c =canvas.getContext("2d");
    //this line indicates where the start of a line x axis is.
    let x1 =coordX1,
        //this line indicate where the start a lines x and axis is.
        y1=coordY1,
        //This line indicates where the end of linex axis is.
        x2=coordX2,
        //This lines indicates where the end of a line x axis is.
        y2=coordY2,
        //This variable stores temporary axis data we update in animation loop.
        x=x1,
        //This variable stores temporary y axis data in animation loop.
        y=y1;
    //This function interacts with the canvas
    function animateLineDrawing() {
        //this variable creates a loop.
        const animationLoop=requestAnimationFrame(animateLineDrawing);
        //This method clears content from the last loop iteration.
        c.clearRect(0,0,608,608);
        //This method starts a new path.
        c.beginPath();
        //This method moves to the startinf point in the line.
        c.moveTo(x1,y1);
        //This method indicates the end point in our line.
        c.lineTo(x,y);
        //This method sets the width of our line.
        c.lineWidth=10;
        //This method sets the color of our line.
        c.strokeStyle="rgba(70,255,33,8)";
        //This method draws everything we laid out above
        c.stroke();
        //This condition checks if we have reaches the endpoints
        if (x1<=x2 && y1<=y2) {
            //This condition adds 10 to the previous x endpoint.
            if(x<x2) {x +=10;}
            //This condition adds 10 the previous y endpoint.
            if(y<y2){y+=10;}
            //This condition is similar to the one above.
            //This is necessarry for the 6,4,2 win conditions.
            if (x>=x2 &&y>=y2) {cancelAnimationFrame(animationLoop);}
        }
        //This condition is similar to the one above.
        //This is necessadry for the 6,4,2 win condition.
        if (x1<=x2&&y1>=y2) {
            if(x<x2) {x+=10;}
            if(y>y2) {y-=10;}
            if(x>=x2&&y<=y2) {cancelAnimationFrame(animationLoop);}
        }
    }
    //This function clears our canvas after our win line is drawn.
    function clear() {
        //this line starts animation loop.
        const animationLoop=requestAnimationFrame(clear);
        //this line clears our canvas
        c.clearRect(0,0,608,608);
        //this line stops our animation loop.
        cancelAnimationFrame(animationLoop);
    }
    //this line disallows clicking while the win sound is playing
    disableClick();
    //this line plays the win sounds.
    audio("./media/winGame.mp3");
    //this line calls our main animation loop.
    animateLineDrawing();
    //This line waits 1 second. Then, clears canvas, resets game, and allows clicking again.
    setTimeout(function () { clear(); resetGame(); }, 1000);
}

//This function resets the game in the event of a tie or win.
function resetGame() {
    //for this loop iterates through each HTML element i.
    for (let i=0; i<9; i++) {
        //this variable gets the HTML element i.
        let square=document.getElementById(String(i));
        //this removes our elements background image
        square.style.backgroundImage="";
    }
    //This resets our array so its empty and we can start over.
    selectedSquares=[];
}