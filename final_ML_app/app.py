from flask import Flask, render_template, request, jsonify
import pandas as pd
import pickle
import json
 
app = Flask(__name__)

# Load the ml model
with open('logistic_regression_oversampled.pkl', 'rb') as f:
    log_reg_model = pickle.load(f)

# Load the coffee data into a Pandas dataframe
coffee_data = pd.read_csv('../final_data/final_coffee_data.csv')

@app.route('/')
def index():
    return render_template('coffee.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the values selected by the user in the HTML form
    print(f"the request form is {request.data}")
    form = request.data.decode('utf-8')
    form = json.loads(form)
    print(f'the dictionary form is {form}')
    acidity = form['acidity']
    aftertaste = form['aftertaste']
    aroma = form['aroma']
    body = form['body']
    flavor = form['flavor'] 
    price = form['price']

    
    input_data = [[acidity, aftertaste, aroma, body, flavor, price]]
    roast_prediction = int(log_reg_model.predict(input_data)[0])



    if roast_prediction == 1:
        roast_prediction = "Light"
    elif roast_prediction == 2:
        roast_prediction = "Medium-Light"
    elif roast_prediction == 3:
        roast_prediction = "Medium"
    elif roast_prediction == 4:
        roast_prediction =  "Medium-Dark"
    elif roast_prediction == 5:
        roast_prediction =  "Dark"
    else:
        roast_prediction = "Go drink some tea"

        
    # Get the top 3 rated coffees with the predicted roast level and all features
    top_coffees = coffee_data[(coffee_data['roast_level'] == roast_prediction) & (coffee_data['acidity_structure'] == acidity) & (coffee_data['aftertaste'] == aftertaste) & (coffee_data['aroma'] == aroma)& (coffee_data['body'] == body) & (coffee_data['flavor'] == flavor)]

    if len(top_coffees) < 3:
    # Get the top 3 rated coffees with the predicted roast level and any other features
        remaining_coffees = coffee_data[(coffee_data['roast_level'] == roast_prediction) & (coffee_data.index.isin(top_coffees.index) == False)].nlargest(3-len(top_coffees), 'rating')
        top_coffees = pd.concat([top_coffees, remaining_coffees])

    else:
        top_coffees = top_coffees.nlargest(3, 'rating')
    #print(type(top_coffees))
    #print(top_coffees)


    # Convert the top coffees to a list of dictionaries
    top_coffees_list = top_coffees.to_dict('records')
    print(type(top_coffees_list))
    print(top_coffees_list)
    # Return the predictions and top coffees as JSON
    return {
        'prediction': roast_prediction,
        'top_coffees': top_coffees_list
    }

if __name__ == '__main__':
    app.run(debug=True)
