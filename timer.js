var dateToday = new Date();
var year = dateToday.getFullYear();
var month = dateToday.getMonth();
var date = dateToday.getDate();

 var totalDaysInCurrentMonth = new Date(year, month, 0).getDate();
 var remainingDays = totalDaysInCurrentMonth - date + 9;
 var remainingMonth = 4 - month;

 if (remainingMonth <= 0) {
    remainingMonth = 0; // Set months left to 0
    document.getElementById("months").textContent = "0"; // Display 0 months left in the HTML
} else {
    document.getElementById("months").textContent = remainingMonth; // Update months if there are months left
}

 document.getElementById("days").textContent = remainingDays; // Update days
 console.log(remainingDays, "Days", remainingMonth, "Months left!!");


 
