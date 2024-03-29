var Event = require('./class/event');
var Parsing = require('./class/parsing');

const arrayAvailable = []
const arrayInterventions = []

// AVAILABILITIES //
// The company is available every monday, from 10:30 to 14:00, beginning the 2nd of July
var startDate = new Date(2018,6,2,10,30);
var endDate = new Date(2018,6,2,14,00);
var av1 = new Event(true, true, startDate, endDate);

var openingCompagny = Parsing.prototype.parsingDates(av1)
arrayAvailable.push(openingCompagny)

// The company is available on tuesday 3rd of july, from 11:30 to 16:00
var startDate = new Date(2018,6,3,11,30);
var endDate = new Date(2018,6,3,16,00);
var av2 = new Event(true, false, startDate, endDate);

openingCompagny = Parsing.prototype.parsingDates(av2)
arrayAvailable.push(openingCompagny)

// INTERVENTIONS //
// The company has an intervention scheduled tuesday 3rd of july, from 12:30 to 13:00
startDate = new Date(2018,6,3,12,30);
endDate = new Date(2018,6,3,13,00);
var inter1 = new Event(false, false, startDate, endDate);

var interventionDate = Parsing.prototype.parsingDates(inter1)
arrayInterventions.push(interventionDate)

// The company has an intervention scheduled monday 9th of july, from 13:30 to 14:00
startDate = new Date(2018,6,9,13,30);
endDate = new Date(2018,6,9,14,00);
var inter2 = new Event(false, false, startDate, endDate);

interventionDate = Parsing.prototype.parsingDates(inter2)
arrayInterventions.push(interventionDate)

// MAIN RESPONSE //
var fromDate = new Date(2018,6,3,10,00);
var toDate = new Date(2018,6,15,10,00);
Event.prototype.availabilities(fromDate, toDate, arrayAvailable, arrayInterventions);