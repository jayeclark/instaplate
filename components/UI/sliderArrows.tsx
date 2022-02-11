import { useRef } from "react";

export default function LeftRightArrows({ numElements, children }) {

  const leftArrow = useRef();
  const rightArrow = useRef();
  const wrapper = useRef();

  const handleScroll = () => {
    const wrapperElement: HTMLElement = wrapper.current;
    const leftArrowElement: HTMLElement = leftArrow.current;
    const rightArrowElement: HTMLElement = rightArrow.current;
    const offset = wrapperElement.scrollLeft;
    const width = wrapperElement.scrollWidth;
    const parentWidth = wrapperElement.parentElement.getBoundingClientRect().width;
    if (offset >= width / numElements && leftArrowElement.style.display !== "block") {
      leftArrowElement.style.display = "block"
    } else if (offset < width / numElements && leftArrowElement.style.display !== "none"){
      leftArrowElement.style.display = "none";
    }
    if (offset < width - parentWidth - 10 && rightArrowElement.style.display !== "block") {
      rightArrowElement.style.display = "block";
    } else if (offset >= width - parentWidth - 10 && rightArrowElement.style.display !== "none") {
      rightArrowElement.style.display = "none";
    }
  };

  return (
    <div style={{position: "relative", width: "100%"}}>
      <div id="scroll" ref={wrapper} className="items-scroll" onScroll={()=>handleScroll()}>
        {children}
      </div>
      <div className="left-arrow" style={{display: "none"}} ref={leftArrow} onClick={()=> {
        const wrapperElement: HTMLElement = wrapper.current;
        wrapperElement.scrollLeft -= wrapperElement.scrollWidth * 3 / numElements
        }}
      >
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="#343538" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.121 12l5.94-5.94a1.5 1.5 0 00-2.122-2.12l-7 7a1.5 1.5 0 000 2.12l7 7a1.5 1.5 0 002.122-2.12L7.12 12z"></path></svg>
      </div>
      <div className="right-arrow" ref={rightArrow} onClick={()=> {
        const wrapperElement: HTMLElement = wrapper.current;
        wrapperElement.scrollLeft += wrapperElement.scrollWidth * 3 / numElements
        }}
      >
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="#343538" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16.879 12l-5.94-5.94a1.5 1.5 0 012.122-2.12l7 7a1.5 1.5 0 010 2.12l-7 7a1.5 1.5 0 01-2.122-2.12L16.88 12z"></path></svg>
      </div>
      <style jsx>{`
        .items-scroll {
          overflow-x: scroll;
          height: 100%;
          position: relative;
          scroll-behavior: smooth;
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