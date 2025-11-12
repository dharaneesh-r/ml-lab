import React from "react";

const MlCode = () => {
  const code = `
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# ----------------------------
# Load dataset
# ----------------------------
data = load_iris()

# Features and target
X = data.data
y = data.target

# One-hot encoding for target variable
y = pd.get_dummies(y).values

# Split data into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=4)

# ----------------------------
# Initialize hyperparameters
# ----------------------------
learning_rate = 0.1
iterations = 8000
N = y_train.shape[0]

# Network architecture
input_size = 4       # Number of input features
hidden_size = 2      # Number of neurons in hidden layer
output_size = 3      # Number of output neurons (3 classes in Iris dataset)

# Initialize weights
np.random.seed(10)
W1 = np.random.normal(scale=0.5, size=(input_size, hidden_size))  # Hidden layer weights
W2 = np.random.normal(scale=0.5, size=(hidden_size, output_size))  # Output layer weights

# ----------------------------
# Helper functions
# ----------------------------
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def mean_squared_error(y_pred, y_true):
    return ((y_pred - y_true) ** 2).sum() / (2 * y_pred.size)

def accuracy(y_pred, y_true):
    acc = y_pred.argmax(axis=1) == y_true.argmax(axis=1)
    return acc.mean()

# ----------------------------
# Backpropagation Neural Network
# ----------------------------
mse_list = []
accuracy_list = []

for itr in range(iterations):
    # Feed Forward
    Z1 = np.dot(x_train, W1)
    A1 = sigmoid(Z1)
    Z2 = np.dot(A1, W2)
    A2 = sigmoid(Z2)

    # Compute loss and accuracy
    mse = mean_squared_error(A2, y_train)
    acc = accuracy(A2, y_train)
    mse_list.append(mse)
    accuracy_list.append(acc)

    # Backpropagation
    error_output = A2 - y_train
    dZ2 = error_output * A2 * (1 - A2)
    error_hidden = np.dot(dZ2, W2.T)
    dZ1 = error_hidden * A1 * (1 - A1)

    # Weight updates
    W2_update = np.dot(A1.T, dZ2) / N
    W1_update = np.dot(x_train.T, dZ1) / N

    W2 -= learning_rate * W2_update
    W1 -= learning_rate * W1_update

# ----------------------------
# Plot Mean Squared Error and Accuracy
# ----------------------------
plt.figure(figsize=(10, 5))

plt.subplot(1, 2, 1)
plt.plot(mse_list)
plt.title('Mean Squared Error')
plt.xlabel('Iterations')
plt.ylabel('MSE')

plt.subplot(1, 2, 2)
plt.plot(accuracy_list)
plt.title('Accuracy')
plt.xlabel('Iterations')
plt.ylabel('Accuracy')

plt.tight_layout()
plt.show()

# ----------------------------
# Test Accuracy
# ----------------------------
Z1 = np.dot(x_test, W1)
A1 = sigmoid(Z1)
Z2 = np.dot(A1, W2)
A2 = sigmoid(Z2)

test_acc = accuracy(A2, y_test)
print(f"Test Accuracy: {test_acc:.4f}")
`;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Python Code Viewer
      </h2>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default MlCode;
