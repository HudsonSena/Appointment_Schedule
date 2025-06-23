import { InputForm } from "../formLogin/page";

export default function Login(){
    return(
        <div className="flex flex-col h-screen items-center justify-center">
            <h2 className="pb-5 font-bold text-zinc-700">Login</h2>
                    <div className="flex items-center justify-center w-96">
                        <InputForm />
                    </div>            
                    
                </div>
    )
}