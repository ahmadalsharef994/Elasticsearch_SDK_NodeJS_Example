# Elasticsearch_SDK_NodeJS_Example

**Repository Owner:** [Repository Owner Username Here]  
**Last Updated:** [Last Update Date Here]

## Overview

This repository provides a working example of using Elasticsearch version 7.1.12 with Node.js, demonstrating essential operations like creating, deleting indexes, and managing documents. It aims to assist developers facing challenges due to scarce documentation for earlier versions of Elasticsearch's JavaScript SDK.

## Technologies Used

- **Elasticsearch 7.1.12**: Downgraded from 8.3.1 for its lighter resource consumption while retaining full functionality.
- **Node.js**: JavaScript runtime environment to execute the backend code.
- **@elastic/elasticsearch**: Official Elasticsearch client for Node.js.

## Features

- **Index Management**: Functions to create and delete indices, handling scenarios where indices already exist.
- **Document Management**: Capabilities to create and search documents within indices using regex and case-insensitive queries.
- **Error Handling**: Uses a custom `ApiError` class to manage and throw errors effectively.
- **Data Import**: Functionality to index JSON datasets directly from files.

## Code Highlights

- **Connection Setup**: Establishes a connection to the Elasticsearch server without requiring authentication, configurable via environment variables.
- **Error Handling**: Incorporates a custom `ApiError` to standardize error management across different functions.
- **Data Indexing**: Provides methods to index data from JSON files, manage documents by unique identifiers, and perform searches based on regular expressions.

## Getting Started

To get this project running on your local machine:

1. Clone the repository.
2. Ensure Elasticsearch 7.1.12 is installed and running on your system.
3. Navigate to the project directory and install dependencies:
   ```bash
   npm install
   '''
4. Set up environment variables in a .env file with your Elasticsearch URL.

## Execute the script:

node [filename.js]

## Contributing

Contributions are welcome, especially from those who wish to extend functionality or improve documentation. Please fork this repository, make your changes, and submit a pull request for review.

## License
This project is open-source and available under standard licensing terms.
