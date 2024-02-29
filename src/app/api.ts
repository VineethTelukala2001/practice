export const apin = "http://192.168.1.163:8090/"

// export const apin = "http://192.168.1.163:8090/"

// export const apin = "http://localhost:8090/"
// export const apin = "http://122.175.43.71:8090/"
export const endPointsUser = {
     // Endpoints for dashboars
     dashboard:`${apin}counts`,


    // Endpoints for login
    sendotp:`${apin}admin/send-otp`,
    postlogin:`${apin}admin/login`,


    //Endpoints for Admin
    addadmin:`${apin}admin/add`,
    viewadmin:`${apin}admin/all`,
    deleteadmin:`${apin}admin/`,
    updateadmin:`${apin}admin/`,
    editadmin:`${apin}admin/`,

    //Endpoints for Domain
    adddomain:`${apin}api/domain`,
    viewdomain:`${apin}api/domain`,
    updatedomain:`${apin}api/domain/`,
    deletedomain:`${apin}api/domain/`,
    editdomain:`${apin}api/domain/`,
    //Endpoints for hosting
    addhosting:`${apin}api/hosting`,
    viewhosting:`${apin}api/hosting`,
    deletehosting:`${apin}api/hosting/`,
    updatehosting:`${apin}api/hosting/`,
    edithosting:`${apin}api/hosting/`,

    //Endpoints for hostdomain map
    addhostdomainmap:`${apin}hostdomainmap/add`,
    viewhostdomainmap:`${apin}hostdomainmap/all`,
    updatehostdomainmap:`${apin}hostdomainmap/`,
    deletehostdomainmap:`${apin}hostdomainmap/`,
    edithostdomainmap:`${apin}hostdomainmap/`,
    getalldomains:`${apin}get/alldomains`,
    getallhosting:`${apin}get/allhosting`,
    getallproviders:`${apin}get/allproviders`,

    //Endpoints for it returns registration
    additreturns:`${apin}api/itreturns`,
    viewitreturns:`${apin}api/itreturns`,
    deleteitreturns:`${apin}api/itreturns/`,
    updateitreturns:`${apin}api/itreturns/`,
    edititreturns:`${apin}api/itreturns/`,

     //Endpoints for Email
     addemail:`${apin}api/email`,
     viewemail:`${apin}api/email`,
     deleteemail:`${apin}api/email/`,
     updateemail:`${apin}api/email/`,
     editemail:`${apin}api/email/`,   

     //Endpoints for Passwords Expiry List
     viewpasswords:`${apin}api/passwords/all`,

    
}