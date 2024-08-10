import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE"],
  origin: "https://algorithmic-contest-platform.darshanwebdev.com",
  credentials: true,
});

// Helper method to wait for middleware to execute before continuing
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of the API logic here
}
