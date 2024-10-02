import { FiHeart, FiMessageSquare } from "react-icons/fi";

import Header from "../_components/Header";

export default function Home() {
  return (
    <div className="w-screen flex flex-col items-center">
      <Header />

      <section className="max-w-[535px] overflow-y-scroll py-8">
        <div className="flex flex-col border-b border-[#C2C2C2] gap-2">
          <div className="flex flex-row gap-1 items-center">
            <strong className="font-[family-name:var(--font-cormorant)] text-base font-bold">Josias Abraão</strong>
            <span>|</span>
            <span className="font-[family-name:var(--font-cormorant)] text-xs font-bold">Educator</span>
          </div>

          <strong className="font-[family-name:var(--font-cormorant)] text-primary text-lg font-bold">Uso da IA generativa para escrita de Test Cases</strong>

          <p className="font-[family-name:var(--font-montserrat)] text-xs font-regular">
          Inteligência Artificial Geradora de Casos de Teste: A solução definitiva para aprimorar a qualidade dos seus testes de software."
          
          A programação de software é uma tarefa complexa e exigente, que requer uma atenção minuciosa em cada etapa do processo. E quando se trata de testes, a precisão e eficiência são fundamentais para garantir a qualidade do produto final.
          
          É por isso que apresentamos a IA generativa para casos de teste, uma ferramenta inovadora que revolucionará a forma como você realiza seus testes de software. Com a inteligência artificial como aliada, você poderá criar casos de teste de forma automatizada e ... 
          </p>

          <section className="flex flex-row gap-4 my-2">
            <div className="flex flex-row gap-1 items-center">
              <FiHeart size={16} color="#747474" />
              <span className="font-[family-name:var(--font-montserrat)] text-xs font-regular">15 curtidas</span>
            </div>

            <div className="flex flex-row gap-1 items-center">
              <FiMessageSquare size={16} color="#747474" />
              <span className="font-[family-name:var(--font-montserrat)] text-xs font-regular">3 comentários</span>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}