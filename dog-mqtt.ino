#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include "WifiCredentials.h"

#define timeSeconds 2

const char* ssid = SSID;
const char* password = PASSWORD;

const int motionSensor = 19;

// Timer: Auxiliary variables
unsigned long now = millis();
unsigned long lastTrigger = 0;
boolean startTimer = false;
boolean motion = false;

WiFiClient espClient;
PubSubClient mqttClient(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

// MQTT Broker Information
const char* mqttServer = "broker.emqx.io";
const int mqttPort = 1883;
const char* mqttUser = "your_mqtt_username";
const char* mqttPassword = "your_mqtt_password";
const char* mqttTopic = "motion_detection_topic";

// Checks if motion was detected, starts a timer
void IRAM_ATTR detectsMovement() {
  motion = true;
  startTimer = true;
  lastTrigger = millis();
}

void setup() {
  // Serial port for debugging purposes
  Serial.begin(115200);

  setup_wifi();

  // PIR Motion Sensor mode INPUT_PULLUP
  pinMode(motionSensor, INPUT_PULLUP);
  // Set motionSensor pin as interrupt, assign interrupt function and set RISING mode
  attachInterrupt(digitalPinToInterrupt(motionSensor), detectsMovement, RISING);

  mqttClient.setServer(mqttServer, mqttPort);
  reconnect();
}

void setup_wifi() {
  delay(10);

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!mqttClient.connected()) {
    // Serial.println("Connecting to MQTT...");
    if (mqttClient.connect("ESP8266Client", mqttUser, mqttPassword)) {
      // Serial.println("Connected to MQTT");
    } else {
      Serial.print("Failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println("Retrying in 5 seconds");
      delay(5000);
    }
  }
}



void loop() {
  while (!mqttClient.connected()) {
    // Serial.println("Connecting to MQTT...");
    if (mqttClient.connect("ESP8266Client", mqttUser, mqttPassword)) {
      // Serial.println("Connected to MQTT");
    } else {
      Serial.print("Failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println("Retrying in 5 seconds");
      delay(5000);
    }
  }

  mqttClient.loop();

  if (motion) {
    mqttClient.publish(mqttTopic, "Motion Detected");
    motion = false;
    delay(timeSeconds * 1000);
  }
}