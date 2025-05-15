import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Code, Palette, Users, Award, Heart } from "lucide-react";

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-dark-surface py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold text-dark-gold mb-4">
              Sobre Sayro
            </h1>
            <p className="text-lg text-dark-light max-w-2xl mx-auto">
              Una plataforma para diseñadores y desarrolladores que buscan
              inspiración, visibilidad y colaboración en proyectos creativos.
            </p>
          </div>
        </section>

        {/* Misión / Visión */}
        <section className="py-20 bg-dark-background">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-dark-surface rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-bold text-dark-gold mb-4">
                Nuestra Misión
              </h2>
              <p className="text-dark-light leading-relaxed">
                Conectar a diseñadores y desarrolladores de todo el mundo,
                fomentando la creatividad, el intercambio de ideas y la
                colaboración en proyectos innovadores.
              </p>
            </div>
            <div className="bg-dark-surface rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-bold text-dark-gold mb-4">
                Nuestra Visión
              </h2>
              <p className="text-dark-light leading-relaxed">
                Ser la plataforma de referencia donde los profesionales del
                diseño y desarrollo encuentren oportunidades, visibilidad y
                comunidad.
              </p>
            </div>
          </div>
        </section>

        {/* Características */}
        <section className="py-20 bg-dark-surface">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-dark-gold mb-12">
              ¿Por qué elegir Sayro?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Palette className="text-dark-gold w-8 h-8" />,
                  title: "Diseños Inspiradores",
                  desc: "Explora miles de diseños de alta calidad creados por talentosos profesionales.",
                },
                {
                  icon: <Users className="text-dark-gold w-8 h-8" />,
                  title: "Comunidad Activa",
                  desc: "Únete a una red vibrante de diseñadores y desarrolladores creativos.",
                },
                {
                  icon: <Code className="text-dark-gold w-8 h-8" />,
                  title: "Recursos Técnicos",
                  desc: "Accede a recursos, tutoriales y herramientas que potencian tus habilidades.",
                },
                {
                  icon: <Award className="text-dark-gold w-8 h-8" />,
                  title: "Reconocimiento",
                  desc: "Gana visibilidad y construye tu reputación dentro de la comunidad.",
                },
              ].map(({ icon, title, desc }, i) => (
                <div
                  key={i}
                  className="bg-dark-background p-6 rounded-lg text-center hover:shadow-md transition"
                >
                  <div className="bg-dark-forest/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-dark-gold">
                    {title}
                  </h3>
                  <p className="text-dark-light text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Historia */}
        <section className="py-20 bg-dark-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-dark-gold mb-6">
              Nuestra Historia
            </h2>
            <p className="text-dark-light text-base mb-8 leading-relaxed">
              Sayro nació en 2025 con el objetivo de ser un espacio donde los
              profesionales del diseño pudieran compartir sus trabajos y recibir
              retroalimentación constructiva. Desde entonces, hemos crecido
              hasta convertirnos en una comunidad vibrante con miles de usuarios
              activos.
            </p>
            <div className="inline-flex items-center justify-center bg-dark-forest/20 px-6 py-3 rounded-full">
              <Heart className="text-dark-gold w-5 h-5 mr-2" />
              <span className="text-dark-gold font-medium">
                Hecho con pasión para la comunidad creativa
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;
