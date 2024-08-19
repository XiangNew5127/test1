// Show the BMI Calculator section and hide the articles and start button
function showCalculator() {
    document.getElementById('bmiCalculatorSection').style.display = 'block';
    document.getElementById('bmiArticles').style.display = 'none'; // Hide articles
    document.getElementById('startButton').style.display = 'none'; // Hide start button
}

// Calculate BMI and display the result and category
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight.');
        return;
    }

    const bmi = weight / ((height / 100) ** 2); // BMI calculation
    const bmiResult = document.getElementById('bmiResult');
    const bmiType = document.getElementById('bmiType');
    const articleLink = document.getElementById('articleLink');

    bmiResult.textContent = `Your BMI is ${bmi.toFixed(1)}`;

    // Determine BMI category
    let category;
    if (bmi < 18.5) category = "underweightArticle";
    else if (bmi <= 24.9) category = "normalweightArticle";
    else if (bmi <= 29.9) category = "overweightArticle";
    else category = "obeseArticle";

    // Display BMI category
    bmiType.textContent = `You are ${category.split('Article')[0].replace(/([A-Z])/g, ' $1').toUpperCase()}.`;

    // Show "Learn More" button and set click handler
    articleLink.style.display = 'block';
    articleLink.onclick = () => showArticle(category);
}

// Show a specific article and hide the calculator section
function showArticle(articleId) {
    document.getElementById('bmiCalculatorSection').style.display = 'block'; // Hide calculator
    document.getElementById('bmiArticles').style.display = 'block'; // Show articles
    document.querySelectorAll('.article').forEach(article => article.style.display = 'none'); // Hide all articles
    document.getElementById(articleId).style.display = 'block'; // Show selected article
}