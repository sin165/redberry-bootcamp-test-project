const countMatches = (blog, selectedCategories) => {
  let counter = 0
  blog.categories.forEach(cat => {
    if(selectedCategories.includes(cat.id)) {
      counter++
    }
  })
  return counter
}

const filterBlogs = (blogs, selectedCategories) => {
  blogs.forEach(blog => {
    blog.matchingCategories = countMatches(blog, selectedCategories)
  })

  let filtered = blogs
  if(selectedCategories.length > 0) {
    filtered = filtered.filter(blog => blog.matchingCategories > 0)
  }
  filtered = filtered.sort((a,b) => b.timestamp - a.timestamp)
  if(selectedCategories.length > 0) {
    filtered = filtered.sort((a,b) => b.matchingCategories - a.matchingCategories)
  }

  return filtered
}

export default filterBlogs
