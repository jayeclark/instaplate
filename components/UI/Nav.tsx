export default function Nav(props) {

    return (
      <>
        <style jsx>
          {`
            .navbar {
              position: fixed;
              top: 0px;
              left: 0px;
              display: flex;
              justify-content: space-between;
              flex-wrap: nowrap;
              background-color: white;
              border-bottom: 1px solid #eee;
              width: 100%;
              padding: 16px 18px;
              margin: 0px;
              z-index: 99;
              overflow: hidden;
            }

            .navbar > ul {
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: nowrap;
              margin: 0px;
              padding: 0px;
              list-type: none;
              width: calc(100vw - 32px);
            }
          `}
        </style>
        <div className="navbar"><ul>{props.children}</ul></div>
      </>
      
    )
}