import Image from "next/image";
import Pump from './public/Pump.png'

export default function Home() {
  return (
    <main className="grid grid-cols-[6fr_5fr] w-full min-h-screen bg-black">
      <section className="relative flex justify-self-center h-full items-center ">
        <Image
          src={Pump}
          className="self-center"
          alt="Pump"
          width={700}
          height={700}
        />
        <aside className="grid gap-2">
          <div className="absolute top-[25%] -left-[1%] bg-[#b8b8b8] h-[44px] w-[190px] rounded-3xl items-center flex text-[16px] font-medium px-2 ">
            Flow Sensor :
          </div>
          <div className="absolute top-[35%] -left-[10%]  bg-[#b8b8b8] h-[44px] w-[190px] rounded-3xl items-center flex text-[16px] font-medium px-2 ">
            Temperature Sensor :
          </div>
          <div className="absolute bg-[#b8b8b8] h-[44px] w-[190px] rounded-3xl items-center flex text-[16px] font-medium px-2 ">
            Pressure Sensor :
          </div>
          <div className="absolute bg-[#b8b8b8] h-[44px] w-[190px] rounded-3xl items-center flex text-[16px] font-medium px-2 ">
            Power Meter :
          </div>
          <div className="absolute bg-[#b8b8b8] h-[44px] w-[190px] rounded-3xl items-center flex text-[16px] font-medium px-2 ">
            Vibration Sensor :
          </div>
          <div className="absolute top-[20%] left-[50%] bg-[#b8b8b8] h-[44px] w-[250px] rounded-3xl items-center flex text-[16px] font-medium px-2 ">
            Ambient Temperature Sensor :
          </div>
        </aside>

      </section>
      <section>

      </section>
    </main>
  );
}
