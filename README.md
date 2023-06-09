# coffee_venture

Calling all coffee lovers! To understand the taste of of our users, we analyzed a data set of different coffees to predict their preferred coffee roast based on different characteristics of the coffee. The LogisticRegression Model was used to make predictions on the preferred roast level based on a number of coffee preferences.

Data source: https://www.kaggle.com/datasets/patkle/coffeereviewcom-over-7000-ratings-and-reviews

##Pipeline Model

![image_720](https://user-images.githubusercontent.com/115592072/232645533-85db0236-b8e4-4ea1-9487-79a689461318.png)


## Part 1: Data Cleaning

To begin, dependencies were first loaded onto our Jupyter Notebook, and the CSV was read into the dataframe. In order to begin cleaning the data, the columns 'with_milk', 'agtron', 'roaster', 'url', 'bottom_line', 'review_date' were removed because they were not neccessary for analysis and predictions. Then, the null values were dropped.

The 'roaster_location'  column was split into new columns('city', 'state'). Next, any additional null values were dropped and the data types were changed.

Next, the 'est_price' column was prepared for standardization by  splitting it into 'currency', 'units', and 'numeric_cost'. Then, consistent currency codes were generated by using regex to define the regular expression pattern.

The units were then converted to ounces by splitting the 'units' column, creating lists for similar units of measurements, and looping over each value to standardize the units of measurement. The index was then reset, and the columns were renamed for clarity.

Next, the cost was converted to USD. The easy-exchange-rates package was used for a more dynamic exchange rate and to not just rely on a specific date. Then a function was defined in order to convert all of the prices to USD.

Lastly, the price was calculated in USD per ounce. A new column was created 'cost_usd' and the 'numeric_cost' and currency conversion were divided to get the price in USD. Another column was created 'usd_per_oz', and the 'cost_usd' was divided by 'ounces' to get the price per ounce. Then the 'numeric_cost', 'currency', 'ounces', 'cost_usd' columns were dropped since they were not needed any longer. The column 'usd_per_oz' was then changed to type (float) and money_df  was saved as a csv for analysis.

## Part 2: Visualizations

Using the cleaned data, visualizations were created through Tableau in order to gain a better understanding about the coffee data and view patterns and trends. Visualizations created include the count of coffees per roast level, the characterization of each roast level, the distribution of ratings, and the origin countries for the coffee beans.

Tableau Visualization Links:

- https://public.tableau.com/views/CoffeeMap_16816559402780/Sheet6?:language=en-US&:display_count=n&:origin=viz_share_link
- https://public.tableau.com/views/CoffeeCharts_16816551362230/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link

Roast level by Roaster location:
Dark roast Coffees are roasted on the west coast whereas Medium to light coffees are roasted on the Northern/North-eastern part of the country.

- https://public.tableau.com/views/COFFEEDATAVISUALS/RoastlevelbyRoasterlocation?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link

Cost Analysis:

Light roast coffees are the most expensive Roast.
https://public.tableau.com/views/CoffeecostbyRoastLevel/MostexpensivebyRoastlevel?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link

The most expensive Coffee is from the Boquete region of western Panama.
https://public.tableau.com/views/Coffeecostbyorigin/MostexpensivebyOrigin?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link

## Part 3: Data Preprocessing and Machine Learning Model

First, the csv with the data is read in as a DataFrame and 'roast_level' value_counts is printed. Next, the roast levels are categorized  by number using a for loop. The 'roast_level column is cast as an integer, and the columns that are not needed for the prediction are dropped.

Next, the X and y are determined and the data is split with train_test_split, and the MinMaxScaler is used to scale and transform the data. Then the LogisticRegression model is used for predictions.The data is then fit to the model and then scored. Some predictions are made and printed into a DataFrame and the accuracy score and the confusion matrix are printed along with the classification report.

After the predictions were made, we resampled the data with RandomOverSampler to balance it out. The data is then retrained, resplit, and rescaled, and the logisticRegression model is reran on the balanced data. New predictions are made and the accuracy score, confusion matrix, and the classification report are reprinted.

Lastly, a function was created that is used for making predictions based on certain parameters that the consumer will be queried on, and the model is saved to a pkl file.

## Part 4: App Development

A Flask app is used to query the user for their input on coffee preferences, and based on their input, the user will get a prediction on the type of roast they'd like most with the top three recommended coffees along with their respective descriptions. They will also get the acidity, aftertaste, aroma, body, and flavor levels.

JavaScript is used for interactivity and css is used for adding style and background.

![App Landing Page](https://user-images.githubusercontent.com/115592072/232641818-1d15ce0e-edc6-44c9-b90e-5d506356dd6d.png)



## Summary Shortcomings and Observations:

To sum it all up, we realized that more than half of the roast levels are medium-light, and that  our data was skewed because of the uneven numbers. Before oversampling and balancing the data, the accuracy score was at 72%. After oversampling, the accuracy returned at 45%. Our data was limited to a certain amount of features which is what hurt our accuracy score in the end. The time period for this project was very limited which didn't allow for extensive preprocessing with the string data columns. This could've helped by adding additional features to our data set thus improving our accuracy score.  On the bright side, with additional preprocessing this ML Model could continue to improve and take us on a continuous coffee venture. 

Prezi:https://prezi.com/view/86eoAZO5Y6OYEbuntGOc/

Project Members:

Ankita Sarkar

Kim Sernett

Iqra Imam

Angel Toscano

Raelle Nalos

Marissa Gallegos


