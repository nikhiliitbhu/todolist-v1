const today = function currentDate(){


const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday'];

const month = ['January' , 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let date = new Date();
    let shortDate = dayOfWeek[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + " " +  date.getFullYear();

    return shortDate;

}

module.exports = today();
