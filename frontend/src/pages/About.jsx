import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Code, Palette, Users, Award, Heart } from "lucide-react";

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-dark-surface py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-dark-gold">
              Sobre Sayro
            </h1>
            <p className="text-xl text-dark-light max-w-3xl mx-auto">
              Una plataforma para diseñadores y desarrolladores que buscan
              inspiración y compartir sus mejores trabajos.
            </p>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="py-16 bg-dark-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-dark-surface p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-dark-gold">
                  Nuestra Misión
                </h2>
                <p className="text-dark-light">
                  Conectar a diseñadores y desarrolladores de todo el mundo,
                  facilitando el intercambio de ideas y la colaboración en
                  proyectos innovadores. Buscamos crear una comunidad donde la
                  creatividad y el talento sean reconocidos y valorados.
                </p>
              </div>
              <div className="bg-dark-surface p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-dark-gold">
                  Nuestra Visión
                </h2>
                <p className="text-dark-light">
                  Convertirnos en la plataforma de referencia para profesionales
                  del diseño y desarrollo, donde puedan encontrar inspiración,
                  compartir conocimientos y establecer conexiones profesionales
                  que impulsen su carrera.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Características */}
        <section className="py-16 bg-dark-surface">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-dark-gold">
              ¿Por qué elegir Sayro?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-dark-background p-6 rounded-lg text-center">
                <div className="bg-dark-forest/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="text-dark-gold w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dark-gold">
                  Diseños Inspiradores
                </h3>
                <p className="text-dark-light">
                  Explora miles de diseños de alta calidad creados por
                  talentosos profesionales.
                </p>
              </div>

              <div className="bg-dark-background p-6 rounded-lg text-center">
                <div className="bg-dark-forest/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-dark-gold w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dark-gold">
                  Comunidad Activa
                </h3>
                <p className="text-dark-light">
                  Forma parte de una comunidad de profesionales apasionados por
                  el diseño y desarrollo.
                </p>
              </div>

              <div className="bg-dark-background p-6 rounded-lg text-center">
                <div className="bg-dark-forest/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="text-dark-gold w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dark-gold">
                  Recursos Técnicos
                </h3>
                <p className="text-dark-light">
                  Accede a recursos, tutoriales y herramientas para mejorar tus
                  habilidades.
                </p>
              </div>

              <div className="bg-dark-background p-6 rounded-lg text-center">
                <div className="bg-dark-forest/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-dark-gold w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dark-gold">
                  Reconocimiento
                </h3>
                <p className="text-dark-light">
                  Obtén visibilidad y reconocimiento por tus mejores trabajos y
                  contribuciones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Equipo o Historia */}
        <section className="py-16 bg-dark-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-dark-gold">
              Nuestra Historia
            </h2>
            <p className="text-dark-light max-w-3xl mx-auto mb-8">
              Sayro nació en 2025 con la idea de crear un espacio donde los
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
