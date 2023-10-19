// https://docs.google.com/spreadsheets/d/1_3068c9zWETmoQSl3z6om8MRLr4CF3_C4DaTaTF1Jsg/gviz/tq?tqx=out:json&gid=452555812

const getLichTrinh = () => {
  fetch(
    "https://docs.google.com/spreadsheets/d/1_3068c9zWETmoQSl3z6om8MRLr4CF3_C4DaTaTF1Jsg/gviz/tq?tqx=out:json&gid=452555812"
  )
    .then((response) => response.text())
    .then((data) => {
      const jsonData = JSON.parse(data.substring(47).slice(0, -2));
      const csvData = convertJSONToCSV(jsonData.table);
      const csvDataWithoutHeader = removeFirstLine(csvData);

      let a = document.getElementById("khoadeptrai");
      let stringABC = "";
      console.log(csvDataWithoutHeader);
      csvDataWithoutHeader.map((abc) => {
        let dataabc = abc.split(",");
        console.log(dataabc);
        stringABC += `<li class="tl-item" ng-repeat="item in retailer_history">
      <div class="timestamp">
        <strong>${dataabc[0].replace(/"/g, "")}</strong> <br />
        ${dataabc[1].replace(/"/g, "")}
      </div>
      <div class="item-title">${dataabc[2].replace(/"/g, "")}</div>
      <div class="item-detail">
      ${dataabc[3].replace(/"/g, "")}
      </div>
    </li>`;
      });
      a.innerHTML = stringABC;
    })
    .catch((error) => {
      console.error(error);
    });
};

function convertJSONToCSV(jsonData) {
  const header = jsonData.cols.map((col) => col.id);
  const rows = jsonData.rows.map((row) => {
    return header.map((key, index) => {
      return row.c[index].v;
    });
  });
  const csv = [header.join(","), ...rows.map((row) => row.join(","))].join(
    "\n"
  );
  return csv;
}
function removeFirstLine(csvData) {
  const lines = csvData.split("\n");
  lines.splice(0, 1);
  return lines;
}

$(document).ready(function () {
  getLichTrinh();
});
