function sortPaths(array, condition){ 
    var sorted = array

    if(condition === "cost"){
        sorted = sortByCost(array)
    }
    
    return sorted
}

function sortByCost(item){

    item.sort(function(a,b){
        if(a.paths[0].totalCost > b.paths[0].totalCost)
            return 1
        if(a.paths[0].totalCost < b.paths[0].totalCost)
            return -1
        return 0
    })

    return item
}

module.exports = { sortPaths }