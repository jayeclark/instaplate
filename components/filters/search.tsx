export default function Search({ global, handleSetQuery }) {

  return (
    <>
    <div className="search-container">
      <input 
        style={{zIndex: "999"}}
        placeholder={global ? "Search restaurants and dishes..." : "Search restaurant dishes..."}
        type="text" 
        defaultValue={''} onChange={(e) => handleSetQuery(e.target.value) }></input>
    </div>
    <style jsx>
    {`
      .search-container {
        position: fixed;
        top: 0px;
        background-color: #fff;
        left: 0px;
        width: calc(100vw - 540px);
        height: fit-content;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 270px;
        margin-left: 270px;
        z-index: 99;
      }

      input {
        padding: 15px 20px;
        background-color: #efefef;
        border-radius: 10px;
        border: none;
        outline: none;
        width: 100%;
      }

      @media only screen and (max-width: 796px) {
        .search-container {
          position: fixed;
          top: unset;
          bottom: 0px;
          left: 0px;
          width: 100%;
          padding: 10px 30px;
          margin: 0px;
          background-color: white;
          box-shadow: 0px -3px 4px rgb(0,0,0,0.15);
        }
      }
    `}
    </style>
    </>
  )
}