function average(scores) {
    let sum = 0;
    let len = scores.length;
    
    for (let i = 0; i < len; i++) {
        sum += scores[i];
    }
    
    let ave = Math.round(sum / len);
    return ave;
}

//test
let scores1 = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores1));

let scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));