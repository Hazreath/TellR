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
        REACT_APP_API_TOKEN: "b3nJ1+*+L3S4n2$$L4V31n€€€",
        REACT_APP_AES_PASSPHRASE: "benji"
    },
};
