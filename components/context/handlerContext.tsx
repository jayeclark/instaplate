import React from "react";

// set backup default for isAuthenticated if none is provided in Provider
const HandlerContext = React.createContext(
    {   dispatchCart: (actionObject: any) => {},
        getCart: () => {}
    });

export default HandlerContext;