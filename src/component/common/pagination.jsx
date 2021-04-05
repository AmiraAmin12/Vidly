import _ from 'lodash';
import React from 'react'
import PropTypes from 'prop-types';
const Pignation = (props) => {
    const {itemCount ,pageSize, currentPage,onPageChange} =props;
    const pagesCount =Math.ceil( itemCount/pageSize)
    if (pagesCount===1) return null;
    const pages = _.range(1,pagesCount+1)
    return <nav>
        <ul className="pagination">
            {pages.map(page => 
            <li key={page}
             className={page===currentPage ?'page-item active': 'page-item'}>
                <a className="page-link" onClick={()=>onPageChange(page)}>{page}</a>
            </li>)}

        </ul>
    </nav>;
}
Pignation.propTypes ={
    itemCount:PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired,
    currentPage :PropTypes.number.isRequired,
    onPageChange:PropTypes.func.isRequired
}
export default Pignation;
