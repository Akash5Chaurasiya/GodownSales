import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export default class AxiosFactory {
    static createInstance<T = any>(config?: CreateAxiosDefaults<T>): AxiosInstance {
        console.log(config);
        // const basePath = "https://hrms-backend-04fw.onrender.com/";
        // const basePath="https://chawlacomponents.com/"
        // const basePath = "https://www.lohawalla.com/";
        const basePath ="https://lohawalla.onrender.com"
        // const basePath="http://fe80::1100:6a39:7022:4793%17:5050/"
        const _config: CreateAxiosDefaults<any> = {
            ...config,
            baseURL: basePath + (config?.baseURL || "")
        };
        return axios.create(_config);
    }
}

