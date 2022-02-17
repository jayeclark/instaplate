import { useQuery } from '@apollo/client';

import { GET_RESTAURANT_CATEGORIES } from '../../scripts/queries';
import { parseSRC } from "../../scripts/utilities";
import LeftRightArrows from '../UI/sliderArrows';

function CategorySlider({ handleSetCuisine, cuisine }) {

  const { loading, error, data } = useQuery(GET_RESTAURANT_CATEGORIES);

  if (loading) return <div></div>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <p>Not found</p>;

  const list = data.types

  return (
    <div id="wrapper" className="categories-wrapper">
      <LeftRightArrows numElements={list.length}>
        <div id="scroller" className="categories">
          {list?.map((type, i) => {
            let ref = null;
            return (
              <div key={i} id={`cat${i}`} ref={ref ? ref : null} style={{ margin: "8px", cursor: "pointer" }} onClick={() => handleSetCuisine(type.id)} >
                <div style={{ backgroundColor: cuisine===type.id ? "#dedede" : "#efefef", borderRadius: "40px", overflow: "hidden", height: "80px", minWidth: "80px", textAlign: "right" }}>
                  <img height="100%" src={parseSRC(type)}/>
                  </div>
                <div style={{ textAlign: 'center', marginTop: "8px", fontWeight: "bold", fontSize: "0.8rem" }}>
                  {type.title}
                </div>
              </div>
            )
          })}
          <div style={{minWidth: "34px", minHeight:"100%"}}></div>
        </div>
      </LeftRightArrows>
      <style jsx>{`
        .categories-wrapper {
          width: 100%;
          max-width: 100vw;
          border-bottom: 1px solid #efefef;
          height: 160px;
          min-height: 160px;
          position: relative;
        }
        .categories {
          display: flex;
          justify-content: space-between;
          padding: 16px 0px 8px 12px;
        }
      `}</style>
    </div>

  )
}

export default CategorySlider