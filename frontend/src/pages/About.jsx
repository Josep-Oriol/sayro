import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Code, Palette, Users, Award, Heart } from "lucide-react";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "Sayro - Sobre Sayro";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-[#F5F5F5]">
      <Nav />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#1E1E1E] py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold text-[#4ADE80] mb-4">
              Sobre Sayro
            </h1>
            <p className="text-lg text-[#A0A0A0] max-w-2xl mx-auto">
              Una plataforma para diseñadores y desarrolladores que buscan
              inspiración, visibilidad y colaboración en proyectos creativos.
            </p>
          </div>
        </section>

        {/* Misión / Visión */}
        <section className="py-20 bg-[#121212]">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: "Nuestra Misión",
                text: `Conectar a diseñadores y desarrolladores de todo el mundo,
                fomentando la creatividad, el intercambio de ideas y la
                colaboración en proyectos innovadores.`,
              },
              {
                title: "Nuestra Visión",
                text: `Ser la plataforma de referencia donde los profesionales del
                diseño y desarrollo encuentren oportunidades, visibilidad y
                comunidad.`,
              },
            ].map((block, idx) => (
              <div
                key={idx}
                className="bg-[#1E1E1E] rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300"
              >
                <h2 className="text-2xl font-bold text-[#4ADE80] mb-4">
                  {block.title}
                </h2>
                <p className="text-[#A0A0A0] leading-relaxed">{block.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Características */}
        <section className="py-20 bg-[#1E1E1E]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#4ADE80] mb-12">
              ¿Por qué elegir Sayro?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Palette className="text-[#4ADE80] w-8 h-8" />,
                  title: "Diseños Inspiradores",
                  desc: "Explora miles de diseños de alta calidad creados por talentosos profesionales.",
                },
                {
                  icon: <Users className="text-[#4ADE80] w-8 h-8" />,
                  title: "Comunidad Activa",
                  desc: "Únete a una red vibrante de diseñadores y desarrolladores creativos.",
                },
                {
                  icon: <Code className="text-[#4ADE80] w-8 h-8" />,
                  title: "Recursos Técnicos",
                  desc: "Accede a recursos, tutoriales y herramientas que potencian tus habilidades.",
                },
                {
                  icon: <Award className="text-[#4ADE80] w-8 h-8" />,
                  title: "Reconocimiento",
                  desc: "Gana visibilidad y construye tu reputación dentro de la comunidad.",
                },
              ].map(({ icon, title, desc }, i) => (
                <div
                  key={i}
                  className="bg-[#121212] p-6 rounded-lg text-center hover:shadow-md transition"
                >
                  <div className="bg-[#1B3B2F]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#4ADE80]">
                    {title}
                  </h3>
                  <p className="text-[#A0A0A0] text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Historia */}
        <section className="py-20 bg-[#121212]">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-[#4ADE80] mb-6">
              Nuestra Historia
            </h2>
            <p className="text-[#A0A0A0] text-base mb-8 leading-relaxed">
              Sayro nació en 2025 con el objetivo de ser un espacio donde los
              profesionales del diseño pudieran compartir sus trabajos y recibir
              retroalimentación constructiva. Desde entonces, hemos crecido
              hasta convertirnos en una comunidad vibrante con miles de usuarios
              activos.
            </p>
            <div className="inline-flex items-center justify-center bg-[#1B3B2F]/20 px-6 py-3 rounded-full">
              <Heart className="text-[#4ADE80] w-5 h-5 mr-2" />
              <span className="text-[#4ADE80] font-medium">
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
