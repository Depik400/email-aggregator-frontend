import { makeAutoObservable } from "mobx";
import { useLocation, useNavigate } from "react-router-dom";


export interface IUser {
    email: string,
    name: string,
    password: string,
    accounts: {
        email: string,
    }[]
}

class useAuthorization {
    public user: IUser|null = null;
    public isAuth: boolean = false;
    constructor() {
        makeAutoObservable(this)
    }

    public getUser(): IUser|null {
        return this.user;
    }

    public isLogged(): boolean {
        return !!this.user;
    }

    login(): Promise<boolean> {
        localStorage.setItem('token', '12356');
        this.user = {
            email: '123@ru.ru',
            name: 'DanilovMempes',
            password: '123',
            accounts: [
                {
                    email: 'heller@ru'
                },
                {
                    email: 'heller2@ru'
                }
            ]
        }
        this.isAuth = true;
        return Promise.resolve(true)
    }


    public refresh(): void {
        const token = localStorage.getItem('token');
        if(token) {
            this.user = {
                email: '123@ru.ru',
                name: 'DanilovMempes',
                password: '123',
                accounts: [
                    {
                        email: 'heller@ru'
                    },
                    {
                        email: 'heller2@ru'
                    }
                ]
            }
            this.isAuth = true;
            localStorage.removeItem('token');
        } else {
            localStorage.removeItem('token');
        }
    }
}

export default useAuthorization;