module.exports = {
    dateParser: function (date) {


        weekdayRegEx = new RegExp(/\b(\w*\w*)\b/gm);
        metaTimeRegEx = new RegExp(/\d{1,2}.\d{1,2}/gm);
        hourRegEx = new RegExp(/\d{1,2}/gm);
        minuteRegEx = new RegExp(/\d{1,2}/gm);

        let time = date.match(metaTimeRegEx);

        if (time == null) {
            return undefined;
        }

        let hour = [];
        let minute = [];
        let day = date.match(weekdayRegEx)[0];
        let dayIndex;

        for (let i = 0; i < time.length; i++) {
            hour[i] = time[i].match(hourRegEx)[0];
            minute[i] = time[i].match(minuteRegEx)[1];
        }



        switch (day) {
            case "Montag":
                dayIndex = 1;
                break;
            case "Dienstag":
                dayIndex = 2;
                break;
            case "Mittwoch":
                dayIndex = 3;
                break;
            case "Donnerstag":
                dayIndex = 4;
                break;
            case "Freitag":
                dayIndex = 5;
                break;
        }


        let res = {
            firstDate: [],
            fixture: {
                begin: {
                    minutes: {
                        type: Number,
                        value: minute[0]
                    },
                    hour: {
                        type: Number,
                        value: hour[0]
                    },
                    day: {
                        type: Number,
                        value: dayIndex
                    },
                    // String: "Freitag, 10:00 Uhr"
                    String: day + ', ' + hour[0] + ':' + minute[0]
                },
                end: {
                    minutes: {
                        type: Number,
                        value: minute[1]
                    },
                    hour: {
                        type: Number,
                        value: hour[1]
                    },
                    day: {
                        type: Number,
                        value: dayIndex
                    },
                    // String: "Freitag, 15:00 Uhr"
                    String: day + ', ' + hour[1] + ':' + minute[1]
                }
            }
        }

        return res;
    },
    uid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}