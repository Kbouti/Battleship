function boardLogicReportToDom(){
    let newElement = document.createElement(`div`);
    newElement.innerHTML = `testFile1 test success`;
    document.body.appendChild(newElement);
    return;
}
function boardLogicReportToConsole(){
    console.log(`testFile1 test success`)
    return;
}


function sum(a, b){
    return a + b;
}



module.exports = {
    boardLogicReportToDom,
    boardLogicReportToConsole,  
    sum 
}