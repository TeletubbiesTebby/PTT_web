"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Pump from "@/app/public/Pump.png";
import { predictOptimalRPM, predictLifespan, predictEfficiency } from "@/app/conpanant/service";
import { Results, OptimalRPMInput, EfficiencyInput, LifespanInput } from "@/app/conpanant/interface";
import sensor1 from './public/Group 8.png'
import sensor2 from './public/Group 9.png'

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

  // อัตราการปล่อยคาร์บอนไดออกไซด์ (kgCO₂/kWh)
  const carbonEmissionRate = 0.52;

  // จำนวนชั่วโมงใน 1 เดือน (สมมุติการทำงาน 24 ชั่วโมง x 30 วัน)
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

  const mockEfficiency: EfficiencyInput = { ...mockOptimalRPM };

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

  const fetchData = async () => {
    try {
      const optimalRPMResult = await predictOptimalRPM(mockOptimalRPM);
      const efficiencyResult = await predictEfficiency(mockEfficiency);
      const lifespanResult = await predictLifespan(mockLifespan);

      const regularRPM = parseFloat(optimalRPMResult["Energy Usage (Regular RPM)"]);
      const predictedOptimalRPM = parseFloat(optimalRPMResult["Energy Usage (Predicted Optimal RPM)"]);

      // คำนวณค่าไฟฟ้าจาก Energy Usage
      // คำนวณค่าไฟฟ้ารายเดือน
      const costBefore = (regularRPM * electricityRate * hoursPerMonth).toFixed(2);
      const costAfter = (predictedOptimalRPM * electricityRate * hoursPerMonth).toFixed(2);

      // คำนวณคาร์บอนไดออกไซด์ที่ลดลงรายเดือน
      const carbonSavedValue = ((regularRPM - predictedOptimalRPM) * carbonEmissionRate * hoursPerMonth).toFixed(2);

      setResults({
        optimalRPM: parseFloat(optimalRPMResult["Optimal RPM"]).toFixed(2),
        efficiencyPercentage: parseFloat(efficiencyResult["Efficiency Percentage"]).toFixed(2),
        lifespan: parseFloat(lifespanResult["Remaining Lifespan (years)"]).toFixed(2),
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
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

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
          <div className="absolute top-[17%] left-[10%] bg-[#b8b8b8] h-[35px] w-[200px] rounded-3xl items-center flex text-[16px] font-medium px-2">
            Flow Sensor:
            <span className="pl-2 font-semibold">{mockOptimalRPM.flow_rate} m³/h</span>
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
          <div className="absolute top-[35%] -left-[5%] bg-[#b8b8b8] h-[35px] w-[250px] rounded-3xl items-center flex text-[16px] font-medium px-2">
            Pressure Sensor:
            <span className="pl-2 font-semibold">{mockOptimalRPM.pressure} kPa</span>
          </div>
          <div className="absolute top-[80%] left-[40%] bg-[#b8b8b8] h-[35px] w-[280px] rounded-3xl items-center flex text-[16px] font-medium px-2">
            Temperature Sensor:
            <span className="pl-2 font-semibold">{mockOptimalRPM.inlet_temperature}°C / {mockOptimalRPM.outlet_temperature}°C</span>
          </div>
          <div className="absolute left-[80%] bg-[#b8b8b8] h-[35px] w-[190px] rounded-3xl items-center flex text-[16px] font-medium px-2">
            Power Meter:
            <span className="pl-2 font-semibold">{mockOptimalRPM.power_consumption} W</span>
          </div>
          <div className="absolute top-[65%] left-[60%] bg-[#b8b8b8] h-[35px] w-[220px] rounded-3xl items-center flex text-[16px] font-medium px-2">
            Vibration Sensor:
            <span className="pl-2 font-semibold">{mockOptimalRPM.vibration} m/s²</span>
          </div>
          <div className="absolute top-[17%] left-[50%] bg-[#b8b8b8] h-[35px] w-[280px] rounded-3xl items-center flex text-[16px] font-medium px-2">
            Ambient Temperature Sensor:
            <span className="pl-2 font-semibold">{mockOptimalRPM.ambient_temperature}°C</span>
          </div>

        </aside>
      </section>
      <section className="flex flex-col gap-5 items-center justify-center text-black">
        <div className="bg-[#fae17e] h-fit py-5 w-1/2 rounded-3xl flex-col-1 items-center text-[20px] font-medium px-5">
          <div>Optimal RPM : <span className="pl-5 text-[20px] font-semibold">{results.optimalRPM ?? "Loading..."}</span></div>
          <div>Energy Usage (Regular RPM) : <span className="pl-5 text-[20px] font-semibold">{energyUsage.regularRPM ?? "Loading..."}</span></div>
          <div>Energy Usage (Optimal RPM) : <span className="pl-5 text-[20px] font-semibold">{energyUsage.predictedOptimalRPM ?? "Loading..."}</span></div>
        </div>
        <div className="bg-[#fae17e] h-[60px] w-1/2 rounded-3xl flex items-center text-[20px] font-medium px-5">
          Efficiency Percentage : <span className="pl-5 text-[20px] font-semibold">{results.efficiencyPercentage ?? "Loading..."} %</span>
        </div>
        <div className="bg-[#fae17e] h-[60px] w-1/2 rounded-3xl flex items-center text-[20px] font-medium px-5">
          Remaining Lifespan : <span className="pl-5 text-[20px] font-semibold">{results.lifespan ?? "Loading..."} years</span>
        </div>
        <div className="bg-[#fae17e] h-[60px] w-1/2 rounded-3xl flex items-center text-[20px] font-medium px-5">
          Electricity Cost Before : <span className="pl-5 text-[20px] font-semibold">{electricityCost.costBefore ?? "Loading..."} THB</span>
        </div>
        <div className="bg-[#fae17e] h-[60px] w-1/2 rounded-3xl flex items-center text-[20px] font-medium px-5">
          Electricity Cost After : <span className="pl-5 text-[20px] font-semibold">{electricityCost.costAfter ?? "Loading..."} THB</span>
        </div>
        <div className="bg-[#8bcb8f] h-[60px] w-1/2 rounded-3xl flex items-center text-[20px] font-medium px-5">
          Carbon Saved : <span className="pl-5 text-[20px] font-semibold">{carbonSaved ?? "Loading..."} kgCO₂</span>
        </div>
      </section>
    </main>
  );
}
