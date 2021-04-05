import _ from 'lodash';

export function paginate (items,pageNumber ,pageSize){
    const startIndex = (pageNumber-1) *pageSize;
    //_.slice(items,startIndex)
    //_.take()
    //-(items) return lodash object so we can chain methodes like follow code
    //.value: to convert lodash obj to a regular array
    return _(items).slice(startIndex).take(pageSize).value();
}