# This is a single-line comment
# It explains the purpose of the following code

"""
This is a multiline comment using triple double quotes.
It spans multiple lines and is often used as a docstring to document functions or classes.
"""
import requests

# Define a function to calculate the square of a number
def square(number):
    '''
    This function calculates the square of a given number.

    Parameters:
        number (int): The number to be squared.

    Returns:
        int: The square of the input number.
    '''
    # This is a single-line comment inside the function
    # It explains the operation being performed
    return number ** 2

# Call the function to calculate the square of 5
result = square(5)

# Print the result
print("The square of 5 is:", result)