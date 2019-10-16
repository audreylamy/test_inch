var moment = require('moment');
var DateArray = require('./date')

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
        for (var i = 0; nbInterval > i; i++) {
            if (startHour === endHour)
                return
            var hour = moment(start).add(30, 'minutes');
            array.push(moment(hour).format("HH:mm"))
            start = hour
        }
        return array
    }

    openingCompagny(open) {
        var start = moment(open.startDate)
        var end = moment(open.endDate)
        var startHour = moment(open.startDate).format("HH:mm")
        var endHour = moment(open.endDate).format("HH:mm")

        // nb interval 30minutes
        var diff = moment.duration(end.diff(start))
        var minutes = parseInt(diff.asMinutes())
        const nbInterval = minutes / 30

        const day = moment(open.startDate).format('L') // mm/day/years
        const HoursByDay = this.arrayHours(startHour, endHour, start, nbInterval) // return array hours
        var opening = open.opening
        var recurring = open.recurring

        return {opening, recurring, day, HoursByDay}
    }

    availabilities(formDate, toDate, arr) {

    }
}

module.exports = Event