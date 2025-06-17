export default function Register(){
    return(
        <div className="flex flex-col h-screen items-center justify-center">            
            <div className="flex flex-col items-center gap-2 border-2">
                <h1>Registre-se</h1>
                <div className="flex gap-2">               
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="email" id="email"/>
                </div>
                <div className="flex gap-2">
                    <label htmlFor="password">Password</label>
                    <input type="text" placeholder="password" id="password"/>
                </div>
            </div>
        </div>
    )
}