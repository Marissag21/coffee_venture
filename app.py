from flask import Flask, render_template, request, jsonify
import pandas as pd
import pickle

app = Flask(__name__)

# Load the trained decision tree model
with open('decision_tree_model.pkl', 'rb') as f:
    dt_model = pickle.load(f)

# Load the trained k-nearest neighbors model
with open('knn_model.pkl', 'rb') as f:
    knn_model = pickle.load(f)

# Load the coffee data into a Pandas dataframe
coffee_data = pd.read_csv('coffee_data.csv')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the values selected by the user in the HTML form
    acidity = request.form['acidity']
    aroma = request.form['aroma']
    body = request.form['body']
    flavor = request.form['flavor']
    price = request.form['price']

    # Use the decision tree model to predict the roast level
    dt_prediction = dt_model.predict([[acidity, aroma, body, flavor, price]])[0]

    # Use the k-nearest neighbors model to predict the roast level
    knn_prediction = knn_model.predict([[acidity, aroma, body, flavor, price]])[0]

    # Get the top 3 rated coffees with the predicted roast level
    top_coffees = coffee_data[coffee_data['Roast Level'] == knn_prediction].nlargest(3, 'Rating')

    # Convert the top coffees to a list of dictionaries
    top_coffees_list = top_coffees.to_dict('records')

    # Return the predictions and top coffees as JSON
    return jsonify({
        'dt_prediction': dt_prediction,
        'knn_prediction': knn_prediction,
        'top_coffees': top_coffees_list
    })

if __name__ == '__main__':
    app.run(debug=True)
