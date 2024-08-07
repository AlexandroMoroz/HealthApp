import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMedicData } from "../../../../Context/AuthContext";
import { AsideMenu } from "../../../../components/AsideMenu";
import Header from "./Header.tsx/Header";

import { Medic } from "../../../../Interfaces/interfaces";
import ListPatients from "./ListPatients/ListPatients";
import { Side_Menu } from "../../../../components/Side_Menu/Side_Menu";

export function Home(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [medicInfo, setMedicInfo] = useState<Medic>();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchMedic = async () => {
    try {
      setMedicInfo(await fetchMedicData());
    } catch (err) {
      console.log(err);
    }

  };



  useEffect(() => {
    fetchMedic();

    const storedMedic = localStorage.getItem("MEDIC-DATA");
    if (storedMedic) {
      const medic: Medic = JSON.parse(storedMedic);
      setMedicInfo(medic);
    }

  }, []);

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <main className="min-h-screen w-full font-inter flex xl:flex-row flex-col overflow-y-auto">
      <Side_Menu
        classname={`hidden xl:block h-[61rem] 2xl:h-[68rem] bg-[#fff]  bg-gradient-to-r from-indigo-500 to-indigo-300 text-[#000] font-mono ${isExpanded ? 'w-[300px]' : 'w-[130px]'} transition-width duration-300 z-10`}
        isExpanded={isExpanded}
        toggleMenu={toggleMenu}
      />
      <div className={`flex-1 xl:ml-${isExpanded ? '325px' : '90px'} transition-margin duration-300 ease-in-out`}>
        <div className="xl:grid xl:grid-cols-1 xl:justify-center w-full xl:max-w-full max-w-md bg-white rounded-lg shadow-lg m-auto ">
          <div className="">
            <AsideMenu
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          </div>
          <div className="xl:w-full ">
            <div className="xl:flex xl:justify-center">
              <Header
                toggleSidebar={toggleSidebar}
                nombre={medicInfo?.nombre}
                apellido={medicInfo?.apellido}
                especialidad={medicInfo?.especialidad}
              />
            </div>

            <div className="2xl:-ml-[20rem] p-4">
              <ListPatients />
            </div>

            <footer className="mt-5 flex justify-center items-center flex-col 2xl:-ml-[20rem]">
              <h2 className="text-center font-inter font-bold text-2xl">
                Donaciones
              </h2>
              <img
                src="JustinaLogo_2.png"
                width={150}
                height={150}
                alt="JustinaLogo"
              />
              <Link to={"/donations"}>
                <button className="my-4 bg-[#E08733] px-24 text-white font-inter py-3 rounded-lg">
                  Acceder
                </button>
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
