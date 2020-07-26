// VARIABLES //

const overlay = document.getElementById('overlay');
const phrase = document.getElementById('phrase');
const phraseList = document.querySelector('#phrase ul');
const qwerty = document.getElementById('qwerty');
const tries = document.querySelectorAll('.tries');
const chancesLeft = tries.length; 

let missed = 0; 

const hiddenPhrases = [
    'Cup of joe',
    'Elephant in the room',
    'Houston we have a problem',
    'Needle in a haystack',
    'On cloud nine',
    'Raining cats and dogs',
    'Spill the beans',
    'Walk the talk',
];

// CORE FUNCTIONS //

const overlayOn = () => {
    overlay.style.display = '';
};

const overlayOff = () => {
    overlay.style.display = 'none';
};

//array & phrases//
const getPhrase = (array) => {
    const randomNum = Math.floor(Math.random() * array.length);
    const thePhrase = array[randomNum];
    const letters = thePhrase.split('').map((x) => { return x.toLowerCase(); });
    return letters;
};

const addPhrase = (array) => {
    for (let i = 0; i < array.length; i++) {
        let list = document.createElement('LI');
        list.textContent = array[i]; 
        phraseList.appendChild(list);
        
        if (list.textContent !== ' ') {
            list.className = 'letter';
        }
        else {
            list.className = 'space'; 
        }
    }
};


//letter verification//
const findLetter = (button) => {
    const letters = document.querySelectorAll('.letter');
    let match = null; 
    for(let i = 0; i < letters.length; i++) {
        let letter = letters[i].textContent; 

        if (button == letter) {
            letters[i].classList.add('show');
            match = true;
        }
    }
    return match; 
}; 

//win or lose//
const win = () => {
    const title = document.querySelector('.title');
    const letters = document.querySelectorAll('.letter'); 
    const reveal = document.querySelectorAll('.show');
    const button = document.querySelector('.btn-reset');
    const tries = document.querySelectorAll('.tries');

    if (reveal.length === letters.length) {
        overlayOn(); 
        overlay.classList.add('win');
        button.textContent = 'Play Again';
        title.textContent = 'You Win!';
    }

    if (missed === chancesLeft) {
        overlayOn(); 
        overlay.classList.add('lose');
        button.textContent = 'Try Again';
        title.textContent = 'You Lose!';
    }

    button.addEventListener('click', (e) => {
        if (e.target.className === 'btn-reset') {
            reset();
            overlayOff();
            win(); 
        }
    });
};

//reset//
const reset = () => {
    const letters = document.querySelectorAll('.letter');
    const choice = document.querySelectorAll('.choice');
    const score = document.querySelector('#scoreboard ol');
    missed = 0;

    phraseList.innerHTML = '';
    score.innerHTML = '';

    for (let i = 0; i < 8; i++) {
        const tries = document.createElement('LI');
        tries.className = 'tries';
        tries.innerHTML = '<img src="images/liveHeart.png" height="35" width="30">';
        score.appendChild(tries);
    }

    for (let i = 0; i < choice.length; i++) {
        choice[i].classList.remove('choice');
        choice[i].disabled = false;
    }
};


// EVENT LISTENERS //

//start//
overlay.addEventListener('click', (e) => {
    if (e.target.className === 'btn-reset') {
        overlayOff();
    

    overlay.classList.remove('win', 'lose');

    addPhrase(getPhrase(hiddenPhrases));

    }
});

//keyboard//
document.addEventListener('keydown', (e) => {
    if (overlay.style.display === 'none') {
        const buttons = document.querySelectorAll('button');

        for (let i = 0; i < buttons.length; i++) {
            if (e.key === buttons[i].textContent) {
                let button = buttons[i].textContent; 

                const matchedLetter = findLetter(button);
                const score = document.querySelector('#scoreboard ol');
                const tries = document.querySelectorAll('.tries');
                
                if (matchedLetter === null && buttons[i].disabled === false) {
                    missed ++; 
                    score.removeChild(tries[0]);
                }
                
                buttons[i].classList.add('choice');
                buttons[i].disabled = true; 
                win();
            }
        }
    }
});

//qwerty buttons//
qwerty.addEventListener('click', (e) => {
    let focus = e.target; 
    let button; 
    if (focus.tagName === 'BUTTON') {
        focus.classList.add('choice');
        focus.disabled = true; 
        button = focus.textContent.toLowerCase();
        const matchedLetter = findLetter(button);
        const score = document.querySelector('#scoreboard ol');
        const tries = document.querySelectorAll('.tries');
        
        if (matchedLetter === null) {
            missed++; 
            score.removeChild(tries[0]);
        }
        win(); 
    }
});


