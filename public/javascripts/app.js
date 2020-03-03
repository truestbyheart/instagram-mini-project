function saveImage(currentId) {
    let img_link;
    currentId === undefined ?
        img_link = $("#single").attr("href") :
        img_link = $("#"+currentId).attr("href");
    const filename = img_link.match(/(?=\/)+.([0-9]+.+jpg)/g)[0].split("/")[1];
    $.ajax(img_link, {
            method: "GET",
            cache: false,
            xhr: function () {
                let xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                return xhr;
            },
            success: function (data, status, xhr) {
              download(data, filename, {type: "image/jpeg"});
            },
            error: function (qXhr, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        }
    );
}

function download(data, filename, type) {
    const file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob){ // IE10+
        return window.navigator.msSaveOrOpenBlob(file, filename);
    }
    else { // Others
       let a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
