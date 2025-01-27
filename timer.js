
var dateToday = new Date();
var year = dateToday.getFullYear();
var month = dateToday.getMonth();
var date = dateToday.getDate();

 var totalDaysInCurrentMonth = new Date(year, month, 0).getDate();
 var remainingDays = totalDaysInCurrentMonth - date + 9;
 var remainingMonth = 4 - month;

 document.getElementById("months").textContent = remainingMonth; // Update months
 document.getElementById("days").textContent = remainingDays; // Update days
 console.log(remainingDays, "Days", remainingMonth, "Months left!!");
