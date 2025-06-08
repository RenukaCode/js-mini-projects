const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input")

  let today = new Date();
  let activeDay;
  let month = today.getMonth();
  let year = today.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "june",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function initCalendar(){
    const firstDay = new Date(year , month , 1);
    const lastDay = new Date(year , month + 1 , 0);
    const prevLastDay = new Date(year , month , 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1; 

    date.innerHTML = months[month] + " " + year;

    let days = "";
    for(let i = day; i > 0; i--){
        days += `<div class="day prev-date">${prevDays - i + 1}</div>`;
    }

    for(let j = 1; j <= lastDate;j++){
        if(j === new Date().getDate() && 
        year === new Date().getFullYear() && 
        month === new Date().getMonth()){
           days += `<div class="day today">${j}</div>`;
        }
        else{
             days += `<div class="day">${j}</div>`;
        }
    }

    for(let k = 1; k < nextDays; k++){
        days += `<div class="day next-date">${k}</div>`;
    }
    daysContainer.innerHTML = days;
  }
  initCalendar();
  function prevMonth(){
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
 initCalendar();
}
  
function nextMonth(){
    month++;
    if(month > 11){
        month = 0;
        year++;
    }
    initCalendar(); 
}

prev.addEventListener("click" , prevMonth);
next.addEventListener("click" , nextMonth);
 
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
})

dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");  //allow only numbers
    if(dateInput.value.length === 2){
        dateInput.value += "/";    //add slash when two numbers entered
    }

    if(dateInput.value.length > 7){
        dateInput.value = dateInput.value.slice(0, 7);
    }

    // if(e.inputType = "deleteContentBackward"){
    //     if(dateInput.value.length === 3){
    //         dateInput.value = dateInput.value.slice(0, 2);
    //     }
    // }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate(){
    const dateArr = dateInput.value.split("/");
    if(dateArr.length === 2){
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4){
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return 
        }
    }
    alert("invalid date");
}

const addEventBtn = document.querySelector(".add-event"),
      addEventContainer = document.querySelector(".add-event-wrapper"),
      addEventCloseBtn = document.querySelector(".close");
      addEventTitle = document.querySelector("event-name"),
      addEventFrom = document.querySelector("event-time-from"),
      addEventTo = document.querySelector("event-time-to");

addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});

document.addEventListener("click",(e) =>{
    if(e.target !== addEventBtn && !addEventContainer.contains(e.target) ){
        addEventContainer.classList.remove("active");
    }
})

// addEventTitle.addEventListener("input", (e) => {
//     addEventTitle.value = addEventTitle.value.slice(0, 50);
// });

// addEventFrom.addEventListener("input", (e) => {
//     addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
//     if(addEventFrom.value.length === 2){
//         addEventFrom.value += ":";
//     }
//     if(addEventFrom.value.length > 5){
//         addEventFrom.value = addEventFrom.value.slice(0, 5);
//     }
// })
