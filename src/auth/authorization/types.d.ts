namespace Auth {
    interface LoginData {
        name?: string;
        loginData: {
            success: boolean;
            userId: string;
            role: RoleIndex;
            name: string;
            email: string;
            phoneNumber: string;
        }
    }
}