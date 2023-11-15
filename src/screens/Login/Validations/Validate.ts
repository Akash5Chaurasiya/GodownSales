export const isValidateEmail=(email:string):boolean=>{
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

export const isPhoneNumber = (email: string): boolean =>{
    return /^\+\d+$/.test(email);
}