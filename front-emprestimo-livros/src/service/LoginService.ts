export default class LoginService {
    static login = async (cpf: string, password: string): Promise<unknown> => {
        try {
            const response = await fetch('https://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cpf, password })
            });

            if (!response.ok) {
                throw new Error('Error login');
            }

            const data = await response.json();
            console.log("data", data)
            return data;
        } catch (error) {
            console.error('Error login:', error);
            throw error;
        }
    };
}
