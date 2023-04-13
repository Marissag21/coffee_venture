from flask import Flask, render_template, request, jsonify
import pandas as pd
import pickle
import sklearn

app = Flask(__name__)

# Load the ml model
with open('logistic_regression_oversampled.pkl', 'rb') as f:
    log_reg_model = pickle.load(f)

# Load the coffee data into a Pandas dataframe
coffee_data = pd.read_csv('coffee_clean_final.csv')

@app.route('/')
def index():
    return render_template('coffee.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the values selected by the user in the HTML form
    acidity = request.form['acidity']
    aftertaste = request.form['aftertaste']
    aroma = request.form['aroma']
    body = request.form['body']
    flavor = request.form['flavor']
    price = request.form['price']

    # Use the decision tree model to predict the roast level
    dt_prediction = log_reg_model.predict([[acidity, aftertaste, aroma, body, flavor, price]])[0]

    # Get the top 3 rated coffees with the predicted roast level
    top_coffees = coffee_data[coffee_data['roast_level'] == dt_prediction].nlargest(3, 'rating')

    # Convert the top coffees to a list of dictionaries
    top_coffees_list = top_coffees.to_dict('records')

    # Return the predictions and top coffees as JSON
    return jsonify({
        'dt_prediction': dt_prediction,
        'top_coffees': top_coffees_list
    })

if __name__ == '__main__':
    app.run(debug=True)
