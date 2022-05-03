function isStringPalindrome(str) {
    var listOfChars = str.split('');
    var reversedListOfChars = listOfChars.reverse();
    var reversedString = reversedListOfChars.join('');
    return str === reversedString;
} 

function getDateAsString(date) {
    var dateInString = { day:'', month:'', year:'' }
    if (date.day < 10) {
        dateInString.day = '0' + date.day;
    } else {
        dateInString.day = date.day.toString();
    }
    if (date.month < 10) {
        dateInString.month = '0' + date.month;
    } else {
        dateInString.month = date.month.toString();
    }
    dateInString.year = date.year.toString();
    return dateInString;
}

function getDateInAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yymmdd = date.year.slice(-2) + date.month + date.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {
    var dateFormatList = getDateInAllFormats(date);
    var palindromeList = [];
    for (var i = 0; i < dateFormatList.length; i++) {
        var result = isStringPalindrome(dateFormatList[i])
        palindromeList.push(result);
    }
    return palindromeList;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }

    if (year % 100 === 0) {
        return false;
    }

    if (year % 4 === 0) {
        return true;
    }
    return false;
}


function getNextDate(date) {
    var day = date.date + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month =3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var ctr = 0;

    while (1) {
        ctr++;
        var dateStr = getDateAsString(nextDate);
        var resultList = checkPalindromeForAllFormats(dateStr);

        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
                return [ctr, nextDate]
            }
        }
        nextDate = getNextDate(nextDate);
    }
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = month;
    var year = year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if (day === 0) {
        month--;
        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        } else {
            if (month === 2){
                if (isLeapYear(year)){
                    day = 29;
                } else {
                    day = 28;
                }
            } else {
                day = daysInMonth[month-1];
            }
        }
    
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function getPreviousPalindromeDate(date){
    var previousDate = getPreviousDate(date);
    var ctr = 0;
    
    while (1) {
        ctr++;
        var dateStr = getDateAsString(previousDate);
        var resultList = checkPalindromeForAllFormats(dateStr);

        for (let i=0; i < resultList.length; i++){
            if (resultList[i]) {
                return[ctr, previousDate];
            }
        }
        previousDate = getPreviousDate(previousDate);
    }
}

var dateInput = document.querySelector('#input-area')
var checkButton = document.querySelector('#check-button')
var output = document.querySelector('#output-area')

function trialFunction(e) {
    var bdayString = dateInput.value;
    if (bdayString !== '') {
        var date = bdayString.split('-');
        var yyyy = date[0];
        var mm = date[1];
        var dd = date[2];

        var date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy)
        }
    }
    var dateString = getDateAsString(date);
    var list = checkPalindromeForAllFormats(dateString);

    var isPalindrome = false;
    for (let i= 0; i < list.length; i++) {
        if (list[i]) {
            var isPalindrome = true;
            break;
        }
    }

    if (isPalindrome === false) {
        const [ctr1, nextDate] = getNextPalindromeDate(date);
        const [ctr2, previousDate] = getPreviousPalindromeDate(date);
        if (ctr1 > ctr2) {
            output.innerText = nextDate;
        } else {
            output.innerText = previousDate;
        }
    } else {
        output.innerText = "Yay! Your birthday is palindrome!";
    }
    console.log(isPalindrome)
}








checkButton.addEventListener("click", trialFunction)