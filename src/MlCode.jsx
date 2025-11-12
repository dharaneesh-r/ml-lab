import React from "react";

const MlCode = () => {
  const lineSeparator =
    "--------------------------------------------------------------------------------------------------------------";
  const code = `
#include <DHT.h>

#define DHTPIN 2	// Pin connected to DHT sensor #define DHTTYPE DHT11	// DHT 11 sensor
#define LDR_PIN A0			// Light sensor connected to analog pin A0 #define IR_PIN 3	// Infrared sensor connected to digital pin 3 #define LED_PIN 13		// Built-in LED pin
#define BUZZER_PIN 8	// Buzzer connected to pin 8 DHT dht(DHTPIN, DHTTYPE);
void setup() { Serial.begin(9600); dht.begin();
pinMode(LED_PIN, OUTPUT); pinMode(BUZZER_PIN, OUTPUT);
pinMode(IR_PIN, INPUT);
}

void loop() {
// Read temperature
float temp = dht.readTemperature();

// Read light sensor
int lightValue = analogRead(LDR_PIN);

// Read infrared sensor
int irValue = digitalRead(IR_PIN);

Serial.print("Temperature: "); Serial.print(temp); Serial.print(" °C, Light: "); Serial.print(lightValue); Serial.print(", IR Sensor: "); Serial.println(irValue);

// Control actuators based on sensor values if(lightValue < 300) {
digitalWrite(LED_PIN, HIGH);  // Turn ON LED if dark
} else {
digitalWrite(LED_PIN, LOW);
}

if(irValue == HIGH) {
digitalWrite(BUZZER_PIN, HIGH); // Turn ON buzzer if IR detected
} else {
digitalWrite(BUZZER_PIN, LOW);
}
delay(2000); // Wait for 2 seconds
}

`;

  const code3 = `
import RPi.GPIO as GPIO import time

# Use BCM pin numbering GPIO.setmode(GPIO.BCM)

LED_PIN = 17 GPIO.setup(LED_PIN, GPIO.OUT)

try:
while True:
GPIO.output(LED_PIN, GPIO.HIGH) # LED ON
time.sleep(1)	# Wait 1 second GPIO.output(LED_PIN, GPIO.LOW) # LED OFF
time.sleep(1)	# Wait 1 second
except KeyboardInterrupt: print("Program stopped")

finally:
GPIO.cleanup() # Reset GPIO settings
`;

  const code5 = `#include <ESP8266WiFi.h> #include <DHT.h>
#include <ESP8266HTTPClient.h>

#define DHTPIN 2	// GPIO pin where DHT sensor is connected #define DHTTYPE DHT11

const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";

const char* server = "http://api.thingspeak.com/update"; const String apiKey = "YOUR_THINGSPEAK_API_KEY";

DHT dht(DHTPIN, DHTTYPE);

void setup() { Serial.begin(115200); dht.begin();

WiFi.begin(ssid, password); Serial.print("Connecting to WiFi");

while (WiFi.status() != WL_CONNECTED) { delay(500);
Serial.print(".");
}

Serial.println("\nConnected to WiFi");
}

void loop() {
float temperature = dht.readTemperature();

if (isnan(temperature)) {
Serial.println("Failed to read from DHT sensor!"); return;
}

Serial.print("Temperature: "); Serial.print(temperature);
Serial.println(" °C"); if (WiFi.status() == WL_CONNECTED) { HTTPClient http;

String postData = String(server) + "?api_key=" + apiKey + "&field1=" + String(temperature); http.begin(postData);
int httpCode = http.GET();


 
if (httpCode > 0) {
Serial.println("Data posted successfully");
} else {
Serial.println("Error in posting data");}
http.end();
} else {
Serial.println("WiFi Disconnected");
}
delay(20000); // Wait for 20 seconds before next reading
}
`;

  const code8 = `const int sensorPin = A0; // Analog pin connected to LDR void setup() {
Serial.begin(9600); Serial.println("Light Sensor Reading:");
}
void loop() {
int sensorValue = analogRead(sensorPin); Serial.print("LDR Value: "); Serial.println(sensorValue);
delay(1000); // Wait for 1 second
}
`;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">IOT Code Viewer</h2>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm leading-6">
        <code>2. {code} </code>
        <div>{lineSeparator}</div>
      </pre>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm leading-6">
        <code>3. {code3} </code>
        <div>{lineSeparator}</div>
      </pre>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm leading-6">
        <code>5. {code5} </code>
        <div>{lineSeparator}</div>
      </pre>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm leading-6">
        <code>8. {code8} </code>
        <div>{lineSeparator}</div>
      </pre>
    </div>
  );
};

export default MlCode;
