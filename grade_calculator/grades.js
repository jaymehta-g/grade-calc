var grade_fields = [
    document.getElementById("grade_field_1"),
    document.getElementById("grade_field_2"),
    document.getElementById("grade_field_3")
]

var outputs = [...document.getElementsByClassName("output")]

var semester_grade_field = document.getElementById("grade_field_sem")

var final_weight_field = document.getElementById("final_percent")

var final_weight = 0.15

function getNumberValue(element) {
    return parseFloat(element.value)
}

function onPeriodGradeFieldChanged() {
    var total = 0
    grade_fields.forEach(element => {
        total+=getNumberValue(element)
    });
    semester_grade_field.value = total/3

    refreshGradesRequired()
}
grade_fields.forEach(element => {
    element.onchange = onPeriodGradeFieldChanged
});

function onSemesterGradeFieldChanged() {
    grade_fields.forEach(element => {
        element.value = (100*getSemesterGrade()).toString()
    });
    refreshGradesRequired()
}
semester_grade_field.onchange = onSemesterGradeFieldChanged

function getSemesterGrade() {
    return getNumberValue(semester_grade_field)*0.01
}

function onFinalWeightFieldChanged() {
    final_weight = getNumberValue(final_weight_field)*0.01
    refreshGradesRequired()
}
final_weight_field.onchange = onFinalWeightFieldChanged

function calculateFinalGradeRequired(semester, desired) {
    // takes 0-1.00 grades
    var semester_weight = 1 - final_weight
    var required = (desired-(semester*semester_weight))/final_weight

    return required
}

truncateDecimals = function (number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};

function refreshGradesRequired() {
    console.log("need to refresh")
    outputs.forEach(element => {
        var element_grade = parseFloat(element.getAttribute("data-grade"))
        var required = calculateFinalGradeRequired(getSemesterGrade(), element_grade)
        element.innerHTML = truncateDecimals(required*100,2)
    });
}

refreshGradesRequired()