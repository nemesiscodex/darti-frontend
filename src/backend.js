import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const backend = publicRuntimeConfig.BACKEND_URL;

export default backend;