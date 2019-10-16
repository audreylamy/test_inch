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

        const day = moment(open.startDate).format('L') // mm/day/years
        const hoursByDay = this.arrayHours(startHour, endHour, start, nbInterval) // return array hours

        return {opening, recurring, day, hoursByDay}
    }

    checkRecurring(arrAvailableDay, recurring) {
        if (recurring) {
            return moment(moment(arrAvailableDay).add(7, 'day')).format('L');
        } else {
            return arrAvailableDay
        }
    }

    checkIntervention(arrIntervention, hoursByDay, day) {
  
        for (var i = 0; arrIntervention.length > i; i++) {
            if (arrIntervention[i].day === day) {
                for (var y = 0; arrIntervention[i].hoursByDay.length > y; y++) {
                    if (hoursByDay.includes(arrIntervention[i].hoursByDay[y])){
                        hoursByDay = hoursByDay.filter( date => date !== arrIntervention[i].hoursByDay[y])
                        
                    }
                }
                return hoursByDay
            }
        }
        return false
    }

    display(dates, day) {
        console.log("I'm available on " + moment(day).format('MMMM Do YYYY') + ", at " + dates.join(', '))
    }

    availabilities(fromDate, toDate, arrAvailable, arrIntervention) {
        var fromDate = moment(fromDate).format('L')
        var toDate = moment(toDate).format('L')

        for (var i = 0; arrAvailable.length > i; i++) {
            var arrAvailableDay = this.checkRecurring(arrAvailable[i].day, arrAvailable[i].recurring)
            
            var res = moment(arrAvailableDay).isBetween(fromDate, toDate) || arrAvailableDay === fromDate || arrAvailableDay === toDate
            if (res) {
                arrAvailable[i].hoursByDay
                var result = this.checkIntervention(arrIntervention, arrAvailable[i].hoursByDay, arrAvailableDay)
                this.display(result, arrAvailableDay)
            }
        }

    }
}

module.exports = Event