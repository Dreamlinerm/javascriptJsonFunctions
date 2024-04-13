# asyncRecursiveObject
This is a simple asynchronous function, which recursively iterates over an object and returns a new object with the same structure, but with the values replaced by the result of the function passed as an argument.

# findUnusedValues
This function reads a json object, then flattens it to a single dimensional array and returns the keys of the values that are not unused in some file. It is useful to find the keys that are not being used in a build website, if it uses translations for example.

# formatJSONtoText
This saves a readable text file with the content of a json object. It is useful to save the content of a json object in a readable format.

# Run
To run the functions, you can use the following command:
```bash
node findUnusedValues && node formatJSONtoText && node asyncRecursiveObject
```