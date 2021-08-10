var col = document.getElementsByClassName("collapse-button");
var i;

for(i = 0; i < col.length; i++) {
    col[i].addEventListener("click", collapse);
}

function collapse() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}