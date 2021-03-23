export const generalData = [
  `1.  **Precision** is mathematically the ratio between the correctly predicted positive values and the number of times that particular class was predicted to be positive. It shows the exactness or confidence of the model upon its prediction of that specific task.  
  2.  **If the precision value for a class is low**: The model is not confident whether it belongs to that class or not. Possibility: The class images domain is varying / higher effect of augmentation on the class. (Augmentation will help increase the precision)
  3.  **If the precision value for a class is high**, the model is augmentation invariant or the class domain is similar. 
  4.  **F1 Score** is the balance between Precision and Recall. The recall is the class accuracy for the class. 
  5.  **If F1 - Score is Low, but precision is High**: Then the recall is low, and that means that the model is not able to discriminate the class from other classes. Causes: Very Similar looking classes might be present in the dataset, or the particular class samples are low. (Add more images)
  6.  **ROC curve:**  It is the plot between, True positive rate and False positive rate. The corner of the plot should lie in the upper left corner.
  7.  If the **ROC Curve corner** is located in the **center or lower right corner**, then the model is getting confused with other classes/similar-looking classes present in the dataset/overlapping classes.  Try adding images of both classes to reduce confusion.`,
  `1.  **The confusion matrix plots the assignment/prediction distribution to various classes in the dataset.**
  2.  Most of the assigned values of Confusion matrix should be in the **main diagonal of the matrix.**
  3.  If the diagonal element of a row is not well allocated, or its value is low, then the model has not learnt the particular class or not able to generalise. Suggestion: Add more images to the class. Once more images are added, augmentation is added accordingly.`,
  '',
  '',
  ''
]
