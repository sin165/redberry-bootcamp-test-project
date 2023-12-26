const watchers = errors => {

    const watchTitle = title => {
        localStorage.setItem('title', title)
        errors.value.title = title.trim().length < 2 ? 'მინიმუმ 2 სიმბოლო' : null
    }

    const watchDescription = description => {
        localStorage.setItem('description', description)
        errors.value.description = description.trim().length < 2 ? 'მინიმუმ 2 სიმბოლო' : null
    }

    const watchAuthor = author => {
        localStorage.setItem('author', author)
        errors.value.author = {
            symbols: author.trim().length < 4 ? 'მინიმუმ 4 სიმბოლო' : null,
            words: author.trim().split(' ').length < 2 ? 'მინიმუმ 2 სიტყვა' : null,
            language: !/^[ა-ჰ\s]+$/.test(author) ? 'მხოლოდ ქართული სიმბოლოები' : null,
        }
    }

    const watchPublishDate = publish_date => {
        localStorage.setItem('publish_date', publish_date)
        errors.value.publish_date = isNaN(new Date(publish_date)) ? 'არასწორი თარიღის ფორმატი' : null
    }

    const watchCategories = categories => {
        localStorage.setItem('categories', categories)
    }

    const watchEmail = email => {
        localStorage.setItem('email', email)
        errors.value.email = email && !email.endsWith('@redberry.ge') ? 'მეილი უნდა მთავრდებოდეს @redberry.ge-ით' : null
    }

    return { watchTitle, watchDescription, watchAuthor, watchPublishDate, watchCategories, watchEmail }
}

export default watchers
