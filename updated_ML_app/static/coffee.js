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
  console.log('hello')
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
      console.log(data.top_coffees)
      document.getElementById('roast-prediction').innerHTML = `You should try a <b>${data.prediction}</b> coffee.`;

      if (data.prediction === 'Dark') {
        document.getElementById('recommendations').innerHTML = 'We recommend serving with a hearty breakfast or as a dessert coffee.';
      } else if (data.prediction === 'Medium-Light') {
        document.getElementById('recommendations').innerHTML = 'We recommend serving with lunch or as an afternoon pick-me-up.';
      } else if (data.prediction === 'Light') {
        document.getElementById('recommendations').innerHTML = 'We recommend serving with breakfast or as a mild coffee for any time of day.';
      } else {
        document.getElementById('recommendations').innerHTML = 'Go drink some tea';
      }
      document.getElementById('top-3').innerHTML = '<b><u>These are the top three coffees we recommend you try:</b></u>'
      // Display the top recommended coffees
      const topCoffees = data.top_coffees;
      let recommendationsList = '';
      for (let i = 0; i < topCoffees.length; i++) {
          recommendationsList += `<li> <p><b><u>${topCoffees[i].title}</b></u> : This is a ${topCoffees[i].blind_assessment}<p/>
          <p>The acidity is ${topCoffees[i].acidity_structure}. 
            The aftertaste is ${topCoffees[i].aftertaste}.
            The aroma is ${topCoffees[i].aroma}. 
            The body is ${topCoffees[i].body}. 
            The flavor is ${topCoffees[i].flavor}.<p/>
            <p>The overall rating of this coffee is ${topCoffees[i].rating}. <p/></li>`
          }
      document.getElementById('recommendations-list').innerHTML = `<ol>${recommendationsList}</ol>`;
      console.log(recommendationsList);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

