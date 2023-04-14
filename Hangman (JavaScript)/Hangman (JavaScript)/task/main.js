// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');


function checkValid(letter)
{
    if (letter.length !== 1)
    {
        console.log("Please, input a single letter");
        return 0;
    }
    if (letter === letter.toUpperCase())
    {
        console.log("Please, Enter a lowercase letter from the English alphabet");
        return 0;
    }
    if (old_letters_guessed.includes(letter))
    {
        console.log("You've already guessed this letter");
        return 0;
    }
    return 1;
}


function updateHiddenWord(old_letters_guessed, secret_word, hidden_word)
{
    let newHiddenWord = hidden_word.split("");
    for (let i = 0; i < old_letters_guessed.length; i++)
    {
        if (secret_word.includes(old_letters_guessed[i]))
        {
            for (let j = 0; j < secret_word.length; ++j)
            {
                if (old_letters_guessed[i] === secret_word[j])
                {
                    newHiddenWord[j] = secret_word[j];
                }
            }
        }
    }
    return newHiddenWord.join("");
}


function checkState(attempts, secret_word)
{
    let flag = 0;
    for (let letter of secret_word)
    {
        if (old_letters_guessed.includes(letter))
        {
            flag++;
        }
    }
    if (flag == secret_word.length)
    {
        return 1;
    } else if (attempts === 0)
    {
        return 2;
    }
}

function guessLetter(secret_word, hidden_word)
{
    console.log(updateHiddenWord(old_letters_guessed, secret_word, hidden_word));
    let guess = input(`Input a letter: `);
    if (checkValid(guess))
    {
        if (!secret_word.includes(guess))
        {
            console.log(`That letter doesn't appear in the word`);
            attempts--;
        }
        old_letters_guessed.push(guess);
    }
    console.log("");
}


function gameProcess()
{
    let choice = "";
    do
    {
        do {
            console.log("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit:");
            choice = input();
        } while (choice !== "play" && choice !== "results" && choice !== "exit");
        if (choice === "play")
        {
            old_letters_guessed = [];
            let secret_word = words[Math.floor(Math.random() * 4)];
            let hidden_word ="-".repeat(secret_word.length);

            do
            {
                guessLetter(secret_word, hidden_word);
            } while (checkState(attempts, secret_word) !== 1 && checkState(attempts, secret_word) !== 2);
            if (checkState(attempts, secret_word) === 1)
            {
                wins++;
                console.log(`You guessed the word ${secret_word}!\nYou survived!`);
            } else
            {
                loses++;
                console.log("You lost!");
            }
        } else if (choice === "results")
        {
            console.log(`You won: ${wins} times.\nYou lost: ${loses} times.`);
        } else
        {
            return 0;
        }
    } while (true);
}


console.log(`H A N G M A N\n`);

let attempts = 8;

let words = ["python", "java", "swift", "javascript"];

let old_letters_guessed = [];

let wins = 0;
let loses = 0;

gameProcess();