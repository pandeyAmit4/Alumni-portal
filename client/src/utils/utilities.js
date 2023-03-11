import { storage } from "./firebase";

export const lottieOptions = (animation, loop = true) => ({
    loop,
    autoplay: true,
    animationData: animation,
});

export const storeFile = async (folderNname, fileName, file) => {
    console.log("file");
    console.log(file);
    const storageRef = storage.ref();
    const folderRef = storageRef.child(folderNname);
    const fileRef = folderRef.child(fileName);
    let url = "";
    if (file) {
        await fileRef.put(file);
        url = await fileRef.getDownloadURL();
    }
    return url;
};

export const minsAgo = (date) => {
    var diff = parseInt((Date.now() - date) / (1000 * 60));
    console.log("date.now", Date.now());
    console.log("date", date);
    console.log("subtract:", Date.now() - date);
    var text = " m ago";
    if (diff >= 120) {
        diff = 120;
        text = "+ m ago";
    }
    return `${diff}${text}`;
};
