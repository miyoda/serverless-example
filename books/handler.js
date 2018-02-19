'use strict';

const uuid = require('uuid');
const dynamodb = require('./dynamodb');

module.exports.createBook = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.title !== 'string') {
    callbackError(400, 'Validation error', callback);
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      title: data.title,
      author: data.author,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  dynamodb.put(params, (error) => {
    // handle potential errors
    if (error) {
      callbackError(error.statusCode || 501, error, callback);
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};


module.exports.updateBook = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.title !== 'string') {
    callbackError(400, 'Validation error', callback);
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':title': data.title,
      ':author': data.author,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET title = :title, author = :author, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // write the todo to the database
  dynamodb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      callbackError(error.statusCode || 501, error, callback);
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};

module.exports.getBooks = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  // fetch all todos from the database
  dynamodb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      callbackError(error.statusCode || 501, error, callback);
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};

module.exports.getBook = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    }
  };

  // fetch all todos from the database
  dynamodb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      callbackError(error.statusCode || 501, error, callback);
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};

module.exports.deleteBook = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    }
  };

  // fetch all todos from the database
  dynamodb.delete(params, (error, result) => {
    // handle potential errors
    if (error) {
      callbackError(error.statusCode || 501, error, callback);
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify({}),
    };
    callback(null, response);
  });
};

function callbackError(errorCode, errorMessage, callback) {
  console.error(errorMessage);
  callback(null, {
    statusCode: errorCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"error": errorMessage}),
  });
}