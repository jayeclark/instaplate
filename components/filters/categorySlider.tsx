import { useQuery } from '@apollo/client';
import { useRef } from "react";
import { GET_RESTAURANT_CATEGORIES } from '../../scripts/queries';
import { API_URL } from '../../scripts/urls';

function CategorySlider({ handleSetCuisine }) {

  const firstCat = useRef();
  const lastCat = useRef();
  const leftArrow = useRef();
  const rightArrow = useRef();
  const wrapper = useRef();

  const { loading, error, data } = useQuery(GET_RESTAURANT_CATEGORIES);

  if (loading) return <div></div>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  const list = data.types

  const handleScroll = () => {
    const wrapperElement: HTMLElement = wrapper.current;
    const leftArrowElement: HTMLElement = leftArrow.current;
    const rightArrowElement: HTMLElement = rightArrow.current;
    const offset = wrapperElement.scrollLeft;
    const width = wrapperElement.scrollWidth;
    const parentWidth = wrapperElement.parentElement.getBoundingClientRect().width;
    if (offset >= width / list.length && leftArrowElement.style.display !== "block") {
      leftArrowElement.style.display = "block"
    } else if (offset < width / list.length && leftArrowElement.style.display !== "none"){
      leftArrowElement.style.display = "none";
    }
    if (offset < width - parentWidth - 10 && rightArrowElement.style.display !== "block") {
      rightArrowElement.style.display = "block";
    } else if (offset >= width - parentWidth - 10 && rightArrowElement.style.display !== "none") {
      rightArrowElement.style.display = "none";
    }
  };

  return (
    <div id="wrapper" className="categories-wrapper">
      <div id="scroll" ref={wrapper} className="categories-scroll" onScroll={()=>handleScroll()}>
        <div id="scroller" className="categories">
          {list?.map((type, i) => {
            let ref = null;
            if (i === 0 ) { ref = firstCat; }
            if (i === list.length - 1) { ref = lastCat; }
            return (
              <div key={i} id={`cat${i}`} ref={ref ? ref : null} style={{ margin: "8px", cursor: "pointer" }} onClick={() => handleSetCuisine(type.id)} >
                <div style={{ backgroundColor: "#efefef", borderRadius: "40px", overflow: "hidden", height: "80px", minWidth: "80px", textAlign: "right" }}>
                  <img height="100%" src={API_URL + type.image.url}/>
                  </div>
                <div style={{ textAlign: 'center', marginTop: "8px", fontWeight: "bold", fontSize: "0.8rem" }}>
                  {type.title}
                </div>
              </div>
            )
          })}
          <div style={{minWidth: "34px", minHeight:"100%"}}></div>
        </div>
      </div>
      <div className="left-arrow" ref={leftArrow} onClick={()=> {
        const wrapperElement: HTMLElement = wrapper.current;
        wrapperElement.scrollLeft -= wrapperElement.scrollWidth * 3 / list.length
        }}
      >
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="#343538" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.121 12l5.94-5.94a1.5 1.5 0 00-2.122-2.12l-7 7a1.5 1.5 0 000 2.12l7 7a1.5 1.5 0 002.122-2.12L7.12 12z"></path></svg>
      </div>
      <div className="right-arrow" ref={rightArrow} onClick={()=> {
        const wrapperElement: HTMLElement = wrapper.current;
        wrapperElement.scrollLeft += wrapperElement.scrollWidth * 3 / list.length
        }}
      >
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="#343538" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16.879 12l-5.94-5.94a1.5 1.5 0 012.122-2.12l7 7a1.5 1.5 0 010 2.12l-7 7a1.5 1.5 0 01-2.122-2.12L16.88 12z"></path></svg>
      </div>
      <style jsx>{`
        .categories-wrapper {
          width: 100%;
          max-width: 100vw;
          border-bottom: 1px solid #efefef;
          height: 160px;
          min-height: 160px;
          position: relative;
        }
        .categories-scroll {
          overflow-x: scroll;
          height: 100%;
          position: relative;
          scroll-behavior: smooth;
        }
        .categories {
          display: flex;
          justify-content: left;
          padding: 16px 34px 8px 34px;
        }
        .left-arrow, .right-arrow {
          position: absolute;
          height: 40px;
          width: 40px;
          text-align: center;
          padding: 6px 0px;
          background-color: white;
          box-shadow: 0px 0px 10px rgba(0,0,0,0.15);
          top: 65px;
          border-radius: 20px;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .left-arrow {
          left: 5px;
        }
        .right-arrow {
          right: 5px;
        }
      `}</style>
    </div>

  )
}

export default CategorySlider