console.log(process.env);
export const getAPIUrl = () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
