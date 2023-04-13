// Function to get roast type based on coffee preferences
function getRoastType(preferences) {
    const acidity = preferences.acidity;
    const aroma = preferences.aroma;
    const body = preferences.body;
    const flavor = preferences.flavor;
    const price = preferences.price;
    let roast;

    if (price >= 20 && body >= 8 && flavor >= 8) {
        roast = 'Dark Roast';
    } else if (price >= 15 && acidity >= 6 && aroma >= 6) {
        roast = 'Medium Roast';
    } else if (price <= 10 && acidity <= 4 && aroma >= 4) {
        roast = 'Light Roast';
    } else {
        roast = 'No match found';
    }

    return roast;
}

// Function to update the slider value display
function updateSliderValue(slider, output) {
    const sliderValue = document.getElementById(slider).value;
    document.getElementById(output).innerHTML = sliderValue;
}

// Set initial slider values
updateSliderValue('acidity', 'acidity-value');
updateSliderValue('aroma', 'aroma-value');
updateSliderValue('body', 'body-value');
updateSliderValue('flavor', 'flavor-value');
updateSliderValue('price', 'price-value');

// Update slider values when sliders are moved
document.querySelectorAll('input[type="range"]').forEach(slider => {
    slider.addEventListener('input', () => {
        const sliderId = slider.getAttribute('id');
        const outputId = `${sliderId}-value`;
        updateSliderValue(sliderId, outputId);
    });
});

// Process form submission
const form = document.getElementById('coffee-form');
form.addEventListener('submit', event => {
    event.preventDefault();

    const preferences = {
        acidity: parseInt(document.getElementById('acidity').value),
        aroma: parseInt(document.getElementById('aroma').value),
        body: parseInt(document.getElementById('body').value),
        flavor: parseInt(document.getElementById('flavor').value),
        price: parseInt(document.getElementById('price').value)
    };

    const roastType = getRoastType(preferences);

    const roastPredictionElement = document.getElementById('roast-prediction');
    roastPredictionElement.textContent = `Based on your preferences, we recommend a ${roastType} roast.`;

    const recommendationsElement = document.getElementById('recommendations');
    if (roastType === 'Dark Roast') {
        recommendationsElement.textContent = 'We recommend serving with chocolate or caramel-flavored desserts.';
    } else if (roastType === 'Medium Roast') {
        recommendationsElement.textContent = 'We recommend serving with fruity desserts or breakfast pastries.';
    } else if (roastType === 'Light Roast') {
        recommendationsElement.textContent = 'We recommend serving with citrus-flavored desserts or light breakfast dishes.';
    } else {
        recommendationsElement.textContent = 'Sorry, we do not have any serving recommendations for the roast type we recommended.';
    }
});

