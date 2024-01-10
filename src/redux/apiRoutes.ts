export const basePath = `https://www.lohawalla.com`;
// export const basePath =`https://lohawalla.onrender.com`

//aisle shelf

export const getAllShelfApiPath =`${basePath}/store/shelf/`;
export const getAllAisleApiPath =`${basePath}/store/aisle/`;

export const scanAisleApiPath = `${basePath}/store/aisle/scanQrCode`;

export const assignAisleApiPath =`${basePath}/store/aisle/assignQrCode`;



//added 

export const uploadAisleApiPath = `${basePath}/imageService/upload`; // 1st 
export const addImageAisleApiPath = `${basePath}/store/aisle/addImage`;// second 

//purchase

export const purchaserSlipApiPath= `${basePath}/purchaser/pages/purchaseBill/`; 
export const purchaseQrScanApiPath = `${basePath}/purchaser/pages/purchaseBill/scanQr`;
export const purchaseVerificationApiPath = `${basePath}/purchaser/pages/purchaseBill/addItem`;
export const purchaseAddImageApiPath = `${basePath}/purchaser/pages/purchaseBill/addImage`;


//SALES

export const SalesSlipApiPath= `${basePath}/sales/salesbill/`;
export const SalesQrScanApiPath= `${basePath}/sales/salesbill/scanQr`;
export const SalesVerificationApiPath= `${basePath}/sales/salesbill/addImage`;//verifaication 
export const SalesRemoveItemApiPath =`${basePath}/sales/salesbill/removeItem` //added 


//revome/id -> aisle 
//reconcilint
export const ReconcilitionApiPath = `${basePath}/store/reconciliation`;
export const   reconUploadApiPath  =`${basePath}/store/reconciliation`;

//transfer


export const transferApiPath = `${basePath}/store/transfer`;
export const transferQrScanApiPath = `${basePath}/store/transfer/scanQr`;
export const sourceTransferVerificationaApi = `${basePath}/store/transfer/removeItem`;



export const sourceTransferaddImageApi = `${basePath}/store/transfer/addSourceImage`;
export const destTransferVerificationaApi = `${basePath}/store/transfer/addItem`;//dest   



export const destTransferaddImageApi = `${basePath}/store/transfer/addDestinationImage`;//dest add imge 

