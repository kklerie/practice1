// $(document).ready(function () {
  
//   let now = new Date()
//   let time = parseDate() 
//   let notes = []
//   load()

//   $(document).on('click', '.btn-close', function() {
//     let index = $(this).parent().data("index")

//     notes.splice(index, 1)

//     localStorage.setItem("notes", JSON.stringify(notes))

//     load()
//   });


//   $(".btn").click(function () {
//     let inputVal = $("#taskInput").val()
//     let headVal = $("#taskInput1").val()

//     if (inputVal == "" || headVal == "") {
//       alert("enter a task")
//       return
//     } else {
//       notes.push({ 
//         head: headVal, 
//         task: inputVal, 
//         time: time 
//       })

//       localStorage.setItem("notes", JSON.stringify(notes))

//       load()
//     }
//   })


//   $(document).on("click", "li", function () {
//     $(this).addClass("textLine")
//   })

//   $(document).on("dblclick", "li", function () {
//     $(this).removeClass("textLine")
//   })

//   $(document).on("click", ".fa-pen", function () {
//     $(this).parent().attr("contenteditable", "true")
//   })

// });


// function parseDate(){
//     date = new Date()
//     y = date.getFullYear()
//     d = date.getDate()
//     m = date.getMonth() + 1
//     ht = date.getHours()
//     mt = date.getMinutes()

//     return `${d}.${m}.${y} ${ht}:${mt}`
// }


// function load() {
//   $("ol").html("")

//   if (localStorage.getItem("notes") != null) {

//     notes = JSON.parse(localStorage.getItem("notes"))

//     for (let i = 0; i < notes.length; i++) {

//       $("ol").append(
//         `<li data-index="${i}">
//           ${notes[i].head}: ${notes[i].task}
//           <button type="button" class="btn-close" aria-label="Close"></button>
//           <i class="fa fa-pen"></i>
//         </li>
//         <span class="time">${notes[i].time}</span>`
//       )
//     }

    // if (window.innerWidth <= 500 && notes.length > 3) {
    //   $("ol").css({ "max-height": "20vh", "overflow-y": "auto" })
    // } else {
    //   $("ol").css({ "max-height": "", "overflow-y": "" })
    // }

    // if (window.innerWidth >= 700 && notes.length > 4) {
    //   $("ol").css({ "max-height": "40vh", "overflow-y": "auto" })
    // } else {
    //   $("ol").css({ "max-height": "", "overflow-y": "" })
    // }
//   }
// }

let notes = [];
let archive = [];

$(document).ready(function () {

  load();

  $(document).on('click', '.btn-close', function () {
    let index = $(this).closest("li").data("index");

    notes[index].archived = true;
    archive.push(notes[index]);

    notes.splice(index, 1);

    save();
    load();
  });

  $(".btn").click(function () {
    let inputVal = $("#taskInput").val();
    let headVal = $("#taskInput1").val();

    if (inputVal === "" || headVal === "") {
      alert("enter a task");
      return;
    }

    notes.push({
      id: Date.now(),
      head: headVal,
      task: inputVal,
      time: parseDate(),
      archived: false,
      done: false
    });

    save();
    load();
  });

  $(document).on("click", "li", function () {
    let index = $(this).data("index");

    notes[index].done = !notes[index].done;

    save();
    load();
  });

  $(document).on("dblclick", "li", function () {
    $(this).removeClass("textLine");
  });

  $(document).on("click", ".fa-pen", function () {
    let index = $(this).closest("li").data("index");

    let newHead = prompt("Edit title", notes[index].head);
    let newTask = prompt("Edit task", notes[index].task);

    if (newHead !== null && newTask !== null) {
      notes[index].head = newHead;
      notes[index].task = newTask;

      save();
      load();
    }
  });

});

function parseDate() {
  let date = new Date();
  let y = date.getFullYear();
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let ht = date.getHours();
  let mt = date.getMinutes();

  return `${d}.${m}.${y} ${ht}:${mt}`;
}

function load() {
  $("ol").html("");

  notes = JSON.parse(localStorage.getItem("notes")) || [];
  archive = JSON.parse(localStorage.getItem("archive")) || [];

  notes.forEach((note, i) => {

    let classes = "";
    if (note.done) classes += " textLine";
    if (note.archived) classes += " archived";

    $("ol").append(`
      <li data-index="${i}" class="${classes}">
        ${note.head}: ${note.task}
        <button type="button" class="btn-close"></button>
        <i class="fas fa-pen"></i>
      </li>
      <span class="time">${note.time}</span>
    `);

    if (window.innerWidth <= 500 && notes.length > 3) {
      $("ol").css({ "max-height": "20vh", "overflow-y": "auto" })
    } else {
      $("ol").css({ "max-height": "", "overflow-y": "" })
    }

    if (window.innerWidth >= 700 && notes.length > 4) {
      $("ol").css({ "max-height": "40vh", "overflow-y": "auto" })
    } else {
      $("ol").css({ "max-height": "", "overflow-y": "" })
    }
  });
}

function save() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("archive", JSON.stringify(archive));
}