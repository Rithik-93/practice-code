// import {
//     S3Client,
//     PutObjectCommand,
// } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import express from "express";

// const app = express();
// const PORT = 3000;

// const S3 = new S3Client({
//     region: "auto",
//     endpoint: `https://6ce6665a6726e7cb6f063a6803bb823f.r2.cloudflarestorage.com`,
//     credentials: {
//         accessKeyId: "2d4c41f9eac84a599025f4604deadc0a",
//         secretAccessKey: "e7faf9e4ff3242d6b099cfbc3aa8194e0911946b0ec6748f50b0413f1f127a54",
//     },
// });


// const generatePresignedUrl = async (bucketName, objectKey) => {
//     const command = new PutObjectCommand({
//         Bucket: bucketName,
//         Key: objectKey,
//         ContentType: "video/webm",
//     });
    

//     const expiresIn = 3600;

//     try {
//         const url = await getSignedUrl(S3, command, { expiresIn });
//         return { url };
//     } catch (err) {
//         console.error("Error generating pre-signed URL:", err);
//         throw new Error("Failed to generate pre-signed URL");
//     }
// };

// // Define a GET route to return a pre-signed URL
// app.get("/", async (req, res) => {
//     const bucketName = "fathomvideo"; // Replace with your bucket name
//     const objectKey = `uploads/${Date.now()}.webm`; // Example unique file key

//     try {
//         const { url } = await generatePresignedUrl(bucketName, objectKey);
//         res.status(200).json({ url });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Failed to generate pre-signed URL" });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
