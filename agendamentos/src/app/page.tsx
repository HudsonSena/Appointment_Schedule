export default function Home() {
  return <div className="h-screen flex flex-col items-center justify-between">
    <header className="bg-secondary text-primary w-full h-56 flex items-center justify-center"><div>Cabeçalho
      </div></header>
    <nav className="bg-primary text-secondary w-full h-28 flex items-center justify-evenly "><a href="">Home</a><a href="clinics">Clínicas</a><a href="professionals">Profissionais</a><a href="register">Registre-se</a><a href="/login">Login</a></nav>
    <main className="bg-secondary text-primary w-full h-full flex items-center justify-center"><div>Corpo
      </div></main>
    <footer className="bg-primary text-secondary w-full h-56 flex flex-col items-center justify-center"><div>Todos os direito reservados a Appointment Schedule
      </div><p>Desenvolvido por <a href="https://hudsonsena.github.io/landing-page-hs/" className="font-bold">Hudson Sena</a></p></footer>
  </div>;
}
