interface IVideo {
    is_video: boolean;
    display_url: string;
    video_url: string;
}

export function filterIgData(mediaObject: any) {
    const {node: {text: postText}} = mediaObject.edge_media_to_caption.edges[0];
    const {is_verified, profile_pic_url, username, is_private, full_name} = mediaObject.owner;
    /**
     * @description check if the instagram post is a list of image posts or a single post.
     */
    if (mediaObject.edge_sidecar_to_children !== undefined) {
        let listOfImages: any = [];
        const objectSet = mediaObject.edge_sidecar_to_children.edges;

        // Get the list of post of images
        objectSet.forEach((element: any) => {
            listOfImages = [...listOfImages, checkIfVideo(element.node)]
        });

        return {
            post_text: postText,
            post_data: listOfImages,
            owner: {is_verified, profile_pic_url, username, is_private, full_name}
        }
    } else {
        // Check if the single post is a image or video
        if (mediaObject.is_video) {
            const videoUrl = mediaObject.video_url;
            return {
                post_text: postText,
                video_url: videoUrl,
                owner: {is_verified, profile_pic_url, username, is_private, full_name}
            };
        } else {
            const imgUrl = mediaObject.display_url;
            return {
                post_text: postText,
                img_url: imgUrl,
                owner: {is_verified, profile_pic_url, username, is_private, full_name}
            }
        }
    }
}

function checkIfVideo(mediaObject: IVideo) {
    return mediaObject.is_video ?
        {video_url: mediaObject.video_url} :
        {img_url: mediaObject.display_url};
}


