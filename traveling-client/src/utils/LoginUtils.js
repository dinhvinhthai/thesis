import { useNavigate } from "react-router-dom";
import * as SystemConst from "../constant/SystemConst"

export function useCheckLogin ()
{
    let token = localStorage.getItem( "token" );
    let status = localStorage.getItem( "status" );
    let navigate = useNavigate();
    if ( !token )
    {
        navigate( "/login" );
    } else
    {
        if ( status )
        {
            switch ( status )
            {
                case SystemConst.USER_STATUS_NON_VERIFY:
                    navigate( "/verify" );
                    break;
                case SystemConst.USER_STATUS_NON_SETUP:
                    navigate( "/information" );
                    break;
                case SystemConst.USER_STATUS_LOCKED:
                    navigate( "/locked" );
                    break;
                default:
                    navigate( "/" );
            }
        }
    }
}
