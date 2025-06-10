const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"), 
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventSubmit = document.querySelector(".add-event-btn")

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
    "June", 
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const eventsArr = [
    {
        day : 11,
        month : 6,
        year : 2025,
        events : [
            {
                title : "Event 1 lorem ipsum dolar sit genfa tersd dsad",
                time : "10:00 AM",
            },
            {
                title : "Event 2",
                time : "11:00 AM",
            },
        ],
    },
    {
        day : 14,
        month : 6,
        year : 2025,
        events : [
            {
                title : "Event 1 lorem ipsum dolar sit genfa tersd dsad",
                time : "10:00 AM",
            },
        ],
    },
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

    for(let j = 1; j <= lastDate; j++){
        let event = false;
        eventsArr.forEach((eventObj) => {
            if(
                eventObj.day === j && 
                eventObj.month === month + 1 && 
                eventObj.year === year 
            )
            {
                event = true;
            }
        });
        
        if(j === new Date().getDate() && 
        year === new Date().getFullYear() && 
        month === new Date().getMonth()){

            activeDay = j;
            getActiveDay(j)
            updateEvents(j);
        
            if(event){
                days += `<div class="day today active event">${j}</div>`;
            }
            else{
                days += `<div class="day today active">${j}</div>`;
            }
        } 
        else{
            if(event){
                days += `<div class="day event">${j}</div>`;
            }
            else{
                days += `<div class="day">${j}</div>`;
            }
        }
    }

    for(let k = 1; k < nextDays; k++){
        days += `<div class="day next-date">${k}</div>`;
    }
    daysContainer.innerHTML = days;

    addListener()
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
  });

  dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if(dateInput.value.length === 2){
        dateInput.value += "/";
    }
    if(dateInput.value.length > 7){
        dateInput.value = dateInput.value.slice(0, 7);
    }
  });

  gotoBtn.addEventListener("click", gotoDate);

  function gotoDate(){
    const dateArr = dateInput.value.split("/");
    if(dateArr.length === 2){
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4){
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("invalid date");
  }

  const addEventBtn = document.querySelector(".add-event"),
        addEventContainer = document.querySelector(".add-event-wrapper"),
        addEventCloseBtn = document.querySelector(".close"),
        addEventTitle = document.querySelector(".event-name"),
        addEventFrom = document.querySelector(".event-time-from"),
        addEventTo = document.querySelector(".event-time-to");

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
  });

  addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
  });

  addEventFrom.addEventListener("input", (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if(addEventFrom.value.length === 2){
        addEventFrom.value += ":";
    }
    if(addEventFrom.value.length > 5){
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
  });

  addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if(addEventTo.value.length === 2){
        addEventTo.value += ":";
    }
    if(addEventTo.value.length > 5){
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
  });

  function addListener(){
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click" , (e) => {
            activeDay = Number(e.target.innerHTML);

            getActiveDay(e.target.innerHTML);
             updateEvents(Number(e.target.innerHTML));

            days.forEach((day) =>{
                day.classList.remove("active");
            });

             if(e.target.classList.contains("prev-date")){
                prevMonth();
               
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
 

                    days.forEach((day) => {
                        if(!day.classList.contains("prev-date") &&
                             day.innerHTML === e.target.innerHTML){
                            day.classList.add("active");
                        }
                    });
                }, 100);
             } else if(e.target.classList.contains("next-date")){
                nextMonth();
               
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
 

                    days.forEach((day) => {
                        if(!day.classList.contains("next-date") &&
                             day.innerHTML === e.target.innerHTML){
                            day.classList.add("active");
                        }
                    });
                }, 100);
             } 
             else{
                e.target.classList.add("active");
             }

        });
    });
  }

  function getActiveDay(date){
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year; 
  }

  function updateEvents(date){
    let events = "";
    eventsArr.forEach((event) =>{
        if(date === event.day &&
           month + 1 === event.month &&
           year === event.year
         ){
            event.events.forEach((event) => {
                events += `
                <div class = "event">
                 <div class = "title">
                    <i class ="fas fa-circle"></i>
                  <h3 class ="event-time">${event.title}</h3>
                 </div> 
                 <div class ="event-time">
                   <span class = "event-time">${event.time}</span>
                 </div>
                </div>
                `;
            })
        }
    });

    if((events == "")){
        events = `<div class = "no-event">
        <h3>No Events</h3>
        </div>`;
    }

    eventsContainer.innerHTML = events;
  }

  addEventSubmit.addEventListener("click", ()=>{
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    if(eventTitle === "" || eventTimeFrom === "" || eventTimeTo === ""){
        alert("Please fill all the fields");
    }
  })