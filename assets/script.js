document.addEventListener('DOMContentLoaded', function () {
    // Get the button element
    const calculateBtn = document.getElementById('calculate-btn');

    // Add event listener to the button
    calculateBtn.addEventListener('click', calculateGrade);

    // Add input listeners to all subject fields to enable Enter key submission
    const subjectInputs = document.querySelectorAll('input[type="number"]');
    subjectInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                calculateGrade();
            }
        });
    });

    // Function to calculate the grade
    function calculateGrade() {
        // Retrieve the value of the input element with the ID's 'subject1' to 'subject5'.
        // Use `parseFloat` to convert the value (which is a string) into a floating-point number.
        // If the input value is empty, invalid, or cannot be converted to a number, use `0` as a fallback (default value).
        //The logical OR (||) operator works by returning the first truthy operand it encounters.
        const subject1 = parseFloat(document.getElementById('subject1').value) || 0;
        const subject2 = parseFloat(document.getElementById('subject2').value) || 0;
        const subject3 = parseFloat(document.getElementById('subject3').value) || 0;
        const subject4 = parseFloat(document.getElementById('subject4').value) || 0;
        const subject5 = parseFloat(document.getElementById('subject5').value) || 0;

        // Conditions to check if the input values are valid numbers between 0 and 100
        // If any of the input values are not valid, show an error message and return early from the function.
        if (subject1 < 0 || subject1 > 100 ||
            subject2 < 0 || subject2 > 100 ||
            subject3 < 0 || subject3 > 100 ||
            subject4 < 0 || subject4 > 100 ||
            subject5 < 0 || subject5 > 100) {

            // Create a Bootstrap alert for error
            showAlert("Please enter valid marks between 0 and 100 for all subjects.", "danger");
            return;
        }

        // Calculate total marks
        const totalMarks = subject1 + subject2 + subject3 + subject4 + subject5;

        // Calculate average marks
        const averageMarks = totalMarks / 5;

        // Determine grade based on average
        let grade, gradeClass;

        if (averageMarks >= 90) {
            grade = "A+";
            gradeClass = "grade-a-plus";
        } else if (averageMarks >= 80) {
            grade = "A";
            gradeClass = "grade-a";
        } else if (averageMarks >= 70) {
            grade = "B";
            gradeClass = "grade-b";
        } else if (averageMarks >= 60) {
            grade = "C";
            gradeClass = "grade-c";
        } else if (averageMarks >= 50) {
            grade = "D";
            gradeClass = "grade-d";
        } else {
            grade = "F";
            gradeClass = "grade-f";
        }

        // Display results
        const totalMarksElement = document.getElementById('total-marks');
        const averageMarksElement = document.getElementById('average-marks');
        const gradeElement = document.getElementById('grade');

        totalMarksElement.textContent = totalMarks;
        averageMarksElement.textContent = averageMarks.toFixed(2);

        // Remove previous grade classes
        gradeElement.className = "col-6 text-end fs-5 fw-bold";

        // Add the new grade class
        gradeElement.classList.add(gradeClass);
        gradeElement.textContent = grade;

        // Add animation class to result
        const resultElement = document.getElementById('result');
        resultElement.classList.remove('animate-result');

        // Trigger reflow to restart animation
        void resultElement.offsetWidth;

        resultElement.classList.add('animate-result');

        // Show success message
        showAlert("Grade calculated successfully!", "success");
    }

    // Function to show Bootstrap alerts
    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show mt-3`;
        alert.role = 'alert';

        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // Insert alert before the result section
        const resultElement = document.getElementById('result');
        resultElement.parentNode.insertBefore(alert, resultElement);

        // Auto dismiss after 3 seconds
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 3000);
    }
});