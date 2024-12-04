
// function onclick of add registration button
function register() {
    console.log("register button click");

    //take values from input fields
    const studentName = document.getElementById("fullname").value;
    const studentParentname = document.getElementById("mothername").value;
    const classno = document.getElementById("classno").value
    const contactNo = document.getElementById("contactno").value;
    const rollNo = document.getElementById("rollno").value;
    const studentId = document.getElementById("studentid").value;
    const studentAddress = document.getElementById("address").value;
    const studentemail = document.getElementById("email").value;

    //stored it in array
    const allStudents = {
        studentName, studentParentname, classno, contactNo, rollNo, studentId, studentAddress, studentemail
    }

    if (!studentName || !studentParentname || !classno || !contactNo || !rollNo || !studentId || !studentAddress || !studentemail) {
        alert("All Details are mandetory ! Please Fill All the Details..");
    } else {
        //To store the data in localstorage calling another function
        allStudentsinLocal(allStudents);

        //to create rows with data in tablebody , calling another function
        createTableRows(allStudents);


        //after adding input fields should be cleared
        document.getElementById("fullname").value = "";
        document.getElementById("mothername").value = "";
        document.getElementById("classno").value = "";
        document.getElementById("contactno").value = "";
        document.getElementById("rollno").value = "";
        document.getElementById("studentid").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";

        //Changing button text after updating the student details
        if (document.getElementById("btnanchor").textContent == "Update Student") {
            document.getElementById("btnanchor").textContent = "Add Student"
        }

    }

}

//created function to store data in localstorage
function allStudentsinLocal(allStudents) {

    //get data from localstorage
    const DataStore = JSON.parse(localStorage.getItem("allStudents")) || []

    //push data in DataStore
    DataStore.push(allStudents);

    //push data from DataStore to localstorage
    localStorage.setItem("allStudents", JSON.stringify(DataStore));
    console.log("Datastore", DataStore);

}

//created fucntion for tablerows
function createTableRows(allStudents) {

    console.log("createTableRows function call", allStudents.studentName);

    const localData = JSON.parse(localStorage.getItem("allStudents")) || [];
    console.log("localData", localData);
    console.log("localData", localData[0].studentName);


    const tablebody = document.getElementById("studentData");
    const tablerow = document.createElement("tr");
    tablerow.innerHTML = `
    <td>${allStudents.studentName}</td>
    <td class="disabledPhonScrn">${allStudents.studentParentname}</td>
    <td>${allStudents.classno}</td>
    <td class="disabledPhonScrn">${allStudents.contactNo}</td>
    <td>${allStudents.rollNo}</td>
    <td class="disabledPhonScrn">${allStudents.studentId}</td>
    <td class="disabledPhonScrn">${allStudents.studentAddress}</td>
    <td class="disabledPhonScrn">${allStudents.studentemail}</td>
 

    `
    tablebody.appendChild(tablerow);

    //create row tr first
    // const tablerow = document.createElement("tr");
    // for (let key in allStudents) {
    //     const studentstexttd = document.createElement("td");
    //     studentstexttd.textContent = allStudents[key];
    //     tablerow.appendChild(studentstexttd);
    // }


    //create td table data
    // const tabledataname = document.createElement("td");
    // //give value
    // tabledataname.textContent = allStudents.studentName;
    // //add td in tr
    // tablerow.appendChild(tabledataname);


    //Reset Button added
    const resetbuttontd = document.createElement("td");
    const resetebutton = document.createElement("button");
    const resetanchor = document.createElement("a");
    resetanchor.textContent = "Reset";
    resetanchor.href = "#registrationform"
    resetebutton.appendChild(resetanchor);
    resetbuttontd.appendChild(resetebutton);
    tablerow.appendChild(resetbuttontd);

    //Reset button functionality
    resetebutton.addEventListener("click", function () {
        document.getElementById("fullname").value = allStudents.studentName;
        document.getElementById("mothername").value = allStudents.studentParentname;
        document.getElementById("classno").value = allStudents.classno;
        document.getElementById("contactno").value = allStudents.contactNo;
        document.getElementById("rollno").value = allStudents.rollNo;
        document.getElementById("studentid").value = allStudents.studentId;
        document.getElementById("address").value = allStudents.studentAddress;
        document.getElementById("email").value = allStudents.studentemail;

        tablerow.remove();
        const DataStored = JSON.parse(localStorage.getItem("allStudents")) || [];
        const updateData = DataStored.filter(s => s.studentId !== allStudents.studentId);
        // updateLocal(updateData);
        localStorage.setItem("allStudents", JSON.stringify(updateData));

        //Changing button text after updating the student details
        document.getElementById("btnanchor").textContent = "Update Student"
    })


    //Delete Button Added
    const deletbuttontd = document.createElement("td");
    const deletebutton = document.createElement("button");
    deletebutton.textContent = "Delete";
    deletbuttontd.appendChild(deletebutton);
    tablerow.appendChild(deletbuttontd);


    //Delete button functionality
    deletebutton.addEventListener("click", function () {
        tablerow.remove();
        // LocalDataDelete(tablerow);
        console.log("LocaldataDelete function call")
        const DataStored = JSON.parse(localStorage.getItem("allStudents")) || [];
        const updateData = DataStored.filter(s => s.studentId !== allStudents.studentId);
        localStorage.setItem("allStudents", JSON.stringify(updateData));
    })

    //View Button Added for phone screen
    const viewDetails = document.createElement("td");
    const viewButton = document.createElement("button");
    const viewButtonanchor = document.createElement("a");
    viewButtonanchor.textContent = "View";
    viewButtonanchor.href = "#viewDetailsExpand";
    viewButton.appendChild(viewButtonanchor);
    viewDetails.appendChild(viewButton);
    viewDetails.className = "disabledScrn";
    tablerow.appendChild(viewDetails);

    viewButton.addEventListener("click", function () {
        const viewDetailSection = document.getElementById("viewDetailsExpand");
        viewDetailSection.style.display = "block"

        console.log("view click", tablerow);
        console.log("view click", tablerow);

        const name = tablerow.cells[0].innerHTML;
        console.log("name", name);
        const parentname = tablerow.cells[1].innerHTML;
        const classno = tablerow.cells[2].innerHTML;
        const contactNo = tablerow.cells[3].innerHTML;
        const RollNo = tablerow.cells[4].innerHTML;
        const StudentId = tablerow.cells[5].innerHTML;
        const Address = tablerow.cells[6].innerHTML;
        const Email = tablerow.cells[7].innerHTML;

        viewDetailSection.innerHTML = `
        <h3>Student Name - ${name}</h3>
        <h4>Parent Name - ${parentname}</h4>
        <h4>Class - ${classno}</h4>
        <h4>Contact No - ${contactNo}</h4>
        <h4>Roll No - ${RollNo}</h4>
        <h4>Student Id - ${StudentId}</h4>
        <h4>Address - ${Address}</h4>
        <h4>Email ID - ${Email}</h4>
        <button onClick="hide()">Hide</button>
        `
    })


    //join tr with tbody
    document.getElementById("studentData").appendChild(tablerow);
}

//function if page loads then data should not get dissapeered
function loadstudents() {
    console.log("loadstudents function call");
    const storeData = JSON.parse(localStorage.getItem("allStudents")) || [];
    storeData.forEach(allStudents => createTableRows(allStudents));
    console.log("rows", createTableRows);
}

//if window refreshing then loadstudents function should call
window.onload = loadstudents;
function hide() {
    location.reload();
}

//function for reset and delete to remove data from localstorage
// function LocalDataDelete(tablerow , allStudents, studentId){
//     console.log("LocaldataDelete function call")
//     tablerow.remove();
//     const DataStored = JSON.parse(localStorage.getItem("allStudents")) || [];
//     const updateData = DataStored.filter(s => s.studentId !== allStudents.studentId);
//     // updateLocal(updateData);
//     localStorage.setItem("allStudents" , json.stringify(updateData));
// }

// function updateLocal(updateData){
//             localStorage.setItem("allStudents", json.stringify(updateData));

// }