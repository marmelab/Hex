import AsyncStorage from '@react-native-async-storage/async-storage';

const JWT_STORAGE_KEY = 'jwt_token';

export async function saveJwt(jwt: string) {
    try {
        await AsyncStorage.setItem(JWT_STORAGE_KEY, jwt);
    } catch (error) {
        console.error(`AsyncStorage Error: ${error}`);
    }
}

export async function getJwt(): Promise<string> {
    return await AsyncStorage.getItem(JWT_STORAGE_KEY);
}

export async function deleteJwt() {
    try {
        await AsyncStorage.removeItem(JWT_STORAGE_KEY);
    } catch (error) {
        console.error(`AsyncStorage Error: ${error}`);
    }
}
