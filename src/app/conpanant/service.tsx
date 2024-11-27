const BASE_URL = "https://ptt-ml-controller.onrender.com";

// ฟังก์ชันสำหรับเรียก API Predict Optimal RPM
export async function predictOptimalRPM(data: any): Promise<any> {
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
export async function predictLifespan(data: any): Promise<any> {
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

// ฟังก์ชันสำหรับเรียก API Predict Efficiency Percentage
export async function predictEfficiency(data: any): Promise<any> {
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
