function searchTable() {
  const input = document.getElementById("search");
  const filter = input.value.toUpperCase();
  const table = document.querySelector("table");
  let tr = table.getElementsByTagName("tr");
  let txtValue = "";

  tr.forEach((row, index) => {
    let match = false;
    let td = row.getElementsByTagName("td");

    td.forEach(cell => {
      txtValue = cell.textContent || cell.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        match = true;
      }
    });

    tr[index].style.display = match ? "" : "none";
  });

  tr[0].style.display = "";
}

function setIFrameHeight(target) {
  parent.document.querySelector(target).style.height =
    Math.min(
      document.documentElement.clientHeight - 65,
      window.innerHeight,
      480
    ) + "px";
}
