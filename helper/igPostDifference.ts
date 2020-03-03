export function filterIgData(mediaObject: any) {
    const {node: {text: postText}} = mediaObject.edge_media_to_caption.edges[0];
    /**
     * @description check if the instagram post is a list of image posts or a single post.
     */
    if (mediaObject.edge_sidecar_to_children !== undefined) {
        let listOfImages: any = [];
        const objectSet = mediaObject.edge_sidecar_to_children.edges;

        // Get the list of post of images
        objectSet.forEach((element: any) => {
            listOfImages = [...listOfImages, element.node.display_url]
        });

        return {post_text: postText, img_urls: listOfImages}
    } else {
        // Check if the single post is a image or video
        if (mediaObject.is_video === true) {
            const videoUrl = mediaObject.video_url;
            return {post_text: postText, video_url: videoUrl};
        } else {
            const imgUrl = mediaObject.display_url;
            return {post_text: postText,img_url:imgUrl}
        }
    }
}



