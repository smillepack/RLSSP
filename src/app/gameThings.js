const arrRange = [0.2, 0.4, 0.6, 0.8, 1]
const arrActions = ['paper', 'rock', 'scissors', 'spock', 'lizard']
const whoWin = {
    paper: 'rock',
    rock: 'scissors',
    scissors: 'paper'
}
const gameWinBig = {
    rock: ['lizard', 'scissors'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock']    
}

export function whoWins(first, second) {
    if (first === second) {
        return 'draw'
    } else if (gameWinBig[first].includes(second)) {
        return 'win'
    } else {
        return 'def'
    }
    // if (whoWin[first] === second) {
    //     return 'win'
    // } else if (whoWin[second] === first) {
    //     return 'def'
    // } else {
    //     return 'draw'
    // }
}

export function ai() {
    let randomNumber = Math.random()
    let index
    arrRange.find((el, i) => {

        if (randomNumber < el) {
            index = i
            return true
        }
    })

    return arrActions[index]
}
