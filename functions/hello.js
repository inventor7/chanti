
// This is the function that will be executed when the endpoint is called
exports.handler = async (event, context) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ message: "Hello World" }),
    };
    return response;
  };
  