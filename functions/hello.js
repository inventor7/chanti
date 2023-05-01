exports.handler = async (event, context) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://chanti-dz-backend.herokuapp.com",
      },
      body: JSON.stringify({ message: "Hello World" })
    };
    return response;
  };