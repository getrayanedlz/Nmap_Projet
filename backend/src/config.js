import "dotenv/config"

const config = {
  port: process.env.PORT,
  db: {
    uri: process.env.DB_URI,
  },
  security: {
    session: {
      tokenLength: 128,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: "3 days",
    },
  },
}

export default config
