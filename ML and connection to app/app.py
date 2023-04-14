from flask import Flask, render_template, request, jsonify
import pandas as pd
import pickle
 
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

    
    input_data = [[acidity, aftertaste, aroma, body, flavor, price]]
    roast_prediction = log_reg_model.predict(input_data)[0]

    # Get the top 3 rated coffees with the predicted roast level
    top_coffees = coffee_data[coffee_data['roast_level'] == roast_prediction].nlargest(3, 'rating')

    # Convert the top coffees to a list of dictionaries
    top_coffees_list = top_coffees.to_dict('records')

    # if roast_prediction == 1:
    #     return "Light Roast"
    # elif roast_prediction == 2:
    #     return "Medium-Light Roast"
    # elif roast_prediction == 3:
    #     return "Medium Roast"
    # elif roast_prediction == 4:
    #     return "Medium-Dark Roast"
    # elif roast_prediction == 5:
    #     return "Dark Roast"
    # else:
    #     return "Go drink some tea"


   

    # Return the predictions and top coffees as JSON
    return jsonify({
        'log_reg_prediction': roast_prediction,
        'top_coffees': top_coffees_list
    })

if __name__ == '__main__':
    app.run(debug=True)
