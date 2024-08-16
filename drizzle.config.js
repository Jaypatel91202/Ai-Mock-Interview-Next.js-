/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:vVu5XS4OqeKz@ep-super-star-a5py7qkz.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };