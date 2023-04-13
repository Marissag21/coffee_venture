// Function to update the slider value display
function updateSliderValue(slider, output) {
    const sliderValue = document.getElementById(slider).value;
    document.getElementById(output).innerHTML = sliderValue;
  }
  
  // Set initial slider values
  updateSliderValue('acidity', 'acidity-value');
  updateSliderValue('aftertaste', 'aftertaste-value');
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
      aftertaste: parseInt(document.getElementById('aftertaste').value),
      aroma: parseInt(document.getElementById('aroma').value),
      body: parseInt(document.getElementById('body').value),
      flavor: parseInt(document.getElementById('flavor').value),
      price: parseFloat(document.getElementById('price').value)
    };
  
    // Send coffee preferences to Flask app for prediction
    fetch('/predict', {
      method: 'POST',
      body: JSON.stringify(preferences),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Update the page with the predicted roast type and recommended coffees
      document.getElementById('roast-prediction').innerHTML = `You should try ${data.dt_prediction} coffee.`;
  
      if (data.dt_prediction === 'Dark Roast') {
        document.getElementById('recommendations').innerHTML = 'We recommend serving with a hearty breakfast or as a dessert coffee.';
      } else if (data.dt_prediction === 'Medium Roast') {
        document.getElementById('recommendations').innerHTML = 'We recommend serving with lunch or as an afternoon pick-me-up.';
      } else if (data.dt_prediction === 'Light Roast') {
        document.getElementById('recommendations').innerHTML = 'We recommend serving with breakfast or as a mild coffee for any time of day.';
      } else {
        document.getElementById('recommendations').innerHTML = '';
      }
  
      // Display the top recommended coffees
      const topCoffees = data.top_coffees;
      let recommendationsList = '';
      topCoffees.forEach(coffee => {
        recommendationsList += `<li>${coffee.name} - ${coffee.roaster} (${coffee.rating} rating)</li>`;
      });
      document.getElementById('recommendations-list').innerHTML = recommendationsList;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  