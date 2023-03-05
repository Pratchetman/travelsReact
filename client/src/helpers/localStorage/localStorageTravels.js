export const saveLocalStorageTravel = (item) =>{
    localStorage.setItem("token", item);
    return true;
}

export const getLocalStorageTravel = () =>{
    const token = localStorage.getItem("token");
    return token;
}