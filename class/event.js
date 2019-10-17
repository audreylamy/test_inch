var moment = require('moment');

class Event {

    constructor(opening, recurring, startDate, endDate) {
        this.opening = opening;
        this.recurring = recurring;
        this.startDate = startDate;
        this.endDate = endDate
    }

    display(dates, day) {
        if (dates.length > 0)
            console.log("I'm available on " + moment(day).format('MMMM Do YYYY') + ", at " + dates.join(', '))
    }

    // Check if day is between fromDate and toDate
    checkIntervalDates(day, fromDate, toDate, arrIntervention, arrayHours) {
        var res = moment(day).isBetween(fromDate, toDate) || day === fromDate || day === toDate
            if (res) {
                var result = this.checkIntervention(arrIntervention, arrayHours, day)
                this.display(result, day)
            }
    }

    // Check if interventions happen this day and return array of hours without interventions
    checkIntervention(arrIntervention, arrayHours, day) {
        for (var i = 0; arrIntervention.length > i; i++) {
            if (moment(arrIntervention[i].day).format('L')=== moment(day).format('L')) {
                for (var y = 0; arrIntervention[i].arrayHours.length > y; y++) {
                    if (arrayHours.includes(arrIntervention[i].arrayHours[y])){
                        arrayHours = arrayHours.filter( date => date !== arrIntervention[i].arrayHours[y])
                        
                    }
                }
                return arrayHours
            }
        }
        return arrayHours
    }

    recursiveRecurring(arrAvailableDates, fromDate, toDate, arrayDates) {
        if (moment(arrAvailableDates).format('L') > moment(toDate).format('L'))
            return arrayDates
        else if (moment(arrAvailableDates).format('L') < moment(fromDate).format('L'))
            return this.recursiveRecurring(moment(arrAvailableDates).add(7, 'day'), fromDate, toDate, arrayDates)
        else
            arrayDates.push(arrAvailableDates)
        return this.recursiveRecurring(moment(arrAvailableDates).add(7, 'day'), fromDate, toDate, arrayDates)
    }

    // Check avaibilities
    availabilities(fromDate, toDate, arrAvailable, arrIntervention) {

        for (var i = 0; arrAvailable.length > i; i++) {
            if (arrAvailable[i].recurring) {
                const arrayDates = []
                var arrAvailableDates = this.recursiveRecurring(arrAvailable[i].day, fromDate, toDate, arrayDates)
                arrAvailableDates.forEach(day => {
                    this.checkIntervalDates(day, fromDate, toDate, arrIntervention, arrAvailable[i].arrayHours)
                });
            }
            else {
                this.checkIntervalDates(arrAvailable[i].day, fromDate, toDate, arrIntervention, arrAvailable[i].arrayHours)
            }
        }
        console.log("I'm not available any other time !")
    }
}

module.exports = Event