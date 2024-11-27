// กำหนดประเภทสำหรับผลลัพธ์
export interface Results {
    optimalRPM: string | null;
    efficiencyPercentage: string | null;
    lifespan: string | null;
  }
  
  // กำหนดประเภทสำหรับข้อมูล mock
export interface OptimalRPMInput {
    flow_rate: number;
    inlet_temperature: number;
    outlet_temperature: number;
    delta_temperature: number;
    pressure: number;
    delta_pressure: number;
    power_consumption: number;
    vibration: number;
    ambient_temperature: number;
    time_of_day: string;
    cooling_load: number;
    motor_speed: number;
    energy_usage_regular_rpm: number;
  }
  

  
export interface LifespanInput {
    delta_temperature: number;
    pressure: number;
    delta_pressure: number;
    power_consumption: number;
    cooling_load: number;
    motor_speed: number;
    vibration: number;
    ambient_temperature: number;
  }