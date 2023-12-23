const imageFromLocal = () => {
    const name = localStorage.getItem('imageName')
    const base64 = localStorage['image']
    const arr = base64.split(',')
    const fileFormat = arr[0].split(':')[1].split(';')[0]
    const bstr = atob(arr[arr.length -1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while(n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], name, {type: fileFormat})
}

export default imageFromLocal
