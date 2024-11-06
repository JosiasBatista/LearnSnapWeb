"use client"

import { useEffect, useRef, useState } from "react";
import { FiBriefcase, FiWatch, FiTerminal, FiDollarSign, FiEye } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import Image from "next/image";

import Header from "../_components/Header";
import LoadingImg from "@/app/assets/LoadingWhite.svg";
import { updateUserAreasOfInterest } from "@/services/areaService";
import { useUser } from "../_context/userContext";

export default function AreasOfInterest() {
  const [mainArea, setMainArea] = useState<string>();
  const [interestedAreas, setInterestedAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, setUser } = useUser();
  const userId = useRef<string>();
  const router = useRouter();

  const areas = ["Business", "Productivity", "Programming", "Economics", "Marketing"];
  const icons = [FiBriefcase, FiWatch, FiTerminal, FiDollarSign, FiEye];
  const areaNames = ["Negócios", "Produtividade", "Programação", "Economia", "Marketing"];

  useEffect(() => {
    if (user) {
      setMainArea(user.mainArea?.description);
      setInterestedAreas(user.areasOfInterest.map(area => area.area.description));
    }
  }, [user])

  const updatingInterestedAreasArray = (newValue: string) => {
    if (interestedAreas.includes(newValue)) {
      setInterestedAreas(interestedAreas.filter(area => area != newValue));
    } else {
      const updatedArray = [...interestedAreas];
      updatedArray.push(newValue);

      setInterestedAreas(updatedArray);
    }
  }

  const renderIcon = (index: number, selected: boolean) => {
    const Icon = icons[index];

    return (
      <div className="w-8 h-8">
        <Icon color={selected ? "#FFF" : "#27AE60"} size={32} />
      </div>
    )
  }

  const renderAreaOptions = (uniqueOption: boolean) => {
    return (
      <div className="gap-4 mt-4 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        {areas.map((area, index) => (
          <button 
          key={index} 
          className={`flex flex-row rounded-lg items-center gap-2 border border-primary 
            p-4 ${(uniqueOption ? area == mainArea : interestedAreas.includes(area)) && 'bg-primary'}`}
          onClick={() => uniqueOption ? setMainArea(area) : updatingInterestedAreasArray(area)}>
            <input 
              type="radio" 
              className="hidden"
              name={uniqueOption ? "mainArea" : area} 
              id={`mainArea-${index}`}
              onChange={(e) => uniqueOption ? setMainArea(e.currentTarget.value) : updatingInterestedAreasArray(e.currentTarget.value)} 
              value={area} 
            />
            {renderIcon(index, uniqueOption ? area == mainArea : interestedAreas.includes(area))}
            <label className={`cursor-pointer break-words font-bold text-lg
            font-[family-name:var(--font-cormorant)] ${(uniqueOption ? area == mainArea : interestedAreas.includes(area)) && 'text-white'}`}>
              {areaNames[index]}
            </label>
          </button>
        ))}
      </div>
    )
  }

  const callUpdateInterest = () => {
    setLoading(true);
    userId.current = localStorage.getItem('userId') || "";

    updateUserAreasOfInterest(parseInt(userId.current), {
      mainArea: mainArea || "",
      areasOfInterest: interestedAreas
    }).then((response) => {
      setUser(response.data);
      localStorage.setItem('user', response.data);

      toast.success("Áreas atualizadas com sucesso!");
      router.push('/home')
    }).catch((error) => {
      toast.error(error.message);
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <div className="w-screen flex flex-col items-center pb-8">
      <Header />

      <section className="mt-6 w-[50vw]">
        <strong className="font-[family-name:var(--font-montserrat)] text-xl">
          Em qual área você se considera mais especialista?
        </strong>

        {renderAreaOptions(true)}
      </section>

      <section className="mt-6 w-[50vw] ">
        <strong className="font-[family-name:var(--font-montserrat)] text-xl">
          Em quais áreas você possui interesse?
        </strong>

        {renderAreaOptions(false)}
      </section>

      <section className="w-[768px] flex items-end justify-end mt-6">
        <button 
          onClick={callUpdateInterest} 
          className="bg-primary flex justify-center items-center rounded-lg text-white h-9 px-4"
          disabled={loading}  
        >
          {loading ?
            <Image src={LoadingImg} alt="LoadingImg" /> :
            'Salvar'
          }
        </button>
      </section>
    </div>
  )
}