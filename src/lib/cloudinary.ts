import { cloudinary, configureCloudinary } from "@/config/cloudinary";
import { CLOUDINARY_FOLDER } from "@/config/secrets";


export const uploadImageOnCloudinary = (file: any): Promise<{ url: string, public_id: string }> => {
    configureCloudinary();
    return new Promise(async (resolved, rejected) => {
        try {
            cloudinary.uploader
                .upload_stream({ folder: CLOUDINARY_FOLDER!, resource_type: "image" }, (error, result) => {
                    if (result) {
                        resolved(result);
                    } else {
                        console.error(error);
                        rejected(error?.message);
                    }
                }
                )
                .end(file);
        } catch (err: any) {
            console.log(err.message);
        }
    });
};