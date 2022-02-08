const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
"HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
"MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NJ", "NH", 
"NM", "NY", "ND", "NC", "OK", "OH", "OR", "PA", "RI", "SD", 
"SC", "TN", "TX", "UT", "VA", "VT", "WA", "WV", "WI", "WY"];

export const address = {  message: "Please enter a valid street address.", 
                          validation: (value) => value.length > 5 };

export const address2 = { message: "", 
                          validation: () => true};

export const city = {     message: "Please enter a valid city.", 
                          validation: (value) => value.length > 3 };

export const state = {    message: "Please enter a valid state!", 
                          validation: (value) => states.includes(value.toUpperCase()) };

export const zip = {      message: "Invalid zip code!", 
                          validation: (value) => value.length === 5 };