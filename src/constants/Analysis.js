export const generalData = [
  `1.  **Precision** is mathematically the ratio between the correctly predicted positive values and the number of times that particular class was predicted to be positive. It shows the exactness or confidence of the model upon its prediction of that specific task.  
  2.  **If the precision value for a class is low**: The model is not confident whether it belongs to that class or not. Possibility: The class images domain is varying / higher effect of augmentation on the class. (Augmentation will help increase the precision)
  3.  **If the precision value for a class is high**, the model is augmentation invariant or the class domain is similar. 
  4.  **F1 Score** is the balance between Precision and Recall. The recall is the class accuracy for the class. 
  5.  **If F1 - Score is Low, but precision is High**: Then the recall is low, and that means that the model is not able to discriminate the class from other classes. Causes: Very Similar looking classes might be present in the dataset, or the particular class samples are low. (Add more images)
  6.  **ROC curve:**  It is the plot between, True positive rate and False positive rate. The corner of the plot should lie in the upper left corner.
  7.  If the **ROC Curve corner** is located in the **center or lower right corner**, then the model is getting confused with other classes/similar-looking classes present in the dataset/overlapping classes.`,
  `1.  **The confusion matrix plots the assignment/prediction distribution to various classes in the dataset.**
  2.  Most of the assigned values of Confusion matrix should be in the **main diagonal of the matrix.**
  3.  If the diagonal element of a row is not well allocated, or its value is low, then the model has not learnt the particular class or not able to generalise. Suggestion: Add more images to the class. Once more images are added, augmentation is added accordingly.`,
  `1.  **If the confidence distribution plot for correct is peaking near 1, then the model has a good confidence in predicting samples.**
  2.  **If the confidence distribution plot for correct is peaking away from 1, then the model in not good and can quickly fail with slight changes. Try adding more augmentation and transformation to the dataset.**
  3.  **If the confidence distribution plot for incorrect is peaking near 1, then the model predicts wrong samples with high confidence. Add more data by augmenting or train model more extensively.**
  4.  **If the confidence distribution plot for correct is peaking away from 1,** then the model is good in identifying incorrectly predicted samples. Slight changes can improve the results. 
  5.  **If the Epistemic of a class is low,** then that class is either out of distribution for a model or has fewer data points for the model.
  6.  **If the Aleatoric of a class is high**, then that class has much noise; try adding wavelet filter or histogram equalization to remove noise.`,
  `1.  **If on changing the angle of rotation, STN cannot focus,** then add some more rotated augmented images to the dataset.
  2.  **If on changing the rotation angle, Grad-CAM changes the heat map** features completely, Add many rotated images to the dataset.
  3.  **If on adding Blur to image model scores change**, you can estimate the limit to which blur works for your model. For higher thresholds, try adding more blur samples to the dataset. NOTE: Blur has a limit based on images
  4.  **If the model cannot cope with the blur effect,** use wavelet transformation to make the model stable.
  5.  **If grad cam can catch noise,** then the model can handle uncertain samples. Increase noise to observe grad cam on noise.
  6.  **If the model is unable to handle noise**, apply wavelet transformation to the images.`,
  `1.  **If the range of weights decreases** consecutively, then the model is optimal.
  2.  **If distribution upper and lower limits don't go almost asymptotic**, more layers can be added to the model.
  3.  **If any layer shows a sudden high range** of weights then, try to decrease the layer's kernel size.
  4.  **If the Last layer tends to have a bimodal distribution,** than that model is best.`,
]
