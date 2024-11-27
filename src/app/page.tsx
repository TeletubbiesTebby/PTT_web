import Image from "next/image";
import Pump from './public/Pump.png'
import sensor1 from './public/Group 8.png'
import sensor2 from './public/Group 9.png'

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
          <div className="absolute top-[17%] left-[10%] bg-[#b8b8b8] h-[35px] w-[170px] rounded-3xl items-center flex text-[16px] font-medium px-2 ">
            Flow Sensor :
          </div>
          <div className="absolute top-[23%] left-[24%]"> 
            <Image
              src={sensor1}
              alt="flow sensor"
              width={100}
              height={100}
            />
            <Image
              src={sensor2}
              className="absolute top-[25%] left-[28%]"
              alt="flow sensor"
              width={50}
              height={100}
            />
          </div>
          <div className="absolute top-[35%] -left-[5%]  bg-[#b8b8b8] h-[35px] w-[190px] rounded-3xl items-center flex text-[16px] font-medium px-2 ">
            Pressure Sensor :
          </div>
          <div className="absolute top-[80%] left-[40%] bg-[#b8b8b8] h-[35px] w-[220px] rounded-3xl items-center flex text-[16px] font-medium px-2 ">
            Temperature Sensor :
          </div>
          <div className="absolute left-[80%] bg-[#b8b8b8] h-[35px] w-[190px] rounded-3xl items-center flex text-[16px] font-medium px-2 ">
            Power Meter :
          </div>
          <div className="absolute top-[65%] left-[60%] bg-[#b8b8b8] h-[35px] w-[190px] rounded-3xl items-center flex text-[16px] font-medium px-2 ">
            Vibration Sensor :
          </div>
          <div className="absolute top-[17%] left-[50%] bg-[#b8b8b8] h-[35px] w-[280px] rounded-3xl items-center flex text-[16px] font-medium px-2 ">
            Ambient Temperature Sensor :
          </div>
        </aside>

      </section>
      <section>

      </section>
    </main>
  );
}
