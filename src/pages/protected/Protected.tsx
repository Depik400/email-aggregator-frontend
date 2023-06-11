import { ReactElement, useContext, useEffect} from "react";
import {Context} from "../../index";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

interface IProtected {
}

function Protected({children}: {children: ReactElement}) {

    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useContext(Context);
    useEffect(() => {
        if(!auth.isAuth)
            navigate('/login' + `?returnTo=${decodeURI(location.pathname + location.search)}`);
       }, [auth.isAuth]);
        
       return children
}

export default observer(Protected);