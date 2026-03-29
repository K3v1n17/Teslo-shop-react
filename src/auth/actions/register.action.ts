import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response";



export  const registerAction = async (name: string, email: string, password: string):Promise<AuthResponse> => 
    {
       try {
          const {data} = await tesloApi.post<AuthResponse>('/auth/register',
            {
                fullName: name,
                email,
                password
            }
          )
          return data;
        }
        catch (error) {
          throw error
       }    
    }
