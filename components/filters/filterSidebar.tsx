export default function FilterSidebar({filters, handleAddQuery, handleRemoveQuery, handleSetSort}) {


  const toggleDietary = (i) => {
    if (filters.dietary.includes(i)) {
      handleRemoveQuery('dietary', i);
    } else {
      handleAddQuery('dietary', i );
    }
  }

  const togglePrice = (i) => {
    if (filters.price.includes(i)) {
      handleRemoveQuery('price', i);
    } else {
      handleAddQuery('price', i);
    }
  }

  const vegetarian = (<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="cq ec ca cb"><path d="M14.083 2.833c-4.333 0-7.916 3.583-7.916 7.917v5.333L2.75 19.5l1.75 1.75 3.417-3.417h4.5a8.749 8.749 0 008.75-8.75v-6.25h-7.084zm0 2.5h3.75L8.667 14.5v-3.75c0-3 2.416-5.417 5.416-5.417z"></path></svg>);
  const vegan = (<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="cq ec ca cb"><path fillRule="evenodd" clipRule="evenodd" d="M12 5.182C13.09 4 14.546 2.909 16.546 2.909 19.727 2.91 22 5.546 22 8.82c0 1.636-.727 3-1.818 4.09L12 20.637l-8.182-7.728C2.636 11.91 2 10.455 2 8.82c0-3.273 2.273-5.91 5.455-5.91 2 0 3.454 1.182 4.545 2.273zm0 6.09l3.364-3.182 1.818 1.818-5.182 5-5.182-5L8.636 8.09 12 11.272z"></path></svg>);
  const gluten = (<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="cq ec ca cb"><path fillRule="evenodd" clipRule="evenodd" d="M12 5.182C13.09 4 14.546 2.909 16.546 2.909 19.727 2.91 22 5.546 22 8.82c0 1.636-.727 3-1.818 4.09L12 20.637l-8.182-7.728C2.636 11.91 2 10.455 2 8.82c0-3.273 2.273-5.91 5.455-5.91 2 0 3.454 1.182 4.545 2.273zm0 6.09l3.364-3.182 1.818 1.818-5.182 5-5.182-5L8.636 8.09 12 11.272z"></path></svg>);

  return (
    <div className="side-bar" style={{ width: "390px", height: "100%", marginLeft:"30px" }}>
      <h3 style={{fontWeight: "600"}}>All Restaurants</h3><br></br>
      <h5>Sort</h5>
      <div style={{ padding: "5px 0px"}}>
        <input type="radio" name="sort" value="relevance" onChange={(e) => e.target.checked ? handleSetSort(e.target.value) : null } /><label>&nbsp;&nbsp;Picked for you (default)</label><br />
        </div>
      <div style={{ padding: "5px 0px"}}>
        <input type="radio" name="sort" value="popularity" onChange={(e) => e.target.checked ? handleSetSort(e.target.value) : null }  /><label>&nbsp;&nbsp;Most popular</label><br />
        </div>
      <div style={{ padding: "5px 0px"}}>
        <input type="radio" name="sort" value="rating" onChange={(e) => e.target.checked ? handleSetSort(e.target.value) : null } /><label>&nbsp;&nbsp;Rating</label><br />
        </div>
      <div style={{ padding: "5px 0px"}}>
        <input type="radio" name="sort" value="delivery" onChange={(e) => e.target.checked ? handleSetSort(e.target.value) : null } /><label>&nbsp;&nbsp;Delivery time</label><br />
      </div><br></br>
      <h5>Price Range</h5>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <div className={filters.price.includes(1) ? "filter-option active" : "filter-option"} onClick={() => togglePrice(1)} >$</div>
        <div className={filters.price.includes(2) ? "filter-option active" : "filter-option"} onClick={() => togglePrice(2)} >$$</div>
        <div className={filters.price.includes(3) ? "filter-option active" : "filter-option"} onClick={() => togglePrice(3)} >$$$</div>
        <div className={filters.price.includes(4) ? "filter-option active" : "filter-option"} onClick={() => togglePrice(4)} >$$$$</div>
      </div><br></br>
      <h5>Dietary</h5>
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "390px" }}>
        <div className={filters.dietary.includes(1) ? "filter-option active" : "filter-option"} onClick={() => toggleDietary(1)} ><span style={{display: "inline-block", width:"18px"}}>{vegetarian}</span>&nbsp;Vegetarian</div>
        <div className={filters.dietary.includes(2) ? "filter-option active" : "filter-option"} onClick={() => toggleDietary(2)} ><span style={{display: "inline-block", width:"18px"}}>{vegan}</span>&nbsp;Vegan</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "390px" }}>  
        <div className={filters.dietary.includes(3) ? "filter-option active" : "filter-option"} onClick={() => toggleDietary(3)} ><span style={{display: "inline-block", width:"18px"}}>{gluten}</span>&nbsp;Gluten-free</div>
      </div><br></br>
      <style jsx>{`
        .side-bar {
          width: 390px;
          max-width: 390px;
          overflowX: hidden;
          height: 100%;
          marginLeft: 30px;
          min-height: calc(100vh - 80px);
        }

        .filter-option {
          margin-right: 10px;
          margin-bottom: 10px;
          font-weight: 500; 
          font-size: 0.9rem;
          padding: 6px 12px; 
          background-color: #efefef;
          border-radius: 20px;
          cursor: pointer;
        }

        .active {
          background-color: #cfcfcf;
        }
      `}</style>
    </div>
  )
}