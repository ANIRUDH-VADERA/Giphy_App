const Paginate = (props) => {
    
    const pageNumber = []

    for (let i = 1 ; i<= Math.ceil(props.totalItems/props.itemPerPage);i++)
    {
        pageNumber.push(i);
    }

    console.log(pageNumber);

    return ( 
        <nav>
            <ul className="pagination pagination-sm justify-content-end border-0">
                {pageNumber.map((item)=>{
                    
                    var  classes = "page-item ";
                    if(item === props.currentPage)
                    {   
                        classes += "active"
                    }

                  return(
                      <li key={item} className={classes}>
                          <a onClick = {(event)=>{
                            event.preventDefault();
                            props.pageSelected(item);
                          }} href="ds" className="page-link">{item}</a>
                      </li>
                  )  
                })}     
            </ul>
        </nav>
     );
}
 
export default Paginate;