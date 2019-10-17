var moment = require('moment');

class Parsing {

    arrayHours(startHour, endHour, start, nbInterval) {
        const array = []
        array.push(startHour)
        for (var i = 1; nbInterval > i; i++) {
            if (startHour === endHour)
                return
            var hour = moment(moment(start)).add(30, 'minutes');
            array.push(moment(hour).format("HH:mm"))
            start = hour
        }
        return array
    }

    // return an array of hours
    parsingDates(open) {
        let opening = open.opening,
            recurring = open.recurring,
            startHour = moment(open.startDate).format("HH:mm"),
            endHour = moment(open.endDate).format("HH:mm")

        // nb interval 30minutes
        let diff = moment.duration(moment(open.endDate).diff(moment(open.startDate)))
        let minutes = parseInt(diff.asMinutes())
        let nbInterval = minutes / 30

        let day = open.startDate
        let arrayHours = this.arrayHours(startHour, endHour, moment(open.startDate), nbInterval) // return array hours

        return {opening, recurring, day, arrayHours}
    }
}

module.exports = Parsing