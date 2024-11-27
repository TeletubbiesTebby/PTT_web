const BASE_URL = "https://ptt-ml-controller.onrender.com";

// กำหนดประเภทสำหรับข้อมูลที่ใช้ใน API
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

export interface Results {
  optimalRPM: string | null;
  efficiencyPercentage: string | null;
  lifespan: string | null;
}

export interface PredictResult {
  [key: string]: string | number;
}

// ฟังก์ชันสำหรับเรียก API Predict Optimal RPM
export async function predictOptimalRPM(data: OptimalRPMInput): Promise<PredictResult> {
  const response = await fetch(`${BASE_URL}/predict_optimalRPM/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

// ฟังก์ชันสำหรับเรียก API Predict Lifespan
export async function predictLifespan(data: LifespanInput): Promise<PredictResult> {
  const response = await fetch(`${BASE_URL}/predict_lifespan/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

// ฟังก์ชันสำหรับเรียก API Predict Efficiency
export async function predictEfficiency(data: OptimalRPMInput): Promise<PredictResult> {
  const response = await fetch(`${BASE_URL}/predict_efficiency/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}
