/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        DB_URL: "mongodb+srv://Hazreath:0eMvH00SAZ0Fg2EC@tellr.bmana6r.mongodb.net/TellR",
    },
};
