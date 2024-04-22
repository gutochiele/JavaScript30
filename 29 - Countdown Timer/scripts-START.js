let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')

function timer (seconds) {
    clearInterval(countdown)
    const now = Date.now();
    const then = now + seconds * 1000
    displayTimeLeft(seconds)
    displayEndTime(then)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        if(secondsLeft < 0){
        clearInterval(countdown)
        return
        }

        displayTimeLeft(secondsLeft)
    }, 1000)
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60)
    const remainderSeconds = seconds % 60
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    const displayAdjusted = remainderSeconds <= 0 ? 'COME BACK!!!!!!!!!' : display
    document.title = displayAdjusted
    timerDisplay.textContent = display
    if(display == '0:00'){
        timerDisplay.style.color = 'red'
    } else if (display != '0:00'){
        timerDisplay.style.color = 'white'
    }
    
}

function displayEndTime(timestamp){
    const end = new Date(timestamp)
    const hours = end.getHours()
    const minutes = end.getMinutes()
    endTime.textContent = `You should be back at ${hours}:${minutes < 10 ? (`0${minutes}`) : minutes}`
}

function startTimer(){
    const seconds = parseInt(this.dataset.time)
    timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e){
    e.preventDefault()
    const mins = this.minutes.value
    timer(mins * 60 )
})