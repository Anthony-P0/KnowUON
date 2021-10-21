//--GeeksforGeeks. (2019, September 20). How to display div elements using Dropdown Menu in jQuery?. 
//https://www.geeksforgeeks.org/how-to-display-div-elements-using-dropdown-menu-in-jquery/.

$(document).ready(function() {
    $("select").on('change', function() {
        $(this).find("option:selected").each(function() {
            var staff = $(this).attr("value");
            if (staff) {
                $(".UON").not("." + staff).hide();
                $("." + staff).show();
            } else {
                $(".UON").hide();
            }
        });
    }).change();
});




























// const program = document.getElementById("program");
// const role = document.getElementById("role");
// const campus = document.getElementById("campus");

// var results = document.getElementsById("results");

// function getResults() {

//     if (program.value == "any") {
//         if (role.value == "any") {
//             if (campus.value == "any") {
//                 results.style.display = "block";
//             }
//         }
//     }
// }

// // } else if (program.value == "computer-science") {

// // } else if (program.value == "data-science") {
    
// // } else if (program.value == "information-technology") {
    
// // } else if (program.value == "software-engineering") {
    
// // }

// // if (campus.value == "any") {
// //     results.innerHTML = "Alexandre Mendes";
// // } else if (campus.value == "callaghan") {

// // } else if (campus.value == "city") {
    
// // } else if (campus.value == "ourimbah") {
    
// // } else if (campus.value == "port-mac") {
    
// // } else if (campus.value == "singapore") {
    
// // } else if (campus.value == "sydney") {
    
// // }