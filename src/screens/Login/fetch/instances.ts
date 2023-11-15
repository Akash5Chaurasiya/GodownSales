import AxiosFactory from "../../../auth/axios/AxiosFactory";

const BaseInstance=AxiosFactory.createInstance();
console.log(BaseInstance);
export default BaseInstance;