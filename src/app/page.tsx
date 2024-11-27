"use client";
import { useState, useEffect , useCallback} from "react";
import Image from "next/image";
import Pump from "@/app/public/Pump.png";
import { predictOptimalRPM, predictLifespan, predictEfficiency } from "@/app/conpanant/service";
import { Results, OptimalRPMInput,  LifespanInput } from "@/app/conpanant/interface";
import sensor1 from './public/Group 8.png'
import sensor2 from './public/Group 9.png'
import sensor3 from './public/Group 10.png'
import sensor4 from './public/Group 11.png'
import sensor5 from './public/Group 12.png'
import sensor6 from './public/Group 13.png'
import sensor7 from './public/Group 14.png'
import sensor8 from './public/Group 15.png'
import sensor9 from './public/Group 16.png'
import sensor10 from './public/Group 17.png'
import sensor11 from './public/Group 18.png'
import sensor12 from './public/Group 19.png'

export default function Home() {
  const [results, setResults] = useState<Results>({
    optimalRPM: null,
    efficiencyPercentage: null,
    lifespan: null,
  });

  const [energyUsage, setEnergyUsage] = useState<{
    regularRPM: string | null;
    predictedOptimalRPM: string | null;
  }>({
    regularRPM: null,
    predictedOptimalRPM: null,
  });

  const [electricityCost, setElectricityCost] = useState<{
    costBefore: string | null;
    costAfter: string | null;
  }>({
    costBefore: null,
    costAfter: null,
  });

  const [carbonSaved, setCarbonSaved] = useState<string | null>(null);

  // ค่าไฟฟ้าต่อหน่วย (บาท/หน่วย)
  const electricityRate = 4.5; // หน่วย: บาท/kWh
  const carbonEmissionRate = 0.52; // kgCO₂/kWh
  const hoursPerMonth = 24 * 30; // 720 ชั่วโมง/เดือน

  const mockOptimalRPM: OptimalRPMInput = {
    flow_rate: 12.5,
    inlet_temperature: 35.0,
    outlet_temperature: 30.0,
    delta_temperature: 5.0,
    pressure: 101.3,
    delta_pressure: 0.5,
    power_consumption: 150.0,
    vibration: 0.02,
    ambient_temperature: 28.0,
    time_of_day: "Peak",
    cooling_load: 2.5,
    motor_speed: 3000,
    energy_usage_regular_rpm: 1.2,
  };

  const mockLifespan: LifespanInput = {
    delta_temperature: 5.0,
    pressure: 101.3,
    delta_pressure: 0.5,
    power_consumption: 150.0,
    cooling_load: 2.5,
    motor_speed: 3000,
    vibration: 0.02,
    ambient_temperature: 28.0,
  };

  const fetchData = useCallback(async () => {
    try {
      const optimalRPMResult = await predictOptimalRPM(mockOptimalRPM);
      const efficiencyResult = await predictEfficiency(mockOptimalRPM);
      const lifespanResult = await predictLifespan(mockLifespan);

      const regularRPM = parseFloat(optimalRPMResult["Energy Usage (Regular RPM)"] as string);
      const predictedOptimalRPM = parseFloat(optimalRPMResult["Energy Usage (Predicted Optimal RPM)"] as string);

      const costBefore = (regularRPM * electricityRate * hoursPerMonth).toFixed(2);
      const costAfter = (predictedOptimalRPM * electricityRate * hoursPerMonth).toFixed(2);

      const carbonSavedValue = ((regularRPM - predictedOptimalRPM) * carbonEmissionRate * hoursPerMonth).toFixed(2);

      setResults({
        optimalRPM: (optimalRPMResult["Optimal RPM"] as number).toFixed(2),
        efficiencyPercentage: (efficiencyResult["Efficiency Percentage"] as number).toFixed(2),
        lifespan: (lifespanResult["Remaining Lifespan (years)"] as number).toFixed(2),
      });

      setEnergyUsage({
        regularRPM: regularRPM.toFixed(2),
        predictedOptimalRPM: predictedOptimalRPM.toFixed(2),
      });

      setElectricityCost({
        costBefore,
        costAfter,
      });

      setCarbonSaved(carbonSavedValue);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [electricityRate, carbonEmissionRate, hoursPerMonth, mockOptimalRPM, mockLifespan]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [fetchData]);


  return (
    <main className="grid grid-cols-[6fr_5fr] w-full min-h-screen bg-black">
      <section className="relative flex justify-self-center h-full items-center">
        <Image
          src={Pump}
          className="self-center"
          alt="Pump"
          width={700}
          height={700}
        />
        <aside className="grid gap-2">

          {/* Flow sensor */}
          <div className="absolute top-[23%] left-[24%]">
            <Image
              src={sensor1}
              alt="bg-flow sensor"
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
          <div className="absolute top-[17%] left-[10%] bg-[#b8b8b8] h-[40px] w-[200px] rounded-3xl items-center flex text-[16px] font-medium px-2">
            Flow Sensor:
            <span className="pl-2 font-semibold">{mockOptimalRPM.flow_rate} m³/h</span>
          </div>


          {/* Pressure sensor */}
          <div className="absolute top-[40%] left-[5%]"> 
            <Image
              src={sensor5}
              alt="bg-pressure sensor"
              width={100}
              height={100}
            />
            <Image
              src={sensor6}
              className="absolute top-[20%] left-[23%]"
              alt="pressure sensor"
              width={60}
              height={100}
            />
          </div>
          <div className="absolute top-[34%] -left-[8%] bg-[#b8b8b8] h-[40px] w-[230px] rounded-3xl items-center flex text-[16px] font-medium px-2">
            Pressure Sensor:
            <span className="pl-2 font-semibold">{mockOptimalRPM.pressure} kPa</span>
          </div>

          {/* Temperature sensor */}
          <div className="absolute top-[67%] left-[38%]"> 
            <Image
              src={sensor4}
              alt="bg-temp sensor"
              width={100}
              height={100}
            />
            <Image
              src={sensor3}
              className="absolute top-[20%] left-[15%]"
              alt="temp sensor"
              width={80}
              height={100}
            />
          </div>
          <div className="absolute top-[76%] left-[48%] bg-[#b8b8b8] h-[40px] w-[280px] rounded-3xl items-center flex text-[16px] font-medium px-2">
            Temperature Sensor:
            <span className="pl-2 font-semibold">{mockOptimalRPM.inlet_temperature}°C / {mockOptimalRPM.outlet_temperature}°C</span>
          </div>

          {/* Power sensor */}
          <div className="absolute top-[40%] left-[74%]"> 
            <Image
              src={sensor11}
              alt="bg-power sensor"
              width={120}
              height={100}
            />
            <Image
              src={sensor12}
              className="absolute top-[32%] left-[16%]"
              alt="power sensor"
              width={80}
              height={100}
            />
          </div>
          <div className="absolute left-[80%] bg-[#b8b8b8] h-[40px] w-[190px] rounded-3xl items-center flex text-[16px] font-medium px-2">
            Power Meter:
            <span className="pl-2 font-semibold">{mockOptimalRPM.power_consumption} W</span>
          </div>

          {/* Vibration sensor */}
          <div className="absolute top-[48%] left-[55%]"> 
            <Image
              src={sensor9}
              alt="bg-vibration sensor"
              width={100}
              height={100}
            />
            <Image
              src={sensor10}
              className="absolute top-[40%] left-[15%]"
              alt="vibration sensor"
              width={70}
              height={100}
            />
          </div>
          <div className="absolute top-[60%] left-[62%] bg-[#b8b8b8] h-[40px] w-[220px] rounded-3xl items-center flex text-[16px] font-medium px-2">
            Vibration Sensor:
            <span className="pl-2 font-semibold">{mockOptimalRPM.vibration} m/s²</span>
          </div>

          {/* Ambient sensor */}
          <div className="absolute top-[23%] left-[39%]">
            <Image
              src={sensor7}
              alt="bg-Ambient sensor"
              width={100}
              height={100}
            />
            <Image
              src={sensor8}
              className="absolute top-[12%] left-[20%]"
              alt="Ambient sensor"
              width={70}
              height={100}
            />
          </div>
          <div className="absolute top-[17%] left-[45%] bg-[#b8b8b8] h-[40px] w-[280px] rounded-3xl items-center flex text-[16px] font-medium px-2">
            Ambient Temperature Sensor:
            <span className="pl-2 font-semibold">{mockOptimalRPM.ambient_temperature}°C</span>
          </div>

        </aside>
      </section>
      <section className="flex flex-col gap-5 items-center justify-center text-black">
        <div className="bg-[#fae17e] h-fit py-5 w-[400px]  rounded-3xl flex-col-1 items-center text-[20px] font-medium px-5">
          <div>Optimal RPM : <span className="pl-5 text-[20px] font-semibold">{results.optimalRPM ?? "Loading..."}</span></div>
          <div>Energy Usage (Regular RPM) : <span className="pl-5 text-[20px] font-semibold">{energyUsage.regularRPM ?? "Loading..."}</span></div>
          <div>Energy Usage (Optimal RPM) : <span className="pl-5 text-[20px] font-semibold">{energyUsage.predictedOptimalRPM ?? "Loading..."}</span></div>
        </div>
        <div className="bg-[#fae17e] h-[60px] w-[400px] rounded-3xl flex items-center text-[20px] font-medium px-5">
          Efficiency Percentage : <span className="pl-5 text-[20px] font-semibold">{results.efficiencyPercentage ?? "Loading..."} %</span>
        </div>
        <div className="bg-[#fae17e] h-[60px] w-[400px]  rounded-3xl flex items-center text-[20px] font-medium px-5">
          Remaining Lifespan : <span className="pl-5 text-[20px] font-semibold">{results.lifespan ?? "Loading..."} years</span>
        </div>
        <div className="bg-[#fae17e] h-[60px] w-[400px]  rounded-3xl flex items-center text-[20px] font-medium px-5">
          Electricity Cost Before : <span className="pl-5 text-[20px] font-semibold">{electricityCost.costBefore ?? "Loading..."} THB</span>
        </div>
        <div className="bg-[#fae17e] h-[60px] w-[400px]  rounded-3xl flex items-center text-[20px] font-medium px-5">
          Electricity Cost After : <span className="pl-5 text-[20px] font-semibold">{electricityCost.costAfter ?? "Loading..."} THB</span>
        </div>
        <div className="bg-[#8bcb8f] h-[60px] w-[400px]  rounded-3xl flex items-center text-[20px] font-medium px-5">
          Carbon Saved : <span className="pl-5 text-[20px] font-semibold">{carbonSaved ?? "Loading..."} kgCO₂</span>
        </div>
      </section>
    </main>
  );
}
