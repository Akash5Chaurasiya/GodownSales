// export const basePath = `https://www.lohawalla.com`;
export const basePath =`https://lohawalla.onrender.com`



export const getAllShelfApiPath =`${basePath}/store/shelf/`;
export const getAllAisleApiPath =`${basePath}/store/aisle/`;

export const scanAisleApiPath = `${basePath}/store/aisle/scanQrCode`;

export const assignAisleApiPath =`${basePath}/store/aisle/assignQrCode`;

export const purchaserSlipApiPath= `${basePath}/purchaser/pages/purchaseBill/`; 

//added 

export const uploadAisleApiPath = `${basePath}/imageService/upload`; // 1st 
export const addImageAisleApiPath = `${basePath}/store/aisle/addImage`;// second 

export const purchaseQrScanApiPath = `${basePath}/purchaser/pages/purchaseBill/scanQr`;
export const purchaseVerificationApiPath = `${basePath}/purchaser/pages/purchaseBill/addImage`;

//SALES

export const SalesSlipApiPath= `${basePath}/sales/salesbill/`;

export const SalesQrScanApiPath= `${basePath}/sales/salesbill/scanQr`;

export const SalesVerificationApiPath= `${basePath}/sales/salesbill/addImage`;

//reconcilint
export const ReconcilitionApiPath = `${basePath}/store/reconciliation`;