var moment = require('moment');

class Event {

    constructor(opening, recurring, startDate, endDate) {
        this.opening = opening;
        this.recurring = recurring;
        this.startDate = startDate;
        this.endDate = endDate
    }

    arrayHours(startHour, endHour, start, nbInterval) {
        const array = []
        array.push(startHour)
        for (var i = 1; nbInterval > i; i++) {
            if (startHour === endHour)
                return
            var hour = moment(start).add(30, 'minutes');
            array.push(moment(hour).format("HH:mm"))
            start = hour
        }
        return array
    }

    parsingData(open) {
        var opening = open.opening
        var recurring = open.recurring
        var start = moment(open.startDate)
        var end = moment(open.endDate)
        var startHour = moment(open.startDate).format("HH:mm")
        var endHour = moment(open.endDate).format("HH:mm")

        // nb interval 30minutes
        var diff = moment.duration(end.diff(start))
        var minutes = parseInt(diff.asMinutes())
        var nbInterval = minutes / 30

        const day = open.startDate // mm/day/years
        const hoursByDay = this.arrayHours(startHour, endHour, start, nbInterval) // return array hours

        return {opening, recurring, day, hoursByDay}
    }

    display(dates, day) {
        console.log("I'm available on " + moment(day).format('MMMM Do YYYY') + ", at " + dates.join(', '))
    }

    checkIntervalDates(day, fromDate, toDate, arrIntervention, hoursByDay) {
        var res = moment(day).isBetween(fromDate, toDate) || day === fromDate || day === toDate
            if (res) {
                var result = this.checkIntervention(arrIntervention, hoursByDay, day)
                this.display(result, day)
            }
    }

    checkIntervention(arrIntervention, hoursByDay, day) {
        for (var i = 0; arrIntervention.length > i; i++) {
            if (moment(arrIntervention[i].day).format('L')=== moment(day).format('L')) {
                for (var y = 0; arrIntervention[i].hoursByDay.length > y; y++) {
                    if (hoursByDay.includes(arrIntervention[i].hoursByDay[y])){
                        hoursByDay = hoursByDay.filter( date => date !== arrIntervention[i].hoursByDay[y])
                        
                    }
                }
                return hoursByDay
            }
        }
        return hoursByDay
    }

    recursiveRecurring(arrAvailableDay, fromDate, toDate, arrayDates) {
        if (moment(arrAvailableDay).format('L') > moment(toDate).format('L'))
            return arrayDates
        else if (moment(arrAvailableDay).format('L') < moment(fromDate).format('L'))
            return this.recursiveRecurring(moment(arrAvailableDay).add(7, 'day'), fromDate, toDate, arrayDates)
        else
            arrayDates.push(arrAvailableDay)
        return this.recursiveRecurring(moment(arrAvailableDay).add(7, 'day'), fromDate, toDate, arrayDates)
    }

    availabilities(fromDate, toDate, arrAvailable, arrIntervention) {
        var fromDate = fromDate
        var toDate = toDate
        for (var i = 0; arrAvailable.length > i; i++) {
            if (arrAvailable[i].recurring) {
                const arrayDates = []
                var arrAvailableDay = this.recursiveRecurring(arrAvailable[i].day, fromDate, toDate, arrayDates)
               arrAvailableDay.forEach(day => {
                    this.checkIntervalDates(day, fromDate, toDate, arrIntervention, arrAvailable[i].hoursByDay)
                });
            }
            else {
                this.checkIntervalDates(arrAvailable[i].day, fromDate, toDate, arrIntervention, arrAvailable[i].hoursByDay)
            }
        }
        console.log("I'm not available any other time !")
    }
}

module.exports = Event