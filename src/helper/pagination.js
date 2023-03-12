const paginationData = (limit,pageNumber) => {  
    pageNumber = parseInt(pageNumber) || 1
    limit = parseInt(limit) || 10
    const offset = (pageNumber - 1) * limit
    return {offset, limit}
}

module.exports = {paginationData};