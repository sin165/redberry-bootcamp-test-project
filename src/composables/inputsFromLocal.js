const inputsFromLocal = (image, title, description, author, publish_date, categories, email) => {
  if(localStorage.getItem('image')) {
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
    image.value = new File([u8arr], name, {type: fileFormat})
  }

  title.value = localStorage.getItem('title') ?? ''
  description.value = localStorage.getItem('description') ?? ''
  author.value = localStorage.getItem('author') ?? ''
  publish_date.value = localStorage.getItem('publish_date') ?? null
  categories.value = localStorage.getItem('categories') ? localStorage.getItem('categories').split(',').map(x => +x) : []
  email.value = localStorage.getItem('email') ?? ''
}

export default inputsFromLocal
