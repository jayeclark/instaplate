import navStyles from "../styles/Navigation.module.css";

export default function Unauthorized({type}) {

  if (!type) {type = "signIn";}

  const handleOpenSignIn = () => {
    const element = document.getElementById("loginScreen");
    const background = document.getElementById("modalBackground");
    background.style.display = "block";
    setTimeout(() => {background.style.opacity = "1"}, 20);
    setTimeout(() => {element.classList.add(navStyles.showLoginDrawerContainer)},20);
  }

  return (
    <div className="row" style={{padding: "15%"}}>
      <div className="col-lg-10 col-offset-1">
        <p>Oops, looks like you've reached an area you don't have access to!</p>
        {type === "signIn" && (<p>Please <a style={{cursor: "pointer"}} onClick={handleOpenSignIn} >sign in</a> here in order to continue.</p>)}
        {type !== "signIn" && (<p>Please navigate to a different area of the site that matches your user permissions.</p>)}
        
      </div>
    </div>
  )
}